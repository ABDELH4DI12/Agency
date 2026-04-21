function Footer() {
  return (
    <footer className="py-16 px-4 md:px-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-black tracking-tight mb-4 inline-block">
              CRÉATIVE<span className="text-violet-300">.</span>
            </a>
            <p className="text-gray-500 max-w-md">
              We craft exceptional digital experiences through stunning design and innovative web development solutions.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-purple-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#designs" className="hover:text-white transition-colors">Designs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-purple-400">Connect</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Behance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-gray-600 text-sm">
          <p>© 2024 Créative Agency. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Designed with <span className="text-purple-500">♥</span> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
