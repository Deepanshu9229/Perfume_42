import React, { useState } from 'react';
import ResponsiveDesign from './ResponsiveDesign';
import FilterFunctions from './FilterFunctions';
import ReactContextDemo from './ReactContext';
import ReactHooks from './ReactHooks';
import './InterviewPrep.css';

const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📚' },
    { id: 'responsive', label: 'Responsive Design', icon: '📱' },
    { id: 'filters', label: 'Filter Functions', icon: '🔍' },
    { id: 'context', label: 'React Context', icon: '🔄' },
    { id: 'hooks', label: 'React Hooks', icon: '🎣' },
    { id: 'async', label: 'Async Operations', icon: '⚡' },
    { id: 'performance', label: 'Performance', icon: '🚀' },
    { id: 'questions', label: 'Interview Q&A', icon: '❓' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'responsive':
        return <ResponsiveDesign />;
      case 'filters':
        return <FilterFunctions />;
      case 'context':
        return <ReactContextDemo />;
      case 'hooks':
        return <ReactHooks />;
      case 'async':
        return <AsyncOperations />;
      case 'performance':
        return <PerformanceOptimization />;
      case 'questions':
        return <InterviewQuestions />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="interview-prep">
      <header className="prep-header">
        <h1>Frontend Technical Interview Preparation</h1>
        <p>Comprehensive examples and explanations for frontend development interviews</p>
      </header>

      <nav className="prep-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="prep-content">
        {renderContent()}
      </main>
    </div>
  );
};

