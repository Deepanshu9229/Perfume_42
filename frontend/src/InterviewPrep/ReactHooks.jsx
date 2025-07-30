import React, { useState, useEffect, useCallback, useMemo, useRef, useReducer, useLayoutEffect } from 'react';
import './ReactHooks.css';

// Custom Hooks Examples
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

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

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse }];
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Component Examples
const CounterExample = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  // Multiple state updates
  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);

  // Functional state update example
  const incrementByTwo = useCallback(() => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1); // Both updates will be batched
  }, []);

  return (
    <div className="hook-example">
      <h4>useState Examples</h4>
      <div className="counter-controls">
        <div className="counter-display">
          <span>Count: {count}</span>
        </div>
        <div className="step-control">
          <label>Step: </label>
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="buttons">
          <button onClick={decrement}>-{step}</button>
          <button onClick={increment}>+{step}</button>
          <button onClick={incrementByTwo}>+2 (Batched)</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

const EffectExample = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(navigator.onLine);

  // Effect with dependency
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // Effect with cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Effect for network status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effect with async operation
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockData = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          value: Math.random() * 100
        }));
        setData(mockData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array - runs once

  return (
    <div className="hook-example">
      <h4>useEffect Examples</h4>
      <div className="effect-demos">
        <div className="demo-item">
          <p>Auto-incrementing counter: {count}</p>
          <p>Network status: {online ? '🟢 Online' : '🔴 Offline'}</p>
        </div>
        <div className="demo-item">
          <h5>Fetched Data:</h5>
          <ul>
            {data.map(item => (
              <li key={item.id}>Item {item.id}: {item.value.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CallbackExample = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Without useCallback - new function on every render
  const addTodoWithoutCallback = () => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input.trim() }]);
      setInput('');
    }
  };

  // With useCallback - memoized function
  const addTodo = useCallback(() => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input.trim() }]);
      setInput('');
    }
  }, [input]);

  const removeTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Function that depends on count
  const getCountMessage = useCallback(() => {
    return `Current count is ${count}`;
  }, [count]);

  return (
    <div className="hook-example">
      <h4>useCallback Examples</h4>
      <div className="callback-demos">
        <div className="demo-item">
          <h5>Todo List (with useCallback)</h5>
          <div className="todo-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a todo..."
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => removeTodo(todo.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="demo-item">
          <h5>Count Demo</h5>
          <p>{getCountMessage()}</p>
          <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
        </div>
      </div>
    </div>
  );
};

