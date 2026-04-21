import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Designs from './components/Designs'
import Montage from './components/Montage'
import Photography from './components/Photography'
import Automation from './components/Automation'
import Printing from './components/Printing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="bg-gray-950 text-white font-outfit overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Designs />
      <Montage />
      <Photography />
      <Automation />
      <Printing />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