// Overview Component
const Overview = () => (
  <div className="overview-container">
    <h2>Frontend Interview Preparation Guide</h2>
    
    <div className="topic-grid">
      <div className="topic-card">
        <h3>📱 Responsive Design</h3>
        <p>Learn CSS Grid, Flexbox, media queries, and mobile-first design principles.</p>
        <ul>
          <li>CSS Grid vs Flexbox</li>
          <li>Media queries and breakpoints</li>
          <li>Fluid typography with clamp()</li>
          <li>Accessibility considerations</li>
        </ul>
      </div>

      <div className="topic-card">
        <h3>🔍 Filter Functions</h3>
        <p>Master array methods, search implementations, and data manipulation.</p>
        <ul>
          <li>Array.filter(), find(), some(), every()</li>
          <li>Debounced search implementations</li>
          <li>Complex filtering patterns</li>
          <li>Performance considerations</li>
        </ul>
      </div>

      <div className="topic-card">
        <h3>🔄 React Context</h3>
        <p>Understand global state management and prop drilling solutions.</p>
        <ul>
          <li>Creating contexts and providers</li>
          <li>Custom hooks for context</li>
          <li>Multiple context patterns</li>
          <li>Performance optimization</li>
        </ul>
      </div>

      <div className="topic-card">
        <h3>🎣 React Hooks</h3>
        <p>Deep dive into React hooks and custom hook patterns.</p>
        <ul>
          <li>useState, useEffect lifecycle</li>
          <li>useCallback, useMemo optimization</li>
          <li>useRef for DOM manipulation</li>
          <li>Custom hooks for reusability</li>
        </ul>
      </div>

      <div className="topic-card">
        <h3>⚡ Async Operations</h3>
        <p>Handle promises, async/await, and API calls effectively.</p>
        <ul>
          <li>Promise vs async/await</li>
          <li>Error handling patterns</li>
          <li>Loading states management</li>
          <li>Race conditions prevention</li>
        </ul>
      </div>

      <div className="topic-card">
        <h3>🚀 Performance</h3>
        <p>Optimize React applications for better user experience.</p>
        <ul>
          <li>React.memo and memoization</li>
          <li>Code splitting and lazy loading</li>
          <li>Bundle optimization</li>
          <li>Memory leak prevention</li>
        </ul>
      </div>
    </div>

    <div className="key-concepts">
      <h3>🎯 Key Interview Areas</h3>
      <div className="concept-grid">
        <div className="concept-item">
          <h4>JavaScript Fundamentals</h4>
          <ul>
            <li>Closures and scope</li>
            <li>Event loop and asynchronous JS</li>
            <li>Prototypes and inheritance</li>
            <li>ES6+ features</li>
          </ul>
        </div>
        <div className="concept-item">
          <h4>React Concepts</h4>
          <ul>
            <li>Virtual DOM and reconciliation</li>
            <li>Component lifecycle</li>
            <li>State management patterns</li>
            <li>Performance optimization</li>
          </ul>
        </div>
        <div className="concept-item">
          <h4>CSS/Styling</h4>
          <ul>
            <li>Box model and positioning</li>
            <li>Flexbox and Grid layouts</li>
            <li>Responsive design principles</li>
            <li>CSS-in-JS vs traditional CSS</li>
          </ul>
        </div>
        <div className="concept-item">
          <h4>Testing</h4>
          <ul>
            <li>Unit vs integration testing</li>
            <li>Jest and React Testing Library</li>
            <li>Mocking and test strategies</li>
            <li>E2E testing concepts</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

// Async Operations Component
const AsyncOperations = () => (
  <div className="async-container">
    <h2>Async Operations & API Calls</h2>
    
    <div className="async-section">
      <h3>Promise vs Async/Await</h3>
      <div className="code-example">
        <h4>Promise Chain:</h4>
        <pre><code>{`
fetch('/api/user/1')
  .then(response => response.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(response => response.json())
  .then(posts => {
    console.log('User posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });
        `}</code></pre>
      </div>

      <div className="code-example">
        <h4>Async/Await:</h4>
        <pre><code>{`
const fetchUserPosts = async (userId) => {
  try {
    const userResponse = await fetch(\`/api/user/\${userId}\`);
    const user = await userResponse.json();
    
    const postsResponse = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsResponse.json();
    
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    throw error;
  }
};
        `}</code></pre>
      </div>
    </div>

    <div className="async-section">
      <h3>Error Handling Patterns</h3>
      <div className="code-example">
        <h4>Custom Error Handling:</h4>
        <pre><code>{`
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Network error - please check your connection');
    }
    throw error;
  }
};
        `}</code></pre>
      </div>
    </div>

    <div className="async-section">
      <h3>React Hook for API Calls</h3>
      <div className="code-example">
        <h4>useApi Custom Hook:</h4>
        <pre><code>{`
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          ...options,
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(\`Error: \${response.status}\`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [url]);

  return { data, loading, error };
};
        `}</code></pre>
      </div>
    </div>
  </div>
);

// Performance Optimization Component
const PerformanceOptimization = () => (
  <div className="performance-container">
    <h2>Performance Optimization</h2>
    
    <div className="perf-section">
      <h3>React.memo for Component Optimization</h3>
      <div className="code-example">
        <h4>Basic React.memo:</h4>
        <pre><code>{`
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});

// Custom comparison function
const ExpensiveComponentWithCustomComparison = React.memo(
  ({ data, settings }) => {
    return <div>/* component content */</div>;
  },
  (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return (
      prevProps.data.length === nextProps.data.length &&
      prevProps.settings.theme === nextProps.settings.theme
    );
  }
);
        `}</code></pre>
      </div>
    </div>

    <div className="perf-section">
      <h3>Code Splitting and Lazy Loading</h3>
      <div className="code-example">
        <h4>React.lazy and Suspense:</h4>
        <pre><code>{`
// Lazy load components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Profile = React.lazy(() => import('./Profile'));
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Dynamic imports with loading states
const [component, setComponent] = useState(null);
const [loading, setLoading] = useState(false);

const loadComponent = async () => {
  setLoading(true);
  try {
    const { default: Component } = await import('./HeavyComponent');
    setComponent(() => Component);
  } catch (error) {
    console.error('Failed to load component:', error);
  } finally {
    setLoading(false);
  }
};
        `}</code></pre>
      </div>
    </div>

    <div className="perf-section">
      <h3>Virtual Scrolling for Large Lists</h3>
      <div className="code-example">
        <h4>Basic Virtual Scrolling Implementation:</h4>
        <pre><code>{`
const VirtualList = ({ items, itemHeight = 50, containerHeight = 400 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
        `}</code></pre>
      </div>
    </div>
  </div>
);

// Interview Questions Component
const InterviewQuestions = () => (
  <div className="questions-container">
    <h2>Common Interview Questions & Answers</h2>
    
    <div className="question-category">
      <h3>JavaScript Fundamentals</h3>
      <div className="question-item">
        <h4>Q: Explain closures in JavaScript</h4>
        <div className="answer">
          <p>A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function has returned.</p>
          <pre><code>{`
function outerFunction(x) {
  return function innerFunction(y) {
    return x + y; // 'x' is captured in closure
  };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
          `}</code></pre>
        </div>
      </div>

      <div className="question-item">
        <h4>Q: What's the difference between let, const, and var?</h4>
        <div className="answer">
          <ul>
            <li><strong>var:</strong> Function-scoped, hoisted, can be redeclared</li>
            <li><strong>let:</strong> Block-scoped, hoisted but not initialized, cannot be redeclared</li>
            <li><strong>const:</strong> Block-scoped, must be initialized, cannot be reassigned</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="question-category">
      <h3>React Specific</h3>
      <div className="question-item">
        <h4>Q: Explain the Virtual DOM and its benefits</h4>
        <div className="answer">
          <p>The Virtual DOM is a JavaScript representation of the actual DOM. React uses it to:</p>
          <ul>
            <li>Minimize expensive DOM operations</li>
            <li>Batch updates for better performance</li>
            <li>Enable predictable re-rendering</li>
            <li>Provide a programming model that's easier to reason about</li>
          </ul>
        </div>
      </div>

      <div className="question-item">
        <h4>Q: When would you use useCallback vs useMemo?</h4>
        <div className="answer">
          <ul>
            <li><strong>useCallback:</strong> Memoizes functions to prevent child re-renders</li>
            <li><strong>useMemo:</strong> Memoizes computed values for expensive calculations</li>
          </ul>
          <pre><code>{`
// useCallback - prevents child re-renders
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// useMemo - expensive calculation
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
          `}</code></pre>
        </div>
      </div>
    </div>

    <div className="question-category">
      <h3>Performance & Optimization</h3>
      <div className="question-item">
        <h4>Q: How do you optimize a React application?</h4>
        <div className="answer">
          <ul>
            <li>Use React.memo for component memoization</li>
            <li>Implement useCallback and useMemo appropriately</li>
            <li>Code splitting with React.lazy</li>
            <li>Optimize bundle size with tree shaking</li>
            <li>Use virtual scrolling for large lists</li>
            <li>Implement proper error boundaries</li>
            <li>Minimize re-renders with proper state structure</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default InterviewPrep;