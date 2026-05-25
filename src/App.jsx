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

const BirdSVG = () => (
  <svg viewBox="0 0 64 64" className="w-full h-full fill-current">
    <path d="M32,24 C38,12 50,12 60,26 C48,27 38,32 32,44 C26,32 16,27 4,26 C14,12 26,12 32,24 Z" />
  </svg>
);

const SummerOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[45] overflow-hidden">
      {/* Real Bird */}
      <div 
        className="absolute w-8 h-8 text-primary/75"
        style={{
          top: '15%',
          animation: 'fly 10s linear infinite',
          animationDelay: '1.5s',
        }}
      >
        <div className="animate-flap" style={{ animationDuration: '0.25s', animationIterationCount: 'infinite' }}>
          <BirdSVG />
        </div>
      </div>
      
      {/* Reflection Bird */}
      <div 
        className="absolute w-8 h-8 text-primary/20 filter blur-[1px]"
        style={{
          top: '65%',
          animation: 'fly 10s linear infinite',
          animationDelay: '1.5s',
          transform: 'scaleY(-1)',
        }}
      >
        <div className="animate-flap opacity-50" style={{ animationDuration: '0.25s', animationIterationCount: 'infinite' }}>
          <BirdSVG />
        </div>
      </div>
    </div>
  );
};