const MemoExample = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filter, setFilter] = useState('all');
  const [multiplier, setMultiplier] = useState(1);

  // Expensive calculation without useMemo
  const expensiveCalculationWithoutMemo = () => {
    console.log('Running expensive calculation without memo...');
    return numbers.reduce((sum, num) => sum + num * multiplier, 0);
  };

  // Expensive calculation with useMemo
  const expensiveCalculationWithMemo = useMemo(() => {
    console.log('Running expensive calculation with memo...');
    return numbers.reduce((sum, num) => sum + num * multiplier, 0);
  }, [numbers, multiplier]);

  // Filtered numbers with useMemo
  const filteredNumbers = useMemo(() => {
    console.log('Filtering numbers...');
    switch (filter) {
      case 'even':
        return numbers.filter(num => num % 2 === 0);
      case 'odd':
        return numbers.filter(num => num % 2 !== 0);
      default:
        return numbers;
    }
  }, [numbers, filter]);

  // Sorted and processed data
  const processedData = useMemo(() => {
    return filteredNumbers
      .map(num => ({ 
        value: num, 
        squared: num * num, 
        doubled: num * 2 
      }))
      .sort((a, b) => a.value - b.value);
  }, [filteredNumbers]);

  const addNumber = () => {
    const newNum = Math.floor(Math.random() * 100) + 1;
    setNumbers(prev => [...prev, newNum]);
  };

  const removeLastNumber = () => {
    setNumbers(prev => prev.slice(0, -1));
  };

  return (
    <div className="hook-example">
      <h4>useMemo Examples</h4>
      <div className="memo-demos">
        <div className="demo-item">
          <h5>Expensive Calculations</h5>
          <div className="controls">
            <label>
              Multiplier: 
              <input 
                type="number" 
                value={multiplier} 
                onChange={(e) => setMultiplier(Number(e.target.value))}
              />
            </label>
            <label>
              Filter: 
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </label>
          </div>
          <p>Sum with memo: {expensiveCalculationWithMemo}</p>
          <p>Sum without memo: {expensiveCalculationWithoutMemo()}</p>
          <div className="number-controls">
            <button onClick={addNumber}>Add Random Number</button>
            <button onClick={removeLastNumber}>Remove Last</button>
          </div>
        </div>
        <div className="demo-item">
          <h5>Processed Data ({filter} numbers)</h5>
          <div className="data-grid">
            {processedData.map((item, index) => (
              <div key={index} className="data-item">
                <span>Value: {item.value}</span>
                <span>Squared: {item.squared}</span>
                <span>Doubled: {item.doubled}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const RefExample = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const prevCountRef = useRef();
  const renderCountRef = useRef(0);
  const divRef = useRef(null);

  // Track render count
  renderCountRef.current += 1;

  // Store previous value
  useEffect(() => {
    prevCountRef.current = count;
  });

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const scrollToDiv = () => {
    divRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const changeBackgroundColor = () => {
    if (divRef.current) {
      const colors = ['lightblue', 'lightgreen', 'lightcoral', 'lightyellow'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      divRef.current.style.backgroundColor = randomColor;
    }
  };

  return (
    <div className="hook-example">
      <h4>useRef Examples</h4>
      <div className="ref-demos">
        <div className="demo-item">
          <h5>DOM Manipulation</h5>
          <input ref={inputRef} placeholder="Click button to focus me" />
          <button onClick={focusInput}>Focus Input</button>
          
          <div ref={divRef} className="ref-div">
            <p>This div can be scrolled to and styled</p>
            <p>Current count: {count}</p>
            <p>Previous count: {prevCountRef.current}</p>
          </div>
          
          <div className="ref-controls">
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
            <button onClick={scrollToDiv}>Scroll to Div</button>
            <button onClick={changeBackgroundColor}>Change Color</button>
          </div>
        </div>
        
        <div className="demo-item">
          <h5>Persistent Values</h5>
          <p>Component has rendered {renderCountRef.current} times</p>
          <p>Count: {count} (Previous: {prevCountRef.current})</p>
        </div>
      </div>
    </div>
  );
};

const CustomHooksExample = () => {
  const [name, setName] = useLocalStorage('user-name', '');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [isVisible, toggleActions] = useToggle(false);
  const windowSize = useWindowSize();
  
  // Mock API URL for demonstration
  const apiUrl = debouncedSearchTerm 
    ? `https://jsonplaceholder.typicode.com/posts?q=${debouncedSearchTerm}`
    : null;
  
  const { data, loading, error } = useFetch(apiUrl);

  return (
    <div className="hook-example">
      <h4>Custom Hooks Examples</h4>
      <div className="custom-hooks-demos">
        <div className="demo-item">
          <h5>useLocalStorage Hook</h5>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (persisted in localStorage)"
          />
          <p>Stored name: {name}</p>
        </div>

        <div className="demo-item">
          <h5>useDebounce + useFetch Hooks</h5>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts (debounced)"
          />
          <p>Search term: {searchTerm}</p>
          <p>Debounced search: {debouncedSearchTerm}</p>
          
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {data && (
            <div className="search-results">
              <p>Found {data.length} results</p>
            </div>
          )}
        </div>

        <div className="demo-item">
          <h5>useToggle Hook</h5>
          <button onClick={toggleActions.toggle}>
            {isVisible ? 'Hide' : 'Show'} Content
          </button>
          <button onClick={toggleActions.setTrue}>Force Show</button>
          <button onClick={toggleActions.setFalse}>Force Hide</button>
          
          {isVisible && (
            <div className="toggle-content">
              <p>This content is toggled!</p>
            </div>
          )}
        </div>

        <div className="demo-item">
          <h5>useWindowSize Hook</h5>
          <p>Window size: {windowSize.width} x {windowSize.height}</p>
          <p>Resize the window to see the values update!</p>
        </div>
      </div>
    </div>
  );
};

const AdvancedHooksExample = () => {
  // useReducer example
  const initialState = { count: 0, history: [] };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1,
          history: [...state.history, `Incremented to ${state.count + 1}`]
        };
      case 'decrement':
        return {
          count: state.count - 1,
          history: [...state.history, `Decremented to ${state.count - 1}`]
        };
      case 'reset':
        return {
          count: 0,
          history: [...state.history, 'Reset to 0']
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // useLayoutEffect example
  const [height, setHeight] = useState(0);
  const measureRef = useRef(null);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setHeight(measureRef.current.offsetHeight);
    }
  }, [state.history]);

  return (
    <div className="hook-example">
      <h4>Advanced Hooks (useReducer & useLayoutEffect)</h4>
      <div className="advanced-demos">
        <div className="demo-item">
          <h5>useReducer Example</h5>
          <p>Count: {state.count}</p>
          <div className="reducer-controls">
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          </div>
          
          <div ref={measureRef} className="history-section">
            <h6>History (Height: {height}px):</h6>
            <ul>
              {state.history.slice(-5).map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReactHooks = () => {
  return (
    <div className="hooks-container">
      <h2>React Hooks Examples</h2>
      
      <section className="hooks-section">
        <CounterExample />
      </section>

      <section className="hooks-section">
        <EffectExample />
      </section>

      <section className="hooks-section">
        <CallbackExample />
      </section>

      <section className="hooks-section">
        <MemoExample />
      </section>

      <section className="hooks-section">
        <RefExample />
      </section>

      <section className="hooks-section">
        <CustomHooksExample />
      </section>

      <section className="hooks-section">
        <AdvancedHooksExample />
      </section>

      {/* Code Examples and Best Practices */}
      <section className="hooks-section">
        <h3>Hook Implementation Examples</h3>
        
        <div className="code-example">
          <h4>1. Custom Hook Pattern:</h4>
          <pre><code>{`
// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>2. useEffect Patterns:</h4>
          <pre><code>{`
// Effect with cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  return () => clearInterval(timer); // Cleanup
}, []); // Empty deps = run once

// Effect with dependencies
useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]); // Runs when count changes

// Async effect
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  fetchData();
}, []);
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>3. useCallback vs useMemo:</h4>
          <pre><code>{`
// useCallback - memoizes functions
const handleClick = useCallback(() => {
  doSomething(param);
}, [param]); // Only recreate if param changes

// useMemo - memoizes values
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]); // Only recalculate if data changes

// Without memoization (new function every render)
const handleClick = () => doSomething(param);

// Without memoization (recalculates every render)
const expensiveValue = heavyCalculation(data);
          `}</code></pre>
        </div>

        <div className="code-example">
          <h4>4. useRef Use Cases:</h4>
          <pre><code>{`
// DOM manipulation
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus();

// Storing mutable values (doesn't trigger re-render)
const countRef = useRef(0);
const increment = () => {
  countRef.current += 1;
  console.log(countRef.current); // Won't cause re-render
};

// Storing previous values
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
          `}</code></pre>
        </div>

        <div className="best-practices">
          <h4>🎯 React Hooks Best Practices:</h4>
          <ul>
            <li><strong>Only call hooks at the top level</strong> - Never inside loops, conditions, or nested functions</li>
            <li><strong>Use dependency arrays correctly</strong> - Include all values from component scope that are used inside effect</li>
            <li><strong>Extract custom hooks</strong> - Reuse stateful logic between components</li>
            <li><strong>Use useCallback for child components</strong> - Prevent unnecessary re-renders</li>
            <li><strong>Use useMemo for expensive calculations</strong> - Only when the calculation is actually expensive</li>
            <li><strong>Keep effects focused</strong> - Split unrelated logic into separate effects</li>
            <li><strong>Clean up effects</strong> - Always clean up subscriptions, timers, etc.</li>
          </ul>
        </div>

        <div className="common-pitfalls">
          <h4>⚠️ Common Hook Pitfalls:</h4>
          <ul>
            <li><strong>Missing dependencies</strong> - Forgetting to include values in dependency arrays</li>
            <li><strong>Stale closures</strong> - Using outdated values in effects or callbacks</li>
            <li><strong>Infinite loops</strong> - Incorrect dependency arrays causing effects to run continuously</li>
            <li><strong>Overusing useMemo/useCallback</strong> - Adding them everywhere without measuring performance</li>
            <li><strong>Not cleaning up effects</strong> - Memory leaks from unremoved event listeners or timers</li>
            <li><strong>Conditional hooks</strong> - Calling hooks inside conditions breaks rules of hooks</li>
          </ul>
        </div>

        <div className="interview-tips">
          <h4>💡 Interview Tips:</h4>
          <ul>
            <li><strong>Explain hook lifecycle</strong> - When hooks run relative to render cycles</li>
            <li><strong>Compare class vs hooks</strong> - Benefits of hooks over class components</li>
            <li><strong>Demonstrate custom hooks</strong> - Show how to extract and reuse logic</li>
            <li><strong>Discuss performance</strong> - When and why to use useMemo/useCallback</li>
            <li><strong>Show error handling</strong> - How to handle errors in effects and async operations</li>
            <li><strong>Rules of hooks</strong> - Explain why the rules exist and their importance</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReactHooks;