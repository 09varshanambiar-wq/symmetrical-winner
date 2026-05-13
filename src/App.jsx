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
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 glass-nav rounded-2xl z-50 flex items-center justify-between px-8">
    <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
      Varsha Nambiar
    </div>
    <div className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest text-text/60">
      <a href="#work" className="hover:text-primary transition-colors">Works</a>
      <a href="#wonderlands" className="hover:text-primary transition-colors">Wonderlands</a>
      <a href="#about" className="hover:text-primary transition-colors">About</a>
      <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
    </div>
    <button className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">
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
          <span className="section-label mx-auto bg-primary/10 px-4 py-1.5 rounded-full inline-block mb-10 text-primary">
            Systems Strategist & Futures Designer
          </span>
          <h1 className="text-7xl md:text-9xl font-bold leading-[0.9] mb-10 text-secondary tracking-tighter">
            "Dance <br /> 
            with <span className="text-primary italic font-light">Complexity</span>."
          </h1>
          <p className="text-lg md:text-2xl text-text/50 leading-relaxed mb-12 max-w-2xl mx-auto italic font-light">
            Listening to the rhythms of human behavior and systemic feedback to 
            find harmony within the digital and physical spaces we share.
          </p>
          
          <div className="flex justify-center gap-6">
            <a href="#work" className="liquid-button">View the Inquiry</a>
            <button className="px-8 py-3 glass-card rounded-full font-semibold text-sm hover:bg-white/60 transition-all">
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

const ProjectCard = ({ number, title, category, description, intent }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass-card p-10 rounded-[32px] group cursor-pointer h-full flex flex-col"
  >
    <div className="flex justify-between items-start mb-8">
      <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-500">
        <span className="font-mono text-sm group-hover:text-white">{number}</span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">{category}</span>
    </div>
    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">{title}</h3>
    <p className="text-sm text-text/50 leading-relaxed mb-6 flex-grow">
      {description}
    </p>
    <div className="pt-4 border-t border-primary/5">
      <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">The Intention</p>
      <p className="text-xs italic text-text/60 leading-relaxed">{intent}</p>
    </div>
    <div className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
      Join the Inquiry <ArrowUpRight size={14} className="text-primary" />
    </div>
  </motion.div>
);

const Work = () => {
  const projects = [
    { number: "01", title: "Intelligent Policy Platform", category: "Product", description: "Creating a cohesive digital environment for the Department of Health Australia to navigate complex policy landscapes.", intent: "To untangle the threads of public health policy." },
    { number: "02", title: "Signals", category: "Thesis", description: "A living material library that bridges the gap between biological intelligence and information systems.", intent: "To archive the intelligence of the living world." },
    { number: "03", title: "NUA", category: "Organisational Design", description: "A comprehensive design audit and organizational study for a pioneering fem-care startup.", intent: "To harmonize organizational intent with human care." },
    { number: "04", title: "JouleBug", category: "Shared Wisdom", description: "How might we nudge individual behavior toward collective care? A study in behavioral feedback and environmental agency.", intent: "To listen to the rhythm of our daily choices." },
    { number: "05", title: "Choice Paradox", category: "Digital Empathy", description: "Reframing digital choice as a space for quiet, intentional interaction.", intent: "To design for learning and rest." }
  ];

  return (
    <section id="work" className="relative z-10 py-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="section-label inline-block mb-4">01. Selected Inquiry</span>
          <h2 className="text-6xl md:text-8xl font-bold text-secondary/10 tracking-tighter leading-none">The Works.</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="h-[600px]"
            >
              <ProjectCard {...project} />
            </motion.div>
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
    className={`relative aspect-[4/3] rounded-3xl overflow-hidden glass-card group cursor-pointer ${bgClass}`}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-8 left-8">
      <p className="text-[10px] font-black uppercase tracking-widest text-text/40 mb-2">{subtitle}</p>
      <h4 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{title}</h4>
    </div>
    <div className="absolute top-8 right-8 w-10 h-10 glass-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
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
    <div className="max-w-5xl mx-auto glass-card p-16 rounded-[48px] bg-primary/5">
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
        <button className="px-10 py-4 glass-card rounded-full font-semibold hover:bg-white/60 transition-all flex items-center gap-3 justify-center">
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

function App() {
  return (
    <div className="selection:bg-primary/20 selection:text-primary">
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
