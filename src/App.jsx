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

const ParticleOverlay = ({ type }) => {
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    const count = type === 'rainy' ? 60 : (type === 'spring' || type === 'autumn') ? 18 : 0;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: type === 'rainy' ? (1.2 + Math.random() * 0.8) : (6 + Math.random() * 8),
      size: type === 'rainy' ? (1 + Math.random() * 2) : (12 + Math.random() * 14),
      rotation: Math.random() * 360,
      swayDelay: Math.random() * 2,
    }));
    setParticles(items);
  }, [type]);

  if (type === 'summer' || !type) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] overflow-hidden">
      {particles.map(p => {
        let child = null;
        if (type === 'spring') {
          // Cherry blossom / pink flower petal
          child = (
            <svg viewBox="0 0 24 24" fill="#FFB7C5" className="opacity-70 w-full h-full">
              <path d="M12,2 C10,5 6,5 6,8 C6,11 9,12 12,14 C15,12 18,11 18,8 C18,5 14,5 12,2 Z" />
            </svg>
          );
        } else if (type === 'autumn') {
          // Orange / brown leaf
          child = (
            <svg viewBox="0 0 24 24" fill="#D36B28" className="opacity-75 w-full h-full">
              <path d="M17,3 C12,3 9,8 9,12 C9,14 10,15 12,17 C16,15 19,10 19,6 C19,4 18,3 17,3 Z M7,17 C5,17 3,19 3,21 C5,21 7,19 7,17 Z" />
            </svg>
          );
        } else if (type === 'rainy') {
          // Blue rain line
          child = (
            <div className="w-[1.5px] h-[35px] bg-blue-400/40 rounded-full rotate-[15deg]" />
          );
        }

        return (
          <div
            key={p.id}
            className="absolute top-[-50px] animate-fall"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            <div 
              className={type !== 'rainy' ? "animate-sway" : ""} 
              style={{
                animationDuration: '3s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                animationDelay: `${p.swayDelay}s`
              }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Navigation = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-14 glass-nav rounded-none z-50 flex items-center justify-between px-8">
    <div className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
      <img src="/logo icon.PNG" alt="Logo" className="h-5 w-auto object-contain" />
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

const Hero = ({ season, seasonsEnabled, setSeasonsEnabled }) => {
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
      image: "/work-6.png"
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

  // Rainy ripples loop
  useEffect(() => {
    if (season !== 'rainy' || !seasonsEnabled) return;
    
    const interval = setInterval(() => {
      const hero = document.querySelector('.ripple-container');
      if (hero && window.$ && window.$(hero).ripples) {
        const width = hero.clientWidth;
        const height = hero.clientHeight;
        const x = Math.random() * width;
        const y = Math.random() * height;
        window.$(hero).ripples('drop', x, y, 10 + Math.random() * 20, 0.01 + Math.random() * 0.02);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [season, seasonsEnabled]);

  // Summer birds ripples path
  useEffect(() => {
    if (season !== 'summer' || !seasonsEnabled) return;

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
          
          window.$(hero).ripples('drop', x, y, 22, 0.01);
          
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
  }, [season, seasonsEnabled]);

  return (
    <section 
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden ripple-container"
      style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #F8FAFF 100%)' }}
    >
      <Glow className="top-20 left-10 w-[500px] h-[500px] bg-primary" />
      <Glow className="bottom-20 right-10 w-[600px] h-[600px] bg-warning/30" />
      
      {/* Summer birds overlay */}
      {(season === 'summer' && seasonsEnabled) && <SummerOverlay />}
      
      <div className="max-w-7xl mx-auto z-10 text-center pointer-events-none w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
        >
          {/* Left CTA: View the Inquiry */}
          <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1">
            <a 
              href="#work" 
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition-all rounded-none font-semibold text-sm whitespace-nowrap"
            >
              View the Inquiry
            </a>
          </div>

          {/* Center Text (Title and Subtitle) */}
          <div className="flex-1 text-center order-1 md:order-2">
            <h1 className="text-5xl md:text-7xl font-dmsans font-light leading-[0.95] mb-10 text-secondary tracking-tight">
              Multidisciplinary <br /> 
              <span className="text-primary italic">Design Strategist</span>
            </h1>
            <p className="text-lg md:text-2xl text-text/75 leading-relaxed mb-0 max-w-5xl mx-auto font-dmsans font-light">
              creating systems, behaviours, research and solutions with design as a medium.
            </p>
          </div>

          {/* Right CTA: The Philosophy */}
          <div className="w-full md:w-auto flex justify-center md:justify-end order-3">
            <button className="px-8 py-3 glass-card rounded-none font-semibold text-sm hover:bg-white/60 transition-all whitespace-nowrap">
              The Philosophy
            </button>
          </div>
        </motion.div>

        {/* Thin Auto-Scrolling Photo Marquee (Edge-to-Edge) */}
        <div className="mt-16 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-3 border-y border-primary/20 bg-white/5 backdrop-blur-sm select-none pointer-events-auto">
          <div className="animate-marquee flex whitespace-nowrap gap-6">
            {[...Array(3)].map((_, i) => (
              <React.Fragment key={i}>
                {marqueeProjects.map((project, idx) => {
                  const imageFilter = (season === 'rainy' && seasonsEnabled) ? 'brightness(0.7) contrast(1.1) saturate(0.8)' : 'none';
                  
                  if (project.link) {
                    return (
                      <a
                        key={`${i}-${idx}`}
                        href={project.link}
                        target={project.external ? "_blank" : undefined}
                        rel={project.external ? "noopener noreferrer" : undefined}
                        className="w-[200px] h-[110px] flex-shrink-0 overflow-hidden bg-neutral-100 shadow-sm border border-black/5 group cursor-pointer relative block"
                      >
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                          style={{ filter: imageFilter }} 
                        />
                        {(season === 'rainy' && seasonsEnabled) && <div className="absolute inset-0 rain-pattern pointer-events-none" />}
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
                          style={{ filter: imageFilter }} 
                        />
                        {(season === 'rainy' && seasonsEnabled) && <div className="absolute inset-0 rain-pattern pointer-events-none" />}
                      </div>
                    );
                  }
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="mt-16 flex justify-center pointer-events-auto">
          <button 
            onClick={() => setSeasonsEnabled(!seasonsEnabled)}
            className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all duration-300 cursor-pointer border-none bg-transparent"
          >
            <span>Enjoy seasons much?</span>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center ${seasonsEnabled ? 'bg-primary' : 'bg-neutral-300/40'}`}>
              <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 ${seasonsEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Background Glass Shapes */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-primary/5 rounded-full animate-float opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 border border-secondary/5 rounded-full animate-float opacity-20 pointer-events-none" style={{ animationDelay: '-3s' }} />
    </section>
  );
};

const ProjectCard = ({ number, title, category, image, video, link, span = "col-span-1" }) => (
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
        { number: "02", title: "Signals", category: "Thesis", image: "/leather signal .png", link: "/projects/signals.html", span: "md:col-span-1" },
        { number: "03", title: "Story of Sustainability", category: "Inquiry", image: "/choreography.png", link: "/projects/story-of-sustainability.html", span: "md:col-span-1" }
      ]
    },
    {
      title: "Business strategy design",
      projects: [
        { number: "04", title: "The Absolute Business strategy", category: "Strategy", video: "/Absolute planet.mov", link: "/projects/absolute-business-strategy.html", span: "md:col-span-4" }
      ]
    },
    {
      title: "Behaviours & Research Design",
      projects: [
        { number: "05", title: "The Choice Paradox", category: "Research", image: "/work-6.png", link: "/projects/choice-paradox.html", span: "md:col-span-2" },
        { number: "06", title: "Joulebug Case", category: "Behavioral", image: "/Joulebugcoverfinal.jpg.avif", link: "/projects/joulebug.html", span: "md:col-span-2" }
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
        <div className={`absolute inset-0 bg-gradient-to-b ${image ? 'from-black/80 via-black/20 to-transparent' : 'from-black/20 to-transparent opacity-0 group-hover:opacity-100'} transition-opacity`} />
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
          <span className="section-label">02. Speculative Spaces</span>
          <h2 className="text-6xl md:text-8xl font-bold text-[#E2E7F3] leading-none">Parallel <br />wonderlands</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
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
            I’m <span className="font-serif italic font-normal text-white">Varsha Nambiar</span>,
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

const Contact = () => (
  <section id="contact" className="py-32 px-6 bg-black text-white border-t border-white/10">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-dmsans italic font-light text-white mb-12 leading-relaxed">
        Would you like to dive into a conversation?
      </h2>
      <div className="flex justify-center items-center gap-8">
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
      <div className="font-display font-bold text-2xl mb-4 text-secondary">Varsha Nambiar</div>
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
  const [season, setSeason] = React.useState('spring');
  const [seasonsEnabled, setSeasonsEnabled] = React.useState(true);

  React.useEffect(() => {
    const SEASONS = ['spring', 'summer', 'autumn', 'rainy'];
    const currentCount = parseInt(localStorage.getItem('visit_count') || '0', 10);
    const nextCount = currentCount + 1;
    localStorage.setItem('visit_count', nextCount.toString());
    
    const currentSeason = SEASONS[currentCount % SEASONS.length];
    setSeason(currentSeason);
  }, []);

  return (
    <div className="selection:bg-primary/20 selection:text-primary">
      <CustomCursor />
      <Navigation />
      <main>
        <Hero season={season} seasonsEnabled={seasonsEnabled} setSeasonsEnabled={setSeasonsEnabled} />
        <Work />
        <Wonderlands />
        <About />
        <Contact />
        <ParticleOverlay type={seasonsEnabled ? season : null} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
