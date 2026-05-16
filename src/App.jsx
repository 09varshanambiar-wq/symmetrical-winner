import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Layers, Zap, Sparkles, MoveRight, Heart, Wind, Mail, MessageSquare, Plus } from 'lucide-react';

const Glow = ({ className }) => (
  <motion.div 
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.15, 0.25, 0.15]
    }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute rounded-full blur-[120px] ${className}`} 
  />
);

const Navigation = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 glass-nav rounded-none z-50 flex items-center justify-between px-8">
    <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
      <div className="w-2 h-2 bg-primary rounded-none animate-pulse" />
      Varsha Nambiar
    </div>
    <div className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-text/60">
      <a href="#work" className="hover:text-primary transition-colors">Works</a>
      <a href="#wonderlands" className="hover:text-primary transition-colors">Wonderlands</a>
      <a href="#about" className="hover:text-primary transition-colors">About</a>
      <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
    </div>
    <button className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary/10 text-primary rounded-none hover:bg-primary hover:text-white transition-all">
      Grab a coffee
    </button>
  </nav>
);

const Hero = () => {
  useEffect(() => {
    try {
      if (window.$ && window.$('.ripple-container').ripples) {
        // Initialize ripples with interactive: false to prevent click ripples
        window.$('.ripple-container').ripples({
          resolution: 512,
          dropRadius: 40,
          perturbance: 0.08,
          interactive: false,
          crossOrigin: ''
        });

        // Add custom mousemove handler to trigger ripples only on hover
        window.$('.ripple-container').on('mousemove', function(e) {
          var $el = window.$(this);
          var x = e.pageX - $el.offset().left;
          var y = e.pageY - $el.offset().top;
          $el.ripples('drop', x, y, 40, 0.08);
        });
      }
    } catch (e) {
      console.error("Ripple effect failed to initialize:", e);
    }

    return () => {
      try {
        if (window.$ && window.$('.ripple-container').ripples) {
          window.$('.ripple-container').off('mousemove');
          window.$('.ripple-container').ripples('destroy');
        }
      } catch (e) {}
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden ripple-container"
      style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #F8FAFF 100%)' }}
    >
      <Glow className="top-20 left-10 w-[500px] h-[500px] bg-primary" />
      <Glow className="bottom-20 right-10 w-[600px] h-[600px] bg-warning/30" />
      
      <div className="max-w-7xl mx-auto z-10 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-auto"
        >
          <h1 className="text-7xl md:text-9xl font-serif leading-[0.95] mb-10 text-secondary tracking-tight">
            Multidisciplinary <br /> 
            <span className="text-primary italic">Design Strategist</span>
          </h1>
          <p className="text-lg md:text-2xl text-text/50 leading-relaxed mb-12 max-w-3xl mx-auto italic font-light">
            creating systems, behaviours, research and solutions with design as a medium.
          </p>
          
          <div className="flex justify-center gap-6">
            <a href="#work" className="liquid-button">View the Inquiry</a>
            <button className="px-8 py-3 glass-card rounded-none font-semibold text-sm hover:bg-white/60 transition-all">
              The Philosophy
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Background Glass Shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary/5 rounded-full animate-float opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-secondary/5 rounded-full animate-float opacity-20 pointer-events-none" style={{ animationDelay: '-3s' }} />
    </section>
  );
};

const ProjectCard = ({ number, title, category, image, link, span = "col-span-1" }) => (
  <motion.a 
    href={link}
    whileHover={{ y: -8 }}
    className={`group relative block h-[450px] bg-neutral-900 overflow-hidden rounded-none ${span}`}
  >
    {/* Number Overlay */}
    <div className="absolute top-4 left-4 z-20">
      <span className="font-serif italic text-3xl text-white/20 group-hover:text-white/60 transition-colors duration-500">{number}</span>
    </div>
    
    {/* Category Overlay */}
    <div className="absolute top-6 right-6 z-20">
      <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-white/70">
        {category}
      </span>
    </div>

    {/* Image Container */}
    <div className="absolute inset-0 z-10">
      {image ? (
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10" />
      )}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
    </div>

    {/* Center Action */}
    <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
      <div className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl">
        View Inquiry <MoveRight size={14} />
      </div>
    </div>

    {/* Bottom Info */}
    <div className="absolute bottom-0 left-0 right-0 z-30 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
      <h3 className="text-xl font-bold text-white tracking-tight mb-1">{title}</h3>
      <div className="w-8 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
    </div>
  </motion.a>
);

const Work = () => {
  const rows = [
    {
      title: "Systems Design",
      projects: [
        { number: "01", title: "Intelligent Policy Platform", category: "Product", image: "/IPP cover.png", link: "/projects/intelligent-policy-platform.html", span: "md:col-span-2" },
        { number: "02", title: "Signals", category: "Thesis", image: "/leather signal .png", span: "md:col-span-1" },
        { number: "03", title: "Story of Sustainability", category: "Inquiry", image: "/SOS1.png", span: "md:col-span-1" }
      ]
    },
    {
      title: "Business strategy design",
      projects: [
        { number: "04", title: "GravityOne Story", category: "Agency", image: "/work-1.png", span: "md:col-span-2" },
        { number: "05", title: "The Absolute Business strategy", category: "Strategy", image: "/work-3.png", span: "md:col-span-2" }
      ]
    },
    {
      title: "Behaviours & Research Design",
      projects: [
        { number: "06", title: "The Choice Paradox", category: "Research", image: "/work-6.png", span: "md:col-span-1" },
        { number: "07", title: "Joulebug Case", category: "Behavioral", image: "/joulebug.jpg", link: "/projects/joulebug.html", span: "md:col-span-3" }
      ]
    }
  ];

  return (
    <section id="work" className="relative z-10 py-32 px-6 bg-black text-white">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <span className="section-label inline-block mb-4 text-primary">01. Selected Inquiry</span>
          <h2 className="text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none">The Works.</h2>
        </motion.div>
        
        <div className="space-y-32">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="space-y-8">
              <div className="flex items-center gap-10">
                <span className="font-serif italic text-white/80 text-xl md:text-2xl whitespace-nowrap">
                  {row.title}
                </span>
                <div className="h-[1px] bg-white/20 flex-grow"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {row.projects.map((project, index) => (
                  <ProjectCard key={index} {...project} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SystemBreaker = () => (
  <section className="relative h-[600px] overflow-hidden bg-white/30 border-y border-white/20">
    {/* Grid Background */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    
    <div className="max-w-7xl mx-auto h-full flex items-center justify-center relative">
      {/* Decorative Circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 border-[40px] border-primary/10 rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border-[1px] border-primary/20 rounded-full" />
      
      {/* Main Glass Shape */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="relative w-80 h-80 md:w-[500px] md:h-[500px]"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-secondary/20 to-warning/40 blur-2xl opacity-40 animate-pulse" />
        <div className="absolute inset-0 rounded-full backdrop-blur-3xl border border-white/40 shadow-2xl overflow-hidden" 
             style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 100%, 50% 15%, 0% 15%)' }}>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        </div>
      </motion.div>

      {/* Technical Text Overlay */}
      <div className="absolute right-10 top-20 text-[10px] font-mono text-primary/40 text-right leading-tight uppercase tracking-widest">
        System_Identifier: R[98] <br />
        Temporal_Index: 2026.05 <br />
        Mode: Equilibrium
      </div>
      
      <div className="absolute left-1/2 -translate-x-1/2 bottom-20 max-w-sm text-center">
        <p className="text-[10px] font-mono text-secondary/40 leading-relaxed uppercase tracking-tighter">
          "A pesar de los avances científicos en el campo de la neurociencia, todavía no se ha logrado comprender completamente cómo la actividad cerebral da lugar a la experiencia consciente."
        </p>
      </div>

      {/* Plus marks */}
      <div className="absolute top-1/3 left-1/3 text-primary/40 font-light text-2xl">+</div>
      <div className="absolute bottom-1/3 right-1/3 text-primary/40 font-light text-2xl">+</div>
    </div>
  </section>
);

const WonderlandCard = ({ title, subtitle, bgClass }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className={`relative aspect-[4/3] rounded-none overflow-hidden glass-card group cursor-pointer ${bgClass}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-8 left-8">
      <p className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-2">{subtitle}</p>
      <h4 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{title}</h4>
    </div>
    <div className="absolute top-8 right-8 w-10 h-10 glass-card rounded-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
      <Plus size={16} className="text-primary" />
    </div>
  </motion.div>
);

