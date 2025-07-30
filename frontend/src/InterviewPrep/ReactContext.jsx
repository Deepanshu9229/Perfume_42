import React, { createContext, useContext, useReducer, useState, useEffect } from 'react';
import './ReactContext.css';

// ========== THEME CONTEXT ==========
const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light'
      };
    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        primaryColor: action.payload
      };
    case 'SET_FONT_SIZE':
      return {
        ...state,
        fontSize: action.payload
      };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    mode: 'light',
    primaryColor: '#007bff',
    fontSize: 'medium'
  });

  // Persist theme to localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      themeDispatch({ type: 'SET_PRIMARY_COLOR', payload: parsed.primaryColor });
      themeDispatch({ type: 'SET_FONT_SIZE', payload: parsed.fontSize });
      if (parsed.mode === 'dark') {
        themeDispatch({ type: 'TOGGLE_THEME' });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(themeState));
    // Apply theme to document root
    document.documentElement.style.setProperty('--primary-color', themeState.primaryColor);
    document.documentElement.style.setProperty('--font-size', 
      themeState.fontSize === 'small' ? '14px' : 
      themeState.fontSize === 'large' ? '18px' : '16px'
    );
    document.body.className = themeState.mode;
  }, [themeState]);

  const toggleTheme = () => themeDispatch({ type: 'TOGGLE_THEME' });
  const setPrimaryColor = (color) => themeDispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  const setFontSize = (size) => themeDispatch({ type: 'SET_FONT_SIZE', payload: size });

  return (
    <ThemeContext.Provider value={{
      theme: themeState,
      toggleTheme,
      setPrimaryColor,
      setFontSize
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ========== AUTH CONTEXT ==========
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        user: action.payload, 
        isAuthenticated: true 
      };
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        error: null 
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  });

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        authDispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email, password) => {
    authDispatch({ type: 'LOGIN_START' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@example.com' && password === 'password') {
        const user = {
          id: 1,
          email: email,
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://via.placeholder.com/40'
        };
        
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('user', JSON.stringify(user));
        authDispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      authDispatch({ type: 'LOGIN_ERROR', payload: error.message });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authDispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (profileData) => {
    const updatedUser = { ...authState.user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    authDispatch({ type: 'UPDATE_PROFILE', payload: profileData });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// ========== SHOPPING CART CONTEXT ==========
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);
  const toggleCart = () => setIsOpen(prev => !prev);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// ========== CUSTOM HOOKS ==========
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ========== COMPONENTS ==========
const ThemeControls = () => {
  const { theme, toggleTheme, setPrimaryColor, setFontSize } = useTheme();

  return (
    <div className="theme-controls">
      <h4>Theme Controls</h4>
      <div className="control-group">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme.mode === 'light' ? '🌙' : '☀️'} 
          Switch to {theme.mode === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      
      <div className="control-group">
        <label>Primary Color:</label>
        <div className="color-options">
          {['#007bff', '#28a745', '#dc3545', '#ffc107', '#6f42c1'].map(color => (
            <button
              key={color}
              className={`color-btn ${theme.primaryColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setPrimaryColor(color)}
            />
          ))}
        </div>
      </div>
      
      <div className="control-group">
        <label>Font Size:</label>
        <select value={theme.fontSize} onChange={(e) => setFontSize(e.target.value)}>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h4>Login Form</h4>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email (try: admin@example.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password (try: password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = () => {
    updateProfile({ name });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="user-profile">
      <h4>User Profile</h4>
      <div className="profile-info">
        <img src={user.avatar} alt="Avatar" />
        <div>
          {isEditing ? (
            <div className="edit-form">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
              <button onClick={handleUpdateProfile}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>{user.name}</strong></p>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          )}
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

const ProductList = () => {
  const { addItem } = useCart();
  
  const products = [
    { id: 1, name: 'Laptop', price: 999, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Mouse', price: 29, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Keyboard', price: 79, image: 'https://via.placeholder.com/100' }
  ];

  return (
    <div className="product-list">
      <h4>Products</h4>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h5>{product.name}</h5>
            <p>${product.price}</p>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const { cartItems, isOpen, removeItem, updateQuantity, clearCart, toggleCart, totalItems, totalPrice } = useCart();

  return (
    <div className="shopping-cart">
      <button onClick={toggleCart} className="cart-toggle">
        🛒 Cart ({totalItems})
      </button>
      
      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h4>Shopping Cart</h4>
            <button onClick={toggleCart}>✕</button>
          </div>
          
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <span>{item.name}</span>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="total">Total: ${totalPrice.toFixed(2)}</div>
                <button onClick={clearCart}>Clear Cart</button>
                <button className="checkout-btn">Checkout</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ========== MAIN COMPONENT ==========
const ReactContext = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="context-container">
      <h2>React useContext Examples</h2>
      
      {/* Theme Section */}
      <section className="context-section">
        <h3>Theme Context</h3>
        <p>Demonstrates global theme management with useContext and useReducer.</p>
        <ThemeControls />
      </section>

      {/* Auth Section */}
      <section className="context-section">
        <h3>Authentication Context</h3>
        <p>Shows user authentication state management across components.</p>
        {!isAuthenticated ? <LoginForm /> : <UserProfile />}
      </section>

      {/* Shopping Cart Section */}
      <section className="context-section">
        <h3>Shopping Cart Context</h3>
        <p>Example of complex state management for e-commerce functionality.</p>
        <div className="cart-demo">
          <ProductList />
          <ShoppingCart />
        </div>
      </section>

      {/* Code Examples */}
      <section className="context-section">
        <h3>Implementation Examples</h3>
        
        <div className="code-example">
          <h4>1. Creating Context and Provider:</h4>
          <pre><code>{`
// Create Context
const ThemeContext = createContext();

// Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>2. Custom Hook for Context:</h4>
          <pre><code>{`
const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};

// Usage in component
const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>3. Context with useReducer (Complex State):</h4>
          <pre><code>{`
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false 
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false
  });
  
  const login = (userData) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login }}>
      {children}
    </AuthContext.Provider>
  );
};
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>4. Multiple Context Providers:</h4>
          <pre><code>{`
// App.js - Wrapping with multiple providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
          `}</code></pre>
        </div>

        <div className="best-practices">
          <h4>🎯 Best Practices:</h4>
          <ul>
            <li><strong>Split contexts by concern</strong> - Don't put everything in one context</li>
            <li><strong>Use custom hooks</strong> - Encapsulate context logic and provide better error handling</li>
            <li><strong>Optimize re-renders</strong> - Split contexts to prevent unnecessary re-renders</li>
            <li><strong>Keep context close to usage</strong> - Don't wrap entire app if only few components need it</li>
            <li><strong>Use useReducer for complex state</strong> - Better than useState for complex state logic</li>
            <li><strong>Provide default values</strong> - Always provide meaningful defaults for context</li>
          </ul>
        </div>

        <div className="common-pitfalls">
          <h4>⚠️ Common Pitfalls:</h4>
          <ul>
            <li><strong>Overusing Context</strong> - Not every state needs to be global</li>
            <li><strong>Creating too many contexts</strong> - Can lead to "provider hell"</li>
            <li><strong>Not memoizing context values</strong> - Can cause unnecessary re-renders</li>
            <li><strong>Forgetting error boundaries</strong> - Context errors can crash entire subtrees</li>
            <li><strong>Not handling loading states</strong> - Always handle async operations properly</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

// ========== MAIN EXPORT WITH PROVIDERS ==========
const ReactContextDemo = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ReactContext />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default ReactContextDemo;