const Navigation = () => {
  const [isDarkBg, setIsDarkBg] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const navElement = document.querySelector('nav.fixed');
      if (!navElement) return;

      const rect = navElement.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      // Check overlapping sections with dark background
      const darkSections = document.querySelectorAll('#work, #about, #contact');
      let overDark = false;
      for (const section of darkSections) {
        const secRect = section.getBoundingClientRect();
        if (centerY >= secRect.top && centerY <= secRect.bottom) {
          overDark = true;
          break;
        }
      }
      setIsDarkBg(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 rounded-none z-50 flex items-center justify-between px-8 transition-all duration-300 ${isDarkBg ? 'bg-black/35 border border-white/10 backdrop-blur-lg text-white' : 'glass-nav text-text'}`}>
      <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
        <img 
          src="/logo icon.PNG" 
          alt="Logo" 
          className="h-5 w-auto object-contain transition-all duration-300"
          style={{ filter: isDarkBg ? 'brightness(0) invert(1)' : 'none' }}
        />
        Varsha Nambiar
      </div>
      <div className={`hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkBg ? 'text-white/60' : 'text-text/60'}`}>
        <a href="#work" className={`transition-colors ${isDarkBg ? 'hover:text-white' : 'hover:text-primary'}`}>Works</a>
        <a href="#wonderlands" className={`transition-colors ${isDarkBg ? 'hover:text-white' : 'hover:text-primary'}`}>Wonderlands</a>
        <a href="#about" className={`transition-colors ${isDarkBg ? 'hover:text-white' : 'hover:text-primary'}`}>About</a>
        <a href="#contact" className={`transition-colors ${isDarkBg ? 'hover:text-white' : 'hover:text-primary'}`}>Contact</a>
      </div>
      <a 
        href="/Varsha Nambiar-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Varsha Nambiar-Resume.pdf"
        className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-none transition-all no-underline inline-block text-center ${isDarkBg ? 'bg-white/15 text-white hover:bg-white hover:text-black border border-white/25' : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}
      >
        Download Resume
      </a>
    </nav>
  );
};

const Hero = () => {
  const marqueeProjects = [
    {
      title: "Intelligent Policy Platform",
      link: "/projects/intelligent-policy-platform.html",
      image: "/IPP cover.png"
    },
    {
      title: "Signals",
      link: "/projects/signals.html",
      image: "/leather signal .png"
    },
    {
      title: "Story of Sustainability",
      link: "/projects/story-of-sustainability.html",
      image: "/choreography.png"
    },
    {
      title: "The Absolute Business strategy",
      link: "/projects/absolute-business-strategy.html",
      image: "/work-3.png"
    },
    {
      title: "The Choice Paradox",
      link: "/projects/choice-paradox.html",
      image: "/CHOICE PARADOX COVER.png"
    },
    {
      title: "Joulebug Case",
      link: "/projects/joulebug.html",
      image: "/Joulebugcoverfinal.jpg.avif"
    },
    {
      title: "The leafling",
      link: "/The Leafling.html",
      image: "/Leafling.png"
    },
    {
      title: "Permaculture Design",
      link: "/projects/permaculture-design.html",
      image: "/Permaculture.jpeg"
    }
  ];

  useEffect(() => {
    try {
      if (window.$ && window.$('.ripple-container').ripples) {
        // Initialize ripples — higher perturbance ensures visibility against light backgrounds
        window.$('.ripple-container').ripples({
          resolution: 512,
          dropRadius: 60,
          perturbance: 0.28,
          interactive: false,
          crossOrigin: ''
        });

        // Add custom mousemove handler to trigger ripples only on hover
        window.$('.ripple-container').on('mousemove', function(e) {
          var $el = window.$(this);
          var x = e.pageX - $el.offset().left;
          var y = e.pageY - $el.offset().top;
          $el.ripples('drop', x, y, 60, 0.28);
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

  // Summer birds ripples path
  useEffect(() => {
    let birdX = 0;
    const flyBird = () => {
      birdX = 0;
      const interval = setInterval(() => {
        const hero = document.querySelector('.ripple-container');
        if (hero && window.$ && window.$(hero).ripples) {
          const width = hero.clientWidth;
          const height = hero.clientHeight;
          const y = height * 0.65;
          const x = (birdX / 100) * width;
          
          window.$(hero).ripples('drop', x, y, 28, 0.06);
          
          birdX += 2;
          if (birdX > 100) {
            clearInterval(interval);
          }
        } else {
          clearInterval(interval);
        }
      }, 200); // sync with 10s fly animation
    };

    const initialTimeout = setTimeout(flyBird, 1500);
    const mainInterval = setInterval(flyBird, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(mainInterval);
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden ripple-container"
      style={{ backgroundImage: 'radial-gradient(at 0% 0%, hsla(220, 100%, 97%, 1) 0%, transparent 55%), radial-gradient(at 100% 0%, hsla(225, 100%, 93%, 1) 0%, transparent 55%), radial-gradient(at 50% 100%, hsla(230, 100%, 96%, 1) 0%, transparent 55%), radial-gradient(at 50% 50%, hsla(220, 80%, 98%, 1) 0%, transparent 80%), linear-gradient(160deg, #dce8ff 0%, #f0f5ff 40%, #e8f0fe 70%, #d8e8ff 100%)' }}
    >
      <Glow className="top-20 left-10 w-[500px] h-[500px] bg-primary" />
      <Glow className="bottom-20 right-10 w-[600px] h-[600px] bg-warning/30" />
      
      {/* Summer birds overlay */}
      <SummerOverlay />
      
      <div className="max-w-7xl mx-auto z-10 text-center pointer-events-none w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-auto max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-dmsans font-light leading-[0.95] mb-10 text-secondary tracking-tight">
            Multidisciplinary <br /> 
            <span className="text-primary italic">Design Strategist</span>
          </h1>
          <p className="text-lg md:text-2xl text-text/75 leading-relaxed mb-0 max-w-2xl mx-auto font-dmsans font-light">
            creating systems, behaviours, research and solutions with design as a medium.
          </p>
        </motion.div>

        {/* Thin Auto-Scrolling Photo Marquee (Edge-to-Edge) */}
        <div className="mt-16 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-3 border-y border-primary/20 bg-white/5 backdrop-blur-sm select-none pointer-events-auto">
          <div className="animate-marquee flex whitespace-nowrap gap-6">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                {marqueeProjects.map((project, idx) => {
                  if (project.link) {
                    return (
                      <a
                        key={`link-${i}-${idx}`}
                        href={project.link}
                        className="w-[200px] h-[110px] flex-shrink-0 overflow-hidden bg-neutral-100 shadow-sm border border-black/5 group cursor-pointer relative block"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                        />
                      </a>
                    );
                  } else {
                    return (
                      <div
                        key={`${i}-${idx}`}
                        className="w-[200px] h-[110px] flex-shrink-0 overflow-hidden bg-neutral-100 shadow-sm border border-black/5 group relative block cursor-default"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                        />
                      </div>
                    );
                  }
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center pointer-events-auto">
          <a 
            href="#work" 
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.25em] text-primary hover:text-primary/80 transition-colors duration-300 no-underline cursor-pointer"
          >
            <span>Dive deeper</span>
            <svg 
              viewBox="0 0 5 3" 
              className="w-3.5 h-2 fill-current animate-bounce"
              style={{ animationDuration: '1.5s' }}
            >
              <rect x="0" y="0" width="1" height="1" />
              <rect x="4" y="0" width="1" height="1" />
              <rect x="1" y="1" width="1" height="1" />
              <rect x="3" y="1" width="1" height="1" />
              <rect x="2" y="2" width="1" height="1" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Background Glass Shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary/5 rounded-full animate-float opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-secondary/5 rounded-full animate-float opacity-20 pointer-events-none" style={{ animationDelay: '-3s' }} />
    </section>
  );
};

const ProjectCard = ({ number, title, category, image, video, link, span, season, description }) => (
  <motion.a 
    href={link}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -8 }}
    className={`group relative block h-[450px] bg-neutral-900 overflow-hidden rounded-none ${span}`}
  >
    {/* Number Overlay */}
    <div className="absolute top-4 left-4 z-20">
      <span className="font-serif italic text-3xl text-white/20 group-hover:text-white/60 transition-colors duration-500">{number}</span>
    </div>
    
    {/* Category Overlay */}
    <div className="absolute top-6 right-6 z-20">
      <span className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-[0.2em] text-white">
        {category}
      </span>
    </div>

    {/* Video/Image Container */}
    <div className="absolute inset-0 z-10">
      {video ? (
        <video 
          src={video} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out" 
        />
      ) : image ? (
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
      <div className="border border-white text-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 bg-black/40 backdrop-blur-sm hover:bg-white hover:text-black transition-colors duration-300 shadow-2xl">
        Explore <MoveRight size={14} />
      </div>
    </div>

    {/* Bottom Info - ALWAYS VISIBLE */}
    <div className="absolute bottom-0 left-0 right-0 z-30 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-500">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 block mb-2">{season}</span>
      <h3 className="text-xl font-bold text-white tracking-tight mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-white/70 font-light leading-relaxed mt-2 line-clamp-2">{description}</p>
      )}
      <div className="w-8 h-0.5 bg-white/40 mt-3 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
    </div>
  </motion.a>
);

const Work = () => {
  const [viewMode, setViewMode] = React.useState('grid'); // 'grid' or 'timeline'

  const rows = [
    {
      title: "Systems Design",
      projects: [
        { number: "01", title: "Intelligent Policy Platform", category: "Product", image: "/IPP cover.png", link: "/projects/intelligent-policy-platform.html", span: "md:col-span-2", season: "Monsoon 2025 – Summer 2026", description: "Interactive health system mapping and simulation for Australian health policymakers." },
        { number: "02", title: "Signals", category: "Thesis", image: "/leather signal .png", link: "/projects/signals.html", span: "md:col-span-1", season: "Summer 2024", description: "Speculative design research into biomaterials, future systems, and human-nature integration." },
        { number: "03", title: "Story of Sustainability", category: "Inquiry", image: "/choreography.png", link: "/projects/story-of-sustainability.html", span: "md:col-span-1", season: "Spring 2023", description: "A system inquiry into the bioregions and theories of human-nature ecosystems." }
      ]
    },
    {
      title: "Business strategy design",
      projects: [
        { number: "04", title: "The Absolute Business strategy", category: "Strategy", video: "/Absolute planet.mov", link: "/projects/absolute-business-strategy.html", span: "md:col-span-4", season: "Monsoon 2023 – Winter 2024", description: "Strategic positioning, brand architecture, and investor deck storytelling for climate sciences." }
      ]
    },
    {
      title: "Behaviours & Research Design",
      projects: [
        { number: "05", title: "The Choice Paradox", category: "Research", image: "/CHOICE PARADOX COVER.png", link: "/projects/choice-paradox.html", span: "md:col-span-2", season: "Summer 2022", description: "Understanding the subconscious filters and social forces shaping child adoption in India." },
        { number: "06", title: "Joulebug Case", category: "Behavioral", image: "/Joulebugcoverfinal.jpg.avif", link: "/projects/joulebug.html", span: "md:col-span-2", season: "Fall 2022", description: "Behavioral deviances and social mechanics in carbon footprint tracking applications." }
      ]
    }
  ];

  const timelineItems = [
    {
      year: "Before 2021",
      title: "Architectural Design",
      category: "Architecture",
      description: "Academic & Professional Practice in architectural design, spatial planning, and physical form inquiry.",
      isPointer: true
    },
    {
      year: "Summer 2022",
      date: "May 2022",
      title: "The Choice Paradox",
      category: "Research",
      image: "/CHOICE PARADOX COVER.png",
      link: "/projects/choice-paradox.html",
      description: "Understanding the subconscious filters and social forces shaping child adoption in India."
    },
    {
      year: "Fall 2022",
      date: "Oct 2022",
      title: "Joulebug Case",
      category: "Behavioral",
      image: "/Joulebugcoverfinal.jpg.avif",
      link: "/projects/joulebug.html",
      description: "Behavioral deviances and social mechanics in carbon footprint tracking applications."
    },
    {
      year: "Spring 2023",
      date: "Apr 2023",
      title: "Story of Sustainability",
      category: "Inquiry",
      image: "/choreography.png",
      link: "/projects/story-of-sustainability.html",
      description: "A system inquiry into the bioregions and theories of human-nature ecosystems."
    },
    {
      year: "Monsoon 2023 – Winter 2024",
      date: "June 2023 – Jan 2024",
      title: "The Absolute Business strategy",
      category: "Strategy",
      video: "/Absolute planet.mov",
      link: "/projects/absolute-business-strategy.html",
      description: "Strategic positioning, brand architecture, and investor deck storytelling for climate sciences."
    },
    {
      year: "Summer 2024",
      date: "2024",
      title: "Signals",
      category: "Thesis",
      image: "/leather signal .png",
      link: "/projects/signals.html",
      description: "Speculative design research into biomaterials, future systems, and human-nature integration."
    },
    {
      year: "Monsoon 2025 – Summer 2026",
      date: "Aug 2025 – May 2026",
      title: "Intelligent Policy Platform",
      category: "Product",
      image: "/IPP cover.png",
      link: "/projects/intelligent-policy-platform.html",
      description: "Interactive health system mapping and simulation for Australian health policymakers."
    }
  ];

  return (
    <section id="work" className="relative z-10 py-32 px-6 bg-black text-white">
      <div className="max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-6xl md:text-8xl font-bold text-primary tracking-tighter leading-none mb-8">The Works.</h2>
        </motion.div>

        {/* Capsule View Toggle - Replaced with BENTO | TIMELINE Design */}
        <div className="flex justify-center items-center gap-6 mb-24 pointer-events-auto select-none relative z-20">
          <button 
            type="button"
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.45em] transition-all duration-300 cursor-pointer bg-transparent border-none pointer-events-auto ${viewMode === 'grid' ? 'text-[#004cff] scale-105' : 'text-white hover:text-white/80'}`}
          >
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[10px] transition-colors duration-300">
              <rect x="0.25" y="0.25" width="9.5" height="4.5" fill={viewMode === 'grid' ? "#004cff" : "#7F7F7F"} stroke="black" strokeWidth="0.5"/>
              <rect x="5.25" y="5.25" width="9.5" height="4.5" fill={viewMode === 'grid' ? "#004cff" : "#7F7F7F"} stroke="black" strokeWidth="0.5"/>
              <rect x="0.25" y="5.25" width="4.5" height="4.5" fill={viewMode === 'grid' ? "#004cff" : "#7F7F7F"} stroke="black" strokeWidth="0.5"/>
              <rect x="10.25" y="0.25" width="4.5" height="4.5" fill={viewMode === 'grid' ? "#004cff" : "#7F7F7F"} stroke="black" strokeWidth="0.5"/>
            </svg>
            <span className="ml-1">Bento</span>
          </button>
          
          <span className="text-white/40 text-lg font-light select-none mx-2">|</span>
          
          <button 
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.45em] transition-all duration-300 cursor-pointer bg-transparent border-none pointer-events-auto ${viewMode === 'timeline' ? 'text-[#004cff] scale-105' : 'text-white hover:text-white/80'}`}
          >
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[10px] transition-colors duration-300">
              <rect x="0.25" y="0.842102" width="14.5" height="8.5" fill={viewMode === 'timeline' ? "#004cff" : "#7F7F7F"} stroke="black" strokeWidth="0.5"/>
              <line y1="-0.5" x2="9.84886" y2="-0.5" transform="matrix(0.406138 -0.913812 0.805882 0.592076 3 9.5921)" stroke="black"/>
              <line y1="-0.5" x2="9.84886" y2="-0.5" transform="matrix(0.406138 -0.913812 0.805882 0.592076 9 9.5921)" stroke="black"/>
            </svg>
            <span className="ml-1">Timeline</span>
          </button>
        </div>
        
        {viewMode === 'grid' ? (
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
        ) : (
          <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-16 space-y-20 py-8 max-w-4xl mx-auto">
            {timelineItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Timeline node node */}
                <div className="absolute left-[-40px] md:left-[-72px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-primary group-hover:bg-primary transition-all duration-300 shadow-[0_0_8px_rgba(232,160,32,0.4)] group-hover:shadow-[0_0_12px_rgba(232,160,32,0.8)]" />
                
                <div className="flex flex-col md:flex-row gap-4 md:gap-16 items-start">
                  {/* Season column */}
                  <div className="w-56 flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">
                      {item.year}
                    </span>
                    {item.date && (
                      <span className="text-xs text-white/40 block">
                        {item.date}
                      </span>
                    )}
                  </div>

                  {/* Details Card */}
                  <div className="flex-grow w-full">
                    {item.isPointer ? (
                      <div className="p-6 border border-white/5 bg-neutral-900/20">
                        <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/50 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      <a href={item.link} className="block group/card">
                        <div className="border border-white/10 bg-neutral-900/40 hover:bg-neutral-900/80 hover:border-white/30 p-6 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row gap-6">
                          {item.image && (
                            <div className="w-full sm:w-32 h-20 flex-shrink-0 overflow-hidden bg-neutral-800 border border-white/5">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          {item.video && (
                            <div className="w-full sm:w-32 h-20 flex-shrink-0 overflow-hidden bg-neutral-800 border border-white/5">
                              <video 
                                src={item.video} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                              />
                            </div>
                          )}
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="text-[8px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 bg-white/5 border border-white/10 text-white">
                                  {item.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-white group-hover/card:text-white transition-colors duration-300 tracking-tight">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-sm text-white/60 font-light leading-relaxed mt-2 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <span className="text-xs text-white/80 font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-2 group-hover/card:translate-x-1 transition-transform duration-300">
                              Explore <MoveRight size={12} />
                            </span>
                          </div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const WonderlandCard = ({ title, subtitle, bgClass, image, link, external = false, objectFit = "cover", showGradient = true, darkText = false }) => {
  const CardWrapper = link ? motion.a : motion.div;
  return (
    <CardWrapper 
      href={link}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.02 }}
      className={`relative aspect-[4/3] rounded-none overflow-hidden glass-card group cursor-pointer block ${bgClass}`}
    >
      {image && (
        <img 
          src={image} 
          alt={title} 
          className={`absolute inset-0 w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-110`} 
        />
      )}
      {showGradient && (
        <div className={`absolute inset-0 bg-gradient-to-b ${image ? 'from-black/30 via-black/10 to-transparent' : 'from-black/10 to-transparent opacity-0 group-hover:opacity-100'} transition-opacity`} />
      )}
      <div className="absolute top-8 left-8 z-10">
        <h4 className={`text-xl font-bold transition-colors group-hover:text-primary ${darkText ? 'text-secondary' : image ? 'text-white' : 'text-secondary'}`}>{title}</h4>
      </div>
    </CardWrapper>
  );
};

const Wonderlands = () => (
  <section id="wonderlands" className="py-32 px-6 bg-[#F8FAFF]">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-end mb-16 text-right">
        <div>
          <h2 className="text-6xl md:text-8xl font-bold text-[#E2E7F3] leading-none">Parallel <br />wonderlands</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <WonderlandCard 
          title="Human Gaze Aversion to Metacognition"
          subtitle="Metacognition Inquiry"
          bgClass="bg-white"
          image="/metacognition.avif"
          link="https://www.behance.net/gallery/147242677/Metacognition-in-gaze-aversion"
          external={true}
          objectFit="contain"
          showGradient={false}
          darkText={true}
        />
        <WonderlandCard 
          title="The leafling"
          subtitle="Product Design"
          bgClass="bg-[#DBC6A7]/20"
          image="/Leafling.png"
          link="/The Leafling.html"
          showGradient={false}
          darkText={true}
        />
        <WonderlandCard 
          title="Permaculture Design"
          subtitle="Futures Design"
          bgClass="bg-[#A7C7DB]/20"
          image="/Permaculture.jpeg"
          link="/projects/permaculture-design.html"
        />
        <WonderlandCard 
          title="Architectural Design"
          subtitle="Architecture Portfolio"
          bgClass="bg-neutral-900"
          image="/Archi.png"
          link="https://www.behance.net/gallery/156986343/Architecture-Portfolio"
          external={true}
        />
      </div>
    </div>
  </section>
);

const About = () => {
  const carouselImages = [
    "/About1.jpeg",
    "/About2.jpeg",
    "/About3.jpeg",
    "/About4.jpeg",
    "/About5.jpeg",
    "/About6.jpeg",
    "/About7.jpeg",
    "/About8.jpeg",
    "/About10.jpeg"
  ];

  return (
    <section id="about" className="relative bg-black overflow-hidden select-none">
      {/* Split grid: Text on Left, Image on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 bg-black border-b-[4px] border-primary">
        
        {/* Left column: Text */}
        <div className="col-span-1 md:col-span-7 lg:col-span-8 p-12 md:p-20 lg:p-28 flex flex-col justify-center bg-black text-white">
          <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40 mb-12 block">
            ABOUT
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-10 leading-tight">
            Hello,<br />
            I’m <span className="font-dmsans italic font-normal text-white">Varsha Nambiar</span>,
          </h2>
          
          <div className="space-y-6 text-[16px] md:text-[17px] text-white/70 leading-relaxed font-light max-w-2xl">
            <p>
              I enjoy listening to stories and finding meaning in the little things around me. 
              Curiosity drives me. Whether it is learning a new word every day or validating a 
              sudden epiphany. Non-fiction is my comfort zone when it comes to reading, and I 
              am endlessly fascinated by metaphors, analogies, and the way ideas connect 
              across disciplines.
            </p>
            <p>
              I like to believe Architecture changed who I am and Design changes the way I 
              look at things. Grateful for the sea of perspectives both provide. If I could make 
              somebody’s life easier via designing solutions then that’s where I wanna be.
            </p>
            <p>
              I feel deeply connected to nature, not only for the calm and wonder it offers, 
              but also for the countless possibilities and discoveries it still holds.
            </p>
          </div>
        </div>

        {/* Right column: Image with vertical divider border */}
        <div className="col-span-1 md:col-span-5 lg:col-span-4 relative border-t-[4px] md:border-t-0 md:border-l-[4px] border-primary bg-black overflow-hidden h-[500px] md:h-auto min-h-[500px]">
          <div className="relative w-full h-full group cursor-pointer">
            {/* Black and White image */}
            <img 
              src="/me.png" 
              alt="Varsha Nambiar (B&W)" 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
            />
            {/* Color image */}
            <img 
              src="/me_colour.png" 
              alt="Varsha Nambiar (Color)" 
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
            />
          </div>
        </div>

      </div>

      {/* Under-section: Scrolling Marquee */}
      <div className="bg-black py-16 w-full">
        {/* Infinite Photo Marquee */}
        <div className="w-full overflow-hidden relative">
          {/* Gradient overlay fades on left and right */}
          <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-6 flex">
            {/* Set 1 */}
            {carouselImages.map((src, idx) => (
              <div key={`c1-${idx}`} className="w-[280px] h-[190px] md:w-[320px] md:h-[220px] flex-shrink-0 overflow-hidden bg-neutral-900 border border-white/5 group">
                <img 
                  src={src} 
                  alt={`Gallery photo ${idx + 1}`} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            ))}
            {/* Set 2 (for seamless looping) */}
            {carouselImages.map((src, idx) => (
              <div key={`c2-${idx}`} className="w-[280px] h-[190px] md:w-[320px] md:h-[220px] flex-shrink-0 overflow-hidden bg-neutral-900 border border-white/5 group">
                <img 
                  src={src} 
                  alt={`Gallery photo loop ${idx + 1}`} 
                  className="w-full h-full object-cover transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [animState, setAnimState] = React.useState('idle'); // 'idle', 'folding', 'flying', 'resetting'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Trigger the email client
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Hi Varsha,\n\n${message}\n\nBest,\n${name}`);
    const mailtoUrl = `mailto:09varsha.nambiar@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    // Start folding animation
    setAnimState('folding');
    
    // Morph/Fold duration is 600ms
    setTimeout(() => {
      setAnimState('flying');
    }, 650);

    // Flying animation takes 800ms
    setTimeout(() => {
      setAnimState('resetting');
      setName('');
      setMessage('');
    }, 1450);

    // Reset instantly and scale back to idle
    setTimeout(() => {
      setAnimState('idle');
    }, 1550);
  };

  // Build the inline transition and morph shape
  const containerStyle = {
    transition: animState === 'resetting' 
      ? 'none' 
      : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), clip-path 0.7s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease-in-out',
    clipPath: animState === 'idle' || animState === 'resetting'
      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
      : 'polygon(50% 0%, 100% 85%, 50% 70%, 0% 85%)'
  };

  let animClass = "";
  if (animState === 'idle') {
    animClass = "scale-100 rotate-0 translate-x-0 opacity-100";
  } else if (animState === 'folding') {
    animClass = "scale-50 -rotate-12 opacity-90";
  } else if (animState === 'flying') {
    animClass = "scale-0 rotate-[35deg] translate-x-[90vw] -translate-y-[350px] opacity-0";
  } else if (animState === 'resetting') {
    animClass = "scale-0 translate-x-0 translateY-0 rotate-0 opacity-0";
  }

  return (
    <div className="relative w-full max-w-xl mx-auto my-12 pointer-events-auto z-30">
      <form 
        onSubmit={handleSubmit}
        className={`w-full p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden transition-all ${animClass}`}
        style={containerStyle}
      >
        {/* We fade out form items during the folding sequence */}
        <div className={`transition-opacity duration-300 ${animState !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="mb-6 text-left">
            <label htmlFor="form-name" className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Name</label>
            <input 
              id="form-name"
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              disabled={animState !== 'idle'}
              className="w-full bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/10 outline-none rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300"
            />
          </div>
          <div className="mb-8 text-left">
            <label htmlFor="form-message" className="block text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">Message</label>
            <textarea 
              id="form-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              required
              disabled={animState !== 'idle'}
              className="w-full bg-white/5 border border-white/10 focus:border-white/40 focus:bg-white/10 outline-none rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 transition-all duration-300 resize-none"
            />
          </div>
          <button 
            type="submit" 
            disabled={animState !== 'idle'}
            className="w-full py-4 border border-white/20 hover:border-white hover:bg-white hover:text-black text-white font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 rounded-lg active:scale-95 shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            Send Message <MoveRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
};

const Contact = () => (
  <section id="contact" className="py-32 px-6 bg-black text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-dmsans italic font-light text-white mb-8 leading-relaxed">
        Would you like to dive into a conversation?
      </h2>
      
      <ContactForm />

      <div className="flex justify-center items-center gap-8 mt-16">
        {/* Behance Button */}
        <a 
          href="https://www.behance.net/varsha09/projects" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Behance"
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg group"
        >
          <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 13.5h-4.5c.1.7.6 1.1 1.4 1.1.6 0 1.1-.3 1.3-.8h1.7c-.3 1.3-1.4 2.2-3 2.2-2.3 0-3.1-1.7-3.1-3.5s.9-3.5 3-3.5c2 0 3 1.5 3 3.5 0 .4 0 .7-.1 1zm-4.4-1.2h2.7c-.1-.7-.5-1.1-1.3-1.1-.8 0-1.3.4-1.4 1.1zm-8.8 4.2H4.4V8.5H9c1.9 0 2.8.9 2.8 2.2 0 1.1-.6 1.7-1.4 1.9.9.2 1.6.9 1.6 2.2.1 1.2-.8 2.2-2.7 2.2zM6.1 10v2.2H8.5c.7 0 1.2-.3 1.2-1.1 0-.7-.5-1.1-1.2-1.1H6.1zm0 3.7v1.8H9c.7 0 1.3-.3 1.3-1s-.5-1-1.3-1H6.1zm11.4-6.4h4.5v1.1h-4.5V7.3z"/>
          </svg>
        </a>

        {/* Gmail Button */}
        <a 
          href="mailto:09varsha.nambiar@gmail.com" 
          title="Gmail"
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg group"
        >
          <Mail size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </a>
        
        {/* LinkedIn Button */}
        <a 
          href="https://www.linkedin.com/in/varsha-nambiar?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
          target="_blank" 
          rel="noopener noreferrer"
          title="LinkedIn"
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black hover:border-white text-white transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95 shadow-lg group"
        >
          <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
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
      <div className="font-display font-bold text-2xl mb-4 text-secondary flex items-center justify-center gap-3">
        <img src="/logo icon.PNG" alt="Logo" className="h-6 w-auto object-contain" />
        Varsha Nambiar
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">
        Multidisciplinary design strategist
      </p>
      
      <div className="flex justify-center items-center space-x-12 text-text/40 mb-12">
        {/* Behance Link */}
        <a 
          href="https://www.behance.net/varsha09/projects" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="Behance"
          className="hover:text-primary hover:scale-110 transition-all duration-300 flex items-center justify-center p-2"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 13.5h-4.5c.1.7.6 1.1 1.4 1.1.6 0 1.1-.3 1.3-.8h1.7c-.3 1.3-1.4 2.2-3 2.2-2.3 0-3.1-1.7-3.1-3.5s.9-3.5 3-3.5c2 0 3 1.5 3 3.5 0 .4 0 .7-.1 1zm-4.4-1.2h2.7c-.1-.7-.5-1.1-1.3-1.1-.8 0-1.3.4-1.4 1.1zm-8.8 4.2H4.4V8.5H9c1.9 0 2.8.9 2.8 2.2 0 1.1-.6 1.7-1.4 1.9.9.2 1.6.9 1.6 2.2.1 1.2-.8 2.2-2.7 2.2zM6.1 10v2.2H8.5c.7 0 1.2-.3 1.2-1.1 0-.7-.5-1.1-1.2-1.1H6.1zm0 3.7v1.8H9c.7 0 1.3-.3 1.3-1s-.5-1-1.3-1H6.1zm11.4-6.4h4.5v1.1h-4.5V7.3z"/>
          </svg>
        </a>

        {/* Gmail Link */}
        <a 
          href="mailto:09varsha.nambiar@gmail.com" 
          title="Gmail"
          className="hover:text-primary hover:scale-110 transition-all duration-300 flex items-center justify-center p-2"
        >
          <Mail size={24} />
        </a>

        {/* LinkedIn Link */}
        <a 
          href="https://www.linkedin.com/in/varsha-nambiar?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
          target="_blank" 
          rel="noopener noreferrer" 
          title="LinkedIn"
          className="hover:text-primary hover:scale-110 transition-all duration-300 flex items-center justify-center p-2"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
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
          !!(target.closest('a') || 
             target.closest('button') || 
             target.closest('[role="button"]') || 
             target.closest('.cursor-pointer') ||
             window.getComputedStyle(target).cursor === 'pointer')
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
        className="w-8 h-8 object-contain transition-all duration-300 pointer-events-none"
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
        <Wonderlands />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