const Wonderlands = () => (
  <section id="wonderlands" className="py-32 px-6 bg-[#FAF7F2]">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-16 text-right">
        <div>
          <span className="section-label">02. Speculative Spaces</span>
          <h2 className="text-6xl md:text-8xl font-bold text-[#EAE2D5] leading-none">Parallel <br />wonderlands</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <WonderlandCard 
          title="Gaze Aversion"
          subtitle="Metacognition Inquiry"
          bgClass="bg-white/50"
        />
        <WonderlandCard 
          title="The Leafling: Swing"
          subtitle="Product Design"
          bgClass="bg-[#DBC6A7]/20"
        />
        <WonderlandCard 
          title="Agriculture by 2050"
          subtitle="Futures Design"
          bgClass="bg-[#A7C7DB]/20"
        />
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-32 px-6">
    <div className="max-w-5xl mx-auto glass-card p-16 rounded-none bg-primary/5">
      <span className="section-label">03. About Me</span>
      <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
        Listening for the <span className="text-primary italic font-light">Leverage Points</span>.
      </h2>
      <div className="grid md:grid-cols-2 gap-12 text-lg text-text/60 leading-relaxed font-light">
        <p>
          I operate at the intersection of architecture, behavior, and strategy. 
          My practice is about finding the points where small changes in narrative 
          or structure can lead to significant shifts in collective wellbeing.
        </p>
        <p>
          Influenced by Donella Meadows and Neri Oxman, I aim to design 
          environments that encourage metacognition—allowing us to 
          understand our role in the systems that shape our lives.
        </p>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-32 px-6">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-12 whitespace-nowrap overflow-hidden text-ellipsis">
        Shall we begin a quiet inquiry into the systems that shape us?
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <a href="mailto:hello@varshanambiar.com" className="liquid-button flex items-center gap-3 justify-center">
          <Mail size={20} /> hello@varshanambiar.com
        </a>
        <button className="px-10 py-4 glass-card rounded-none font-semibold hover:bg-white/60 transition-all flex items-center gap-3 justify-center">
          <MessageSquare size={20} className="text-primary" /> Start an Inquiry
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/20 bg-white/10 overflow-hidden">
    {/* Artwork Banner - Edge to Edge */}
    <div className="w-full h-[400px] md:h-[600px] overflow-hidden shadow-2xl">
      <img 
        src="/b7617e_c63877547b2e4a5c804d965fc7ff985a~mv2.jpg.avif" 
        alt="Featured Artwork" 
        className="w-full h-full object-cover"
      />
    </div>

    <div className="py-20 px-6 max-w-7xl mx-auto text-center">
      <div className="font-display font-bold text-2xl mb-4 text-secondary">Varsha Nambiar</div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">
        Multidisciplinary design strategist
      </p>
      
      <div className="flex justify-center space-x-12 text-[10px] font-black uppercase tracking-widest text-text/40 mb-12">
        <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        <a href="#" className="hover:text-primary transition-colors">Portfolio</a>
      </div>

      <div className="text-[9px] font-bold opacity-20 uppercase tracking-[0.5em]">
        © 2026 Varsha Nambiar — Inspired by the Art of Listening
      </div>
    </div>
  </footer>
);

const CustomCursor = () => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Get element under cursor to check background
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target) {
        const darkParent = target.closest('.bg-black');
        setIsDark(!!darkParent);
        
        setIsPointer(
          window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'A' ||
          target.tagName === 'BUTTON'
        );
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filter to turn image into #1856FF (brand blue)
  const blueFilter = "brightness(0) saturate(100%) invert(26%) sepia(89%) saturate(5427%) hue-rotate(224deg) brightness(101%) contrast(106%)";

  return (
    <div 
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
      }}
    >
      <img 
        src="/cursor1.png" 
        alt="cursor" 
        className="w-8 h-8 object-contain transition-all duration-300"
        style={{ 
          filter: isDark ? 'invert(1) brightness(2)' : blueFilter 
        }}
      />
    </div>
  );
};

function App() {
  return (
    <div className="selection:bg-primary/20 selection:text-primary">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Work />
        <SystemBreaker />
        <Wonderlands />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
