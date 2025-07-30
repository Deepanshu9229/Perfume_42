import React from 'react';
import './ResponsiveDesign.css';

const ResponsiveDesign = () => {
  return (
    <div className="responsive-container">
      <h2>Responsive Design Examples</h2>
      
      {/* Flexbox Example */}
      <section className="flex-section">
        <h3>Flexbox Layout</h3>
        <div className="flex-container">
          <div className="flex-item">Item 1</div>
          <div className="flex-item">Item 2</div>
          <div className="flex-item">Item 3</div>
          <div className="flex-item">Item 4</div>
        </div>
      </section>

      {/* CSS Grid Example */}
      <section className="grid-section">
        <h3>CSS Grid Layout</h3>
        <div className="grid-container">
          <header className="grid-header">Header</header>
          <nav className="grid-nav">Navigation</nav>
          <main className="grid-main">Main Content</main>
          <aside className="grid-sidebar">Sidebar</aside>
          <footer className="grid-footer">Footer</footer>
        </div>
      </section>

      {/* Card Grid Example */}
      <section className="cards-section">
        <h3>Responsive Card Grid</h3>
        <div className="cards-container">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className="card">
              <h4>Card {num}</h4>
              <p>This is a responsive card that adapts to different screen sizes.</p>
              <button>Learn More</button>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Example */}
      <section className="nav-section">
        <h3>Responsive Navigation</h3>
        <nav className="responsive-nav">
          <div className="nav-brand">Brand</div>
          <div className="nav-toggle">☰</div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </section>

      {/* Typography Example */}
      <section className="typography-section">
        <h3>Responsive Typography</h3>
        <h1 className="responsive-heading">Fluid Typography</h1>
        <p className="responsive-text">
          This text uses clamp() function to scale smoothly between different screen sizes.
          The font size will adjust fluidly between the minimum and maximum values.
        </p>
      </section>
    </div>
  );
};

export default ResponsiveDesign;