# Frontend Technical Interview Preparation Guide

## Table of Contents
1. [Responsive Design](#responsive-design)
2. [Filter Functions](#filter-functions)
3. [React useContext](#react-usecontext)
4. [React Hooks](#react-hooks)
5. [Async Operations](#async-operations)
6. [Performance Optimization](#performance-optimization)
7. [Common Interview Questions](#common-interview-questions)

## Responsive Design

### Key Concepts to Know:
- **Mobile-First Approach**: Start with mobile styles, then add desktop styles
- **Flexbox vs Grid**: Flexbox for 1D layouts, Grid for 2D layouts
- **Media Queries**: `@media` rules for different screen sizes
- **Viewport Units**: `vw`, `vh`, `vmin`, `vmax`
- **Relative Units**: `em`, `rem`, `%`

### Common Breakpoints:
```css
/* Mobile First */
.container {
  /* Mobile styles (default) */
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1200px) {
  /* Large desktop styles */
}
```

## Filter Functions

### Array Filter Methods:
- `filter()`: Creates new array with elements that pass a test
- `find()`: Returns first element that passes a test
- `some()`: Tests if at least one element passes
- `every()`: Tests if all elements pass

### Search Implementation:
- Debouncing for performance
- Case-insensitive search
- Multiple field search

## React useContext

### When to Use:
- Avoiding prop drilling
- Global state (theme, auth, language)
- Sharing data across many components

### Best Practices:
- Split contexts by concern
- Use with useReducer for complex state
- Optimize with multiple contexts to prevent unnecessary re-renders

## React Hooks

### Essential Hooks:
- **useState**: Component state management
- **useEffect**: Side effects and lifecycle
- **useCallback**: Memoize functions
- **useMemo**: Memoize expensive calculations
- **useRef**: Direct DOM access and persistent values

## Performance Optimization

### Key Techniques:
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize functions to prevent child re-renders
- **useMemo**: Memoize expensive calculations
- **Code Splitting**: Lazy loading with React.lazy()
- **Virtual Scrolling**: For large lists

## Common Interview Questions

### JavaScript Fundamentals:
1. Explain closures and their use cases
2. Difference between `let`, `const`, and `var`
3. Event loop and asynchronous JavaScript
4. Promise vs async/await

### React Specific:
1. Virtual DOM and reconciliation
2. Component lifecycle methods vs hooks
3. Controlled vs uncontrolled components
4. Keys in React lists and why they matter

### CSS/Styling:
1. Box model and how it works
2. Flexbox vs Grid - when to use each
3. CSS specificity and cascade
4. CSS-in-JS vs traditional CSS

### Performance:
1. How to identify performance bottlenecks
2. Lazy loading strategies
3. Bundle optimization techniques
4. Memory leaks in React applications