
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SectionHeader';
import { CONTENT, IMAGES } from '../constants';
import { Check, MapPin, Mail, Phone } from 'lucide-react';

// Cast motion.div to any to avoid "Property 'initial' does not exist" errors
const MotionDiv = motion.div as any;

export const ContentPage = React.forwardRef<HTMLDivElement>((props, ref) => {
  
  const fadeInViewport = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  // Elegant Card Style: White background, deep shadow, gold top border, generous padding
  const cardStyle = "bg-white shadow-[0_15px_50px_rgba(17,77,68,0.08)] p-8 md:p-16 lg:p-20 rounded-sm border-t-4 border-aredco-gold relative overflow-hidden transition-all duration-500";

  return (
    <div ref={ref} className="bg-aredco-cream text-aredco-charcoal min-h-screen relative z-10 pb-0">
      
      {/* SECTION 5: PURPOSE */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <MotionDiv {...fadeInViewport} className={cardStyle}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-aredco-gold/30 pb-8 lg:pb-0">
                    <SectionHeader title={CONTENT.purpose.title} />
                </div>
                <div className="lg:col-span-8">
                    <p className="text-lg md:text-xl font-sans font-light leading-loose whitespace-pre-wrap text-aredco-charcoal/90">
                        {CONTENT.purpose.body}
                    </p>
                </div>
            </div>
        </MotionDiv>
      </section>

      {/* SECTION 5 & 6: VISION & MISSION */}
      <section className="py-12 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <MotionDiv {...fadeInViewport} className="bg-aredco-charcoal text-aredco-cream p-12 md:p-16 shadow-2xl relative overflow-hidden">
               <div className="relative z-10">
                    <h3 className="font-serif text-3xl text-aredco-gold mb-8">{CONTENT.vision.title}</h3>
                    <p className="text-xl md:text-2xl font-serif italic leading-relaxed opacity-90">
                        "{CONTENT.vision.body}"
                    </p>
               </div>
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-aredco-gold/10 blur-3xl"></div>
          </MotionDiv>

          {/* Mission */}
          <MotionDiv {...fadeInViewport} transition={{ delay: 0.2 }} className="bg-aredco-green text-white p-12 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-serif text-3xl text-aredco-gold mb-8">{CONTENT.mission.title}</h3>
                    <p className="text-lg md:text-xl font-sans font-light leading-relaxed">
                        {CONTENT.mission.body}
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-aredco-gold/10 blur-3xl"></div>
          </MotionDiv>
      </section>

      {/* SECTION 7: TARGET AUDIENCE */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
             <SectionHeader title="Who We Designed This For" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {CONTENT.targetAudience.map((item, idx) => (
                <MotionDiv 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2, duration: 0.6 }}
                    className="bg-white p-12 shadow-[0_5px_30px_rgba(0,0,0,0.04)] border-b-4 border-aredco-gold/50 flex flex-col items-center text-center h-full hover:-translate-y-2 transition-transform duration-300"
                >
                    <div className="w-16 h-16 rounded-full bg-aredco-cream flex items-center justify-center mb-8 text-aredco-brown border border-aredco-gold/20 shrink-0">
                        <span className="font-serif text-2xl italic">{idx + 1}</span>
                    </div>
                    <p className="font-sans text-xl leading-relaxed text-aredco-charcoal/80">{item}</p>
                </MotionDiv>
            ))}
        </div>
      </section>

      {/* SECTION 8: THE CONCEPT */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <MotionDiv {...fadeInViewport} className={`${cardStyle} !p-0 grid grid-cols-1 lg:grid-cols-2`}>
             <div className="h-[400px] lg:h-auto relative overflow-hidden order-last lg:order-first">
                <img 
                    src={IMAGES.regency3} 
                    alt="Regency Villa Detail" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-aredco-green/20 mix-blend-multiply"></div>
             </div>
             
             <div className="bg-white p-12 lg:p-16 flex flex-col justify-center">
                <SectionHeader title="The Regency Villa Concept" className="mb-10" />
                <ul className="space-y-5">
                    {CONTENT.conceptPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-4 group">
                            <span className="mt-1 text-aredco-gold shrink-0">
                                <Check size={18} />
                            </span>
                            <span className="font-sans font-light text-lg text-aredco-charcoal group-hover:text-aredco-green transition-colors duration-300">
                                {point}
                            </span>
                        </li>
                    ))}
                </ul>
             </div>
        </MotionDiv>
      </section>

      {/* SECTION 9: LOCATION */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
         <MotionDiv {...fadeInViewport} className="bg-aredco-cream border border-aredco-brown/20 p-12 md:p-20 relative">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-aredco-brown"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-aredco-brown"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-aredco-brown"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-aredco-brown"></div>

            <div className="w-px h-16 bg-aredco-brown mx-auto mb-8 opacity-50"></div>
            <SectionHeader title="Our Location" className="mb-8" />
            
            <div className="flex flex-col items-center justify-center space-y-2 mb-12">
                <h3 className="font-serif text-2xl text-aredco-green font-semibold mb-2">AREDCO Headquarters</h3>
                {CONTENT.contact.address.slice(1).map((line, i) => (
                    <span key={i} className="block font-sans text-xl text-aredco-charcoal/80">{line}</span>
                ))}
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 border-t border-aredco-brown/10 pt-10">
                <a href={`mailto:${CONTENT.contact.email}`} className="flex items-center gap-3 text-aredco-brown hover:text-aredco-green transition-colors group">
                    <Mail size={20} className="text-aredco-gold" />
                    <span className="text-lg font-light tracking-wide">{CONTENT.contact.email}</span>
                </a>
                <a href={`tel:${CONTENT.contact.phone}`} className="flex items-center gap-3 text-aredco-brown hover:text-aredco-green transition-colors group">
                    <Phone size={20} className="text-aredco-gold" />
                    <span className="text-lg font-light tracking-wide">{CONTENT.contact.phone}</span>
                </a>
            </div>
         </MotionDiv>
      </section>

      {/* SECTION 10: PRIVATE INQUIRY */}
      <section className="py-24 md:py-32 px-6 bg-aredco-green text-aredco-gold relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <MotionDiv 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto relative z-10"
        >
            <div className="text-center mb-16">
                <span className="block font-sans text-sm tracking-[0.3em] uppercase text-aredco-gold/70 mb-4">Section 10</span>
                <h2 className="font-serif text-4xl md:text-6xl mb-6 text-aredco-cream">Private Inquiry</h2>
                <p className="font-sans font-light text-aredco-cream/80 text-lg max-w-lg mx-auto leading-relaxed">
                    This is a private conversation request. We invite you to share your details to begin the dialogue.
                </p>
            </div>

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group relative">
                        <input 
                            type="text" 
                            className="w-full bg-transparent border-b border-aredco-gold/30 py-4 text-aredco-cream focus:outline-none focus:border-aredco-gold transition-colors duration-500 text-xl font-serif placeholder-transparent peer"
                            placeholder="Full Name"
                            id="name"
                        />
                        <label htmlFor="name" className="absolute left-0 -top-3.5 text-aredco-gold/50 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-aredco-gold/30 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-aredco-gold peer-focus:text-sm font-sans tracking-wide">
                            Full Name
                        </label>
                    </div>
                    <div className="group relative">
                        <input 
                            type="tel" 
                            className="w-full bg-transparent border-b border-aredco-gold/30 py-4 text-aredco-cream focus:outline-none focus:border-aredco-gold transition-colors duration-500 text-xl font-serif placeholder-transparent peer"
                            placeholder="Phone"
                            id="phone"
                        />
                         <label htmlFor="phone" className="absolute left-0 -top-3.5 text-aredco-gold/50 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-aredco-gold/30 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-aredco-gold peer-focus:text-sm font-sans tracking-wide">
                            Phone Number
                        </label>
                    </div>
                </div>
                <div className="group relative">
                    <input 
                        type="email" 
                        className="w-full bg-transparent border-b border-aredco-gold/30 py-4 text-aredco-cream focus:outline-none focus:border-aredco-gold transition-colors duration-500 text-xl font-serif placeholder-transparent peer"
                        placeholder="Email"
                        id="email"
                    />
                     <label htmlFor="email" className="absolute left-0 -top-3.5 text-aredco-gold/50 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-aredco-gold/30 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-aredco-gold peer-focus:text-sm font-sans tracking-wide">
                        Email Address
                    </label>
                </div>
                <div className="group relative">
                     <textarea 
                        rows={2}
                        className="w-full bg-transparent border-b border-aredco-gold/30 py-4 text-aredco-cream focus:outline-none focus:border-aredco-gold transition-colors duration-500 resize-none text-xl font-serif placeholder-transparent peer"
                        placeholder="Message"
                        id="message"
                     ></textarea>
                      <label htmlFor="message" className="absolute left-0 -top-3.5 text-aredco-gold/50 text-sm transition-all peer-placeholder-shown:text-xl peer-placeholder-shown:text-aredco-gold/30 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-aredco-gold peer-focus:text-sm font-sans tracking-wide">
                        Personal Note (Optional)
                    </label>
                </div>

                <div className="pt-8 text-center">
                    <button className="px-16 py-5 border border-aredco-gold text-aredco-gold font-sans text-sm tracking-[0.25em] uppercase hover:bg-aredco-gold hover:text-aredco-green transition-all duration-700 ease-out">
                        Request Private Connection
                    </button>
                </div>
            </form>
        </MotionDiv>
      </section>
      
      <footer className="bg-aredco-green py-12 text-center border-t border-white/5">
        <div className="mb-4 opacity-50">
            <img src={IMAGES.logo} alt="AREDCO" className="h-12 w-auto mx-auto grayscale brightness-200" />
        </div>
        <p className="text-white/30 text-xs font-sans tracking-widest uppercase">© {new Date().getFullYear()} AREDCO. Quiet Luxury.</p>
      </footer>

    </div>
  );
});

ContentPage.displayName = "ContentPage";
