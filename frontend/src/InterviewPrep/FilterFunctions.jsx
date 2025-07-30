import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './FilterFunctions.css';

// Sample data for filtering examples
const sampleUsers = [
  { id: 1, name: 'Alice Johnson', age: 28, department: 'Engineering', salary: 75000, skills: ['React', 'JavaScript', 'Node.js'] },
  { id: 2, name: 'Bob Smith', age: 35, department: 'Marketing', salary: 60000, skills: ['Adobe', 'Analytics', 'SEO'] },
  { id: 3, name: 'Charlie Brown', age: 42, department: 'Engineering', salary: 90000, skills: ['Python', 'Machine Learning', 'SQL'] },
  { id: 4, name: 'Diana Prince', age: 29, department: 'Design', salary: 70000, skills: ['Figma', 'Photoshop', 'UI/UX'] },
  { id: 5, name: 'Edward Davis', age: 31, department: 'Engineering', salary: 85000, skills: ['Java', 'Spring', 'Microservices'] },
  { id: 6, name: 'Fiona Clark', age: 26, department: 'Marketing', salary: 55000, skills: ['Content Writing', 'Social Media', 'Branding'] }
];

const sampleProducts = [
  { id: 1, name: 'iPhone 15', category: 'Electronics', price: 999, inStock: true, rating: 4.8 },
  { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 1999, inStock: true, rating: 4.9 },
  { id: 3, name: 'Coffee Mug', category: 'Home', price: 15, inStock: false, rating: 4.2 },
  { id: 4, name: 'Desk Chair', category: 'Furniture', price: 299, inStock: true, rating: 4.5 },
  { id: 5, name: 'Wireless Mouse', category: 'Electronics', price: 49, inStock: true, rating: 4.3 },
  { id: 6, name: 'Plant Pot', category: 'Home', price: 25, inStock: true, rating: 4.0 }
];

// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const FilterFunctions = () => {
  // State for different filtering examples
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const [selectedSkill, setSelectedSkill] = useState('');
  
  // Product filtering state
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [showInStock, setShowInStock] = useState(false);

  // Debounced search values
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedProductSearch = useDebounce(productSearch, 300);

  // Basic Array Filter Methods Examples
  const arrayMethods = useMemo(() => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    return {
      original: numbers,
      filtered: numbers.filter(num => num % 2 === 0), // Even numbers
      found: numbers.find(num => num > 5), // First number > 5
      some: numbers.some(num => num > 8), // Any number > 8
      every: numbers.every(num => num > 0), // All numbers > 0
      mapped: numbers.filter(num => num % 2 === 0).map(num => num * 2),
      reduced: numbers.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0)
    };
  }, []);

  // Advanced User Filtering
  const filteredUsers = useMemo(() => {
    return sampleUsers.filter(user => {
      // Search term filter (name)
      const matchesSearch = user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Department filter
      const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
      
      // Age range filter
      const matchesAge = user.age >= ageRange.min && user.age <= ageRange.max;
      
      // Skill filter
      const matchesSkill = !selectedSkill || user.skills.some(skill => 
        skill.toLowerCase().includes(selectedSkill.toLowerCase())
      );
      
      return matchesSearch && matchesDepartment && matchesAge && matchesSkill;
    });
  }, [debouncedSearchTerm, selectedDepartment, ageRange, selectedSkill]);

  // Advanced Product Filtering
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedProductSearch.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesStock = !showInStock || product.inStock;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    });
  }, [debouncedProductSearch, categoryFilter, priceRange, showInStock]);

  // Complex filtering function example
  const getTopPerformers = useCallback((department, minSalary = 70000) => {
    return sampleUsers
      .filter(user => user.department === department && user.salary >= minSalary)
      .sort((a, b) => b.salary - a.salary)
      .slice(0, 3);
  }, []);

  // Multi-criteria search function
  const multiSearch = useCallback((query, fields) => {
    if (!query) return sampleUsers;
    
    return sampleUsers.filter(user => 
      fields.some(field => {
        const value = user[field];
        if (Array.isArray(value)) {
          return value.some(item => 
            item.toLowerCase().includes(query.toLowerCase())
          );
        }
        return String(value).toLowerCase().includes(query.toLowerCase());
      })
    );
  }, []);

  // Get unique values for filters
  const departments = [...new Set(sampleUsers.map(user => user.department))];
  const categories = [...new Set(sampleProducts.map(product => product.category))];
  const allSkills = [...new Set(sampleUsers.flatMap(user => user.skills))];

  return (
    <div className="filter-container">
      <h2>Filter Functions & Search Examples</h2>
      
      {/* Basic Array Methods */}
      <section className="array-methods-section">
        <h3>Basic Array Filter Methods</h3>
        <div className="method-examples">
          <div className="method-item">
            <h4>Original Array:</h4>
            <code>[{arrayMethods.original.join(', ')}]</code>
          </div>
          <div className="method-item">
            <h4>filter() - Even numbers:</h4>
            <code>[{arrayMethods.filtered.join(', ')}]</code>
          </div>
          <div className="method-item">
            <h4>find() - First number > 5:</h4>
            <code>{arrayMethods.found}</code>
          </div>
          <div className="method-item">
            <h4>some() - Any number > 8:</h4>
            <code>{arrayMethods.some.toString()}</code>
          </div>
          <div className="method-item">
            <h4>every() - All numbers > 0:</h4>
            <code>{arrayMethods.every.toString()}</code>
          </div>
          <div className="method-item">
            <h4>Chain: filter + map (even * 2):</h4>
            <code>[{arrayMethods.mapped.join(', ')}]</code>
          </div>
          <div className="method-item">
            <h4>Chain: filter + reduce (sum):</h4>
            <code>{arrayMethods.reduced}</code>
          </div>
        </div>
      </section>

      {/* User Filtering */}
      <section className="user-filter-section">
        <h3>Advanced User Filtering</h3>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search by Name:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter name..."
            />
          </div>
          
          <div className="filter-group">
            <label>Department:</label>
            <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Age Range: {ageRange.min} - {ageRange.max}</label>
            <input
              type="range"
              min="20"
              max="50"
              value={ageRange.min}
              onChange={(e) => setAgeRange({...ageRange, min: parseInt(e.target.value)})}
            />
            <input
              type="range"
              min="20"
              max="50"
              value={ageRange.max}
              onChange={(e) => setAgeRange({...ageRange, max: parseInt(e.target.value)})}
            />
          </div>
          
          <div className="filter-group">
            <label>Search by Skill:</label>
            <input
              type="text"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              placeholder="Enter skill..."
            />
          </div>
        </div>

        <div className="results">
          <h4>Filtered Users ({filteredUsers.length}):</h4>
          <div className="user-cards">
            {filteredUsers.map(user => (
              <div key={user.id} className="user-card">
                <h5>{user.name}</h5>
                <p>Age: {user.age} | {user.department}</p>
                <p>Salary: ${user.salary.toLocaleString()}</p>
                <p>Skills: {user.skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Filtering */}
      <section className="product-filter-section">
        <h3>Product Filtering with Multiple Criteria</h3>
        
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search Products:</label>
            <input
              type="text"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Search products..."
            />
          </div>
          
          <div className="filter-group">
            <label>Category:</label>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range: ${priceRange.min} - ${priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.min}
              onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value)})}
            />
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange.max}
              onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
            />
          </div>
          
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={showInStock}
                onChange={(e) => setShowInStock(e.target.checked)}
              />
              In Stock Only
            </label>
          </div>
        </div>

        <div className="results">
          <h4>Filtered Products ({filteredProducts.length}):</h4>
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <h5>{product.name}</h5>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}⭐</p>
                <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complex Filter Examples */}
      <section className="complex-examples">
        <h3>Complex Filter Examples</h3>
        
        <div className="example-item">
          <h4>Top Engineering Performers (Salary >= $70k):</h4>
          <div className="user-cards">
            {getTopPerformers('Engineering').map(user => (
              <div key={user.id} className="user-card">
                <h5>{user.name}</h5>
                <p>Salary: ${user.salary.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="example-item">
          <h4>Multi-field Search Example (searching "Java" in name and skills):</h4>
          <div className="user-cards">
            {multiSearch('Java', ['name', 'skills']).map(user => (
              <div key={user.id} className="user-card">
                <h5>{user.name}</h5>
                <p>Skills: {user.skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="code-examples">
        <h3>Common Filter Patterns</h3>
        <div className="code-block">
          <h4>1. Basic Filter with Multiple Conditions:</h4>
          <pre><code>{`
// Filter users by multiple criteria
const filteredUsers = users.filter(user => {
  return user.age >= 25 && 
         user.department === 'Engineering' && 
         user.salary > 70000;
});
          `}</code></pre>
        </div>

        <div className="code-block">
          <h4>2. Search with Debouncing:</h4>
          <pre><code>{`
// Custom hook for debounced search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
          `}</code></pre>
        </div>

        <div className="code-block">
          <h4>3. Chain Filter, Map, and Reduce:</h4>
          <pre><code>{`
// Complex data transformation
const result = data
  .filter(item => item.active)
  .map(item => ({ ...item, total: item.price * item.quantity }))
  .reduce((sum, item) => sum + item.total, 0);
          `}</code></pre>
        </div>

        <div className="code-block">
          <h4>4. Dynamic Multi-field Search:</h4>
          <pre><code>{`
const searchMultipleFields = (data, query, fields) => {
  return data.filter(item =>
    fields.some(field => {
      const value = item[field];
      if (Array.isArray(value)) {
        return value.some(v => 
          v.toLowerCase().includes(query.toLowerCase())
        );
      }
      return String(value)
        .toLowerCase()
        .includes(query.toLowerCase());
    })
  );
};
          `}</code></pre>
        </div>
      </section>
    </div>
  );
};

export default FilterFunctions;