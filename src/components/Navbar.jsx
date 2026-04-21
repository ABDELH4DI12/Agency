import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <a href="#" className="logo">
          <img loading="eager" src="/logo.png" alt="Creative Agency" className="h-12 w-auto" />
        </a>
        <div className="nav-links hidden md:flex gap-8 text-sm font-medium">
          <a href="#home" className="nav-link hover:text-purple-400 transition-colors">Home</a>
          <a href="#about" className="nav-link hover:text-purple-400 transition-colors">About</a>
          <a href="#projects" className="nav-link hover:text-purple-400 transition-colors">Projects</a>
          <a href="#designs" className="nav-link hover:text-purple-400 transition-colors">Designs</a>
          <a href="#montage" className="nav-link hover:text-purple-400 transition-colors">Montage</a>
          <a href="#automation" className="nav-link hover:text-purple-400 transition-colors">Automation</a>
          <a href="#contact" className="nav-link hover:text-purple-400 transition-colors">Contact</a>
        </div>
        <button 
          id="menu-btn" 
          className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
          onClick={toggleMenu}
        >
          <span className={`w-full h-0.5 bg-white origin-center transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`w-full h-0.5 bg-white origin-center transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex items-center justify-center transition-opacity ${isMenuOpen ? 'opacity-100 pointer-events-all' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-8 text-4xl font-bold text-center text-white">
          <a href="#home" className="mobile-link" onClick={closeMenu}>Home</a>
          <a href="#about" className="mobile-link" onClick={closeMenu}>About</a>
          <a href="#projects" className="mobile-link" onClick={closeMenu}>Projects</a>
          <a href="#designs" className="mobile-link" onClick={closeMenu}>Designs</a>
          <a href="#montage" className="mobile-link" onClick={closeMenu}>Montage</a>
          <a href="#automation" className="mobile-link" onClick={closeMenu}>Automation</a>
          <a href="#contact" className="mobile-link" onClick={closeMenu}>Contact</a>
        </div>
      </div>
    </>
  );
}

export default Navbar;
