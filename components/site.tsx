"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Aperture, ArrowDown, ArrowUpRight, Camera, Clapperboard, Focus, Lightbulb, Menu, Monitor, Move3D, Radio, Video as VideoIcon, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const V = {
  hero: "https://videos.pexels.com/video-files/36604690/15520309_1920_1080_25fps.mp4",
  setup: "https://videos.pexels.com/video-files/36604686/15520317_1920_1080_25fps.mp4",
  crew: "https://videos.pexels.com/video-files/36604692/15520323_1920_1080_25fps.mp4",
  lens: "https://videos.pexels.com/video-files/10253357/10253357-uhd_4096_2160_25fps.mp4",
};
const P = {
  dolly: "https://images.pexels.com/photos/28532580/pexels-photo-28532580/free-photo-of-professional-camera-setup-on-a-dolly-track.jpeg?auto=compress&cs=tinysrgb&w=1800",
  rig: "https://images.pexels.com/photos/32439173/pexels-photo-32439173/free-photo-of-behind-the-scenes-on-a-film-set-with-camera-equipment.jpeg?auto=compress&cs=tinysrgb&w=1400",
  crew: "https://images.pexels.com/photos/34597919/pexels-photo-34597919/free-photo-of-professional-film-crew-operating-camera-rig.jpeg?auto=compress&cs=tinysrgb&w=1400",
  monitor: "https://images.pexels.com/photos/37893943/pexels-photo-37893943/free-photo-of-professional-film-production-on-set-with-monitor.jpeg?auto=compress&cs=tinysrgb&w=1400",
  camera: "https://images.pexels.com/photos/37593303/pexels-photo-37593303/free-photo-of-professional-film-camera-setup-in-studio-environment.jpeg?auto=compress&cs=tinysrgb&w=1400",
};
const categories = [
  {n:"01",title:"Cinema camera systems",detail:"Production camera bodies, cinema builds and recording accessories.",icon:Camera,image:P.camera},
  {n:"02",title:"Lenses & filtration",detail:"Lens packages, matte boxes, follow focus and filtration options.",icon:Focus,image:P.rig},
  {n:"03",title:"Lighting equipment",detail:"Film lights, modifiers, stands and essential lighting control.",icon:Lightbulb,image:P.crew},
  {n:"04",title:"Grip & camera movement",detail:"Dolly, support, rigging and movement tools for the shot.",icon:Move3D,image:P.dolly},
  {n:"05",title:"Monitors & video assist",detail:"On-set monitoring, viewing and video-assist essentials.",icon:Monitor,image:P.monitor},
  {n:"06",title:"Production accessories",detail:"Power, mounting, cables and the practical kit around a camera build.",icon:Radio,image:P.camera},
];
const services = [
  ["01","Ad film production","Creative commercial films built around your brand and audience."],
  ["02","Documentary production","Documentary storytelling from research and planning to final delivery."],
  ["03","Corporate films","Professional films for businesses, teams and organisations."],
  ["04","Brand films","Distinctive visual stories that communicate brand identity."],
  ["05","Promotional videos","Promotional content for launches, campaigns and marketing."],
  ["06","Digital & social media","Video content designed for digital and social platforms."],
  ["07","Production support","Production assistance and support for shoots of every scale."],
];
function FilmVideo({src,className="",poster}:{src:string;className?:string;poster?:string}) {
  return <video className={className} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true"><source src={src} type="video/mp4"/></video>;
}
function Header(){
  const [open,setOpen]=useState(false);
  return <header className="nav dhc-nav"><Link href="/" className="brand"><span className="brand-mark dhc-monogram" aria-hidden="true"><svg viewBox="0 0 48 48" role="img"><path d="M7 8h17c10 0 17 7 17 16S34 40 24 40H7V8Zm8 7v18h9c6 0 9-4 9-9s-3-9-9-9h-9Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 22h14" stroke="currentColor" strokeWidth="2"/></svg></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link>
    <nav className="nav-links"><Link href="/">Home</Link><Link href="/about">About Us</Link><Link href="/production">Production</Link><Link href="/rental">Rental Equipment</Link><Link href="/works">Our Works</Link><Link href="/book">Book Now</Link><Link href="/contact">Contact</Link><a className="nav-cta" href="/book">Enquire <ArrowUpRight size={14}/></a></nav>
    <button className="nav-cta mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X size={18}/>:<Menu size={18}/>}</button>
    {open&&<nav className="mobile-panel"><Link onClick={()=>setOpen(false)} href="/">Home</Link><Link onClick={()=>setOpen(false)} href="/about">About Us</Link><Link onClick={()=>setOpen(false)} href="/production">Production</Link><Link onClick={()=>setOpen(false)} href="/rental">Rental Equipment</Link><Link onClick={()=>setOpen(false)} href="/works">Our Works</Link><Link onClick={()=>setOpen(false)} href="/book">Book Now</Link><Link onClick={()=>setOpen(false)} href="/contact">Contact</Link></nav>}
  </header>;
}
function Footer(){return <footer className="footer"><div className="wrap footer-row"><Link className="brand" href="/"><span className="brand-mark dhc-monogram" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="M7 8h17c10 0 17 7 17 16S34 40 24 40H7V8Zm8 7v18h9c6 0 9-4 9-9s-3-9-9-9h-9Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M20 22h14" stroke="currentColor" strokeWidth="2"/></svg></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link><span className="footer-note">© {new Date().getFullYear()} Dream House Cinemas. All Rights Reserved.</span><a className="footer-contact" href="/contact">Contact & enquiries <ArrowUpRight size={13}/></a></div></footer>}
const reveal={initial:{opacity:0,y:34},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.16},transition:{duration:.8,ease:[.22,1,.36,1]} as const};
function Enquiry({label="Discuss your production"}:{label?:string}){return <a className="button-gold" href={`mailto:hello@dreamhousecinemas.in?subject=${encodeURIComponent(label)}`}>{label}<ArrowUpRight size={15}/></a>}
export function HomePage(){
 const heroRef=useRef<HTMLElement>(null);
 const {scrollYProgress}=useScroll({target:heroRef,offset:["start start","end start"]});
 const y=useTransform(scrollYProgress,[0,1],["0%","18%"]);
 return <main className="site-shell dhc-site"><Header/>
  <section ref={heroRef} className="hero dhc-hero">
   <motion.div className="dhc-hero-media" style={{y}}><FilmVideo src={V.hero} poster={P.dolly}/></motion.div>
   <div className="dhc-hero-shade"/><div className="dhc-corner dhc-tl"/><div className="dhc-corner dhc-br"/>
   <div className="wrap dhc-hero-content"><motion.span className="eyebrow" {...reveal}>A film production house & cinema equipment rental</motion.span>
    <motion.h1 className="serif" initial={{opacity:0,y:55,filter:"blur(9px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:1.1,ease:[.22,1,.36,1],delay:.15}}>Bringing stories to life.<br/><em>Frame by frame.</em></motion.h1>
    <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.65}} className="dhc-hero-lede">Film Production · Equipment Rental · Commercials · Documentaries. Dream House Cinemas is a Kerala based film production and professional shooting equipment rental company, serving Kerala & South India.</motion.p>
    <motion.div className="hero-bottom" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.85}}><a className="button-gold" href="#rental">Explore equipment rental <ArrowUpRight size={15}/></a><a className="button-line" href="#production"><Clapperboard size={14}/> Explore production</a></motion.div>
   </div>
   <div className="dhc-hero-foot"><span>CAMERA / LIGHT / GRIP / MOTION</span><a href="#production">SCROLL TO EXPLORE <ArrowDown size={13}/></a><span>DHC — PRODUCTION DIVISION</span></div>
  </section>
  <section className="dhc-intro wrap" id="production"><div className="dhc-intro-head"><span className="eyebrow">One creative partner. Two production essentials.</span><h2 className="serif">We shape the story.<br/><em>We equip the set.</em></h2></div><div className="dhc-intro-copy"><p className="large">Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p><p>With a passion for storytelling and a commitment to excellence, we create content that connects, inspires and leaves a lasting impact. From concept development to final delivery, we handle every aspect of production with creativity, precision and professionalism.</p><Link href="/about" className="button-line">Inside Dream House <ArrowUpRight size={15}/></Link></div></section>
  <section className="dhc-home-service-strip"><div><span>🎥</span>FILM PRODUCTION</div><div><span>📷</span>CAMERA RENTAL</div><div><span>💡</span>LIGHTING RENTAL</div><div><span>🎬</span>AD FILMS</div><div><span>📺</span>DOCUMENTARIES</div><div><span>👥</span>CORPORATE FILMS</div></section><div className="dhc-home-motto">DREAM. CREATE. CAPTURE.</div>
  <section className="dhc-production-band"><FilmVideo src={V.setup}/><div className="dhc-band-shade"/><div className="dhc-band-copy"><span className="eyebrow">01 / Production services</span><p className="serif">Make every<br/><em>frame count.</em></p><span>PRE-PRODUCTION · PRODUCTION · POST</span></div></section>
  <section className="dhc-services wrap"><div className="section-head"><div><span className="eyebrow">Production capabilities</span><h2 className="serif">From brief to<br/><em>final frame.</em></h2></div><span className="eyebrow">01 — Production</span></div><div className="dhc-service-grid">{services.map(([n,t,d])=><motion.article className="dhc-service" key={n} {...reveal}><span>{n} / 04</span><h3 className="serif">{t}</h3><p>{d}</p><a href="mailto:hello@dreamhousecinemas.in?subject=Production%20Enquiry" aria-label={`Enquire about ${t}`}><ArrowUpRight size={18}/></a></motion.article>)}</div></section>
  <section id="rental" className="dhc-rental"><div className="wrap"><div className="section-head"><div><span className="eyebrow">02 / Equipment rental</span><h2 className="serif">The right tools<br/>for <em>your vision.</em></h2></div><p className="dhc-rental-lede">Build your kit around the shoot. Tell us your dates, production requirements and preferred setup — our team can help with a rental enquiry.</p></div>
   <div className="dhc-equipment-grid">{categories.map((c,i)=><motion.article className="dhc-equipment-card" key={c.n} {...reveal}><div className="dhc-equipment-image"><img src={c.image} alt={c.title} loading="lazy"/><span>{c.n}</span></div><div className="dhc-equipment-info"><c.icon size={18}/><h3>{c.title}</h3><p>{c.detail}</p><a href={`mailto:hello@dreamhousecinemas.in?subject=${encodeURIComponent(c.title+" rental enquiry")}`}>Enquire about rental <ArrowUpRight size={14}/></a></div></motion.article>)}</div>
   <div className="dhc-rental-note"><span>NEED A COMPLETE CAMERA PACKAGE?</span><Enquiry label="Request a rental quote"/></div>
  </div></section>
  <section className="dhc-reel"><FilmVideo src={V.lens}/><div className="dhc-reel-shade"/><div className="dhc-reel-caption"><span className="eyebrow">Built around the craft</span><p className="serif">Every setup<br/>starts with <em>the details.</em></p></div></section>
  <section className="dhc-process wrap"><div className="dhc-process-image"><img src={P.crew} alt="Film crew working with a cinema camera rig" loading="lazy"/></div><div className="dhc-process-copy"><span className="eyebrow">A crew-first approach</span><h2 className="serif">Production thinking.<br/><em>Practical support.</em></h2><p>We know a shoot is more than a camera body. It is the lens choice, the movement, the light, the monitoring and the crew working together. Our production and rental conversations start with what the project actually needs.</p><Enquiry label="Talk to our team"/></div></section>
  <section className="dhc-contact"><FilmVideo src={V.crew}/><div className="dhc-contact-shade"/><div className="wrap dhc-contact-copy"><span className="eyebrow">Your next production starts here</span><h2 className="serif">Have a shoot<br/>in mind? <em>Let’s talk.</em></h2><p>Share your production brief or equipment list. We’ll take it from there.</p><Enquiry label="Start a production or rental enquiry"/></div></section>
  <Footer/></main>;
}

const SOURCE_ASSET = "https://raw.githubusercontent.com/Solstra-Info-IT-Solutions/dhc-website/main/assets/";
const sourceServices = [
  ["01","AD FILM PRODUCTION","Creative commercial films built around your brand and audience."],
  ["02","DOCUMENTARY PRODUCTION","Documentary storytelling from research and planning to final delivery."],
  ["03","CORPORATE FILMS","Professional films for businesses, teams and organisations."],
  ["04","BRAND FILMS","Distinctive visual stories that communicate brand identity."],
  ["05","PROMOTIONAL VIDEOS","Promotional content for launches, campaigns and marketing."],
  ["06","DIGITAL & SOCIAL MEDIA","Video content designed for digital and social platforms."],
  ["07","PRODUCTION SUPPORT","Production assistance and support for shoots of every scale."],
];
const rentalTypes = [
  ["01","CAMERAS","📷"],["02","LENSES","◉"],["03","LIGHTING","💡"],
  ["04","CAMERA SUPPORT","▤"],["05","ACCESSORIES","⚙"],["06","OTHER EQUIPMENT","▣"],
];
function SourcePageHero({eyebrow,title,accent,copy,image}:{eyebrow?:string;title:string;accent?:string;copy:string;image:string}){
 return <section className="source-page-hero wrap"><div className="source-page-hero-copy"><span className="eyebrow">{eyebrow||"Dream House Cinemas"}</span><h1 className="serif">{title} {accent&&<em>{accent}</em>}</h1><p>{copy}</p><div className="source-hero-actions"><Link className="button-gold" href="/book">Discuss your requirements <ArrowUpRight size={15}/></Link><Link className="button-line" href="/contact">Talk to our team <ArrowUpRight size={15}/></Link></div></div><div className="source-page-visual"><FilmVideo src={title==="Equipment"?V.lens:V.setup} poster={SOURCE_ASSET+image}/><img src={SOURCE_ASSET+image} alt={title}/><span className="source-visual-caption">DREAM HOUSE CINEMAS · {title.toUpperCase()}</span></div></section>;
}
export function ProductionPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Production" accent="Services" copy="From Concept to Screen. We Bring Your Vision to Life. Dream House Cinemas provides end-to-end production services for brands, agencies, businesses, filmmakers and organizations. From creative development to final delivery, we handle every step with passion, precision and professional excellence." image="production-sunset.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Produce —</div><div className="source-service-grid">{sourceServices.map(([n,t,d])=><article key={n}><span>{n} / 07</span><h2 className="serif">{t}</h2><p>{d}</p></article>)}</div><div className="source-bottom-cta"><p>Big or small, every story deserves great production.<br/><em>Let’s create something amazing together.</em></p><Link className="button-gold" href="/book">Start a project with us <ArrowUpRight size={15}/></Link></div><p className="source-trust">♡ Creative Excellence　 ·　 On-Time Delivery　 ·　 Professional Team　 ·　 End-to-End Support</p></section><Footer/></main>;
}
export function RentalPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Equipment" accent="Rental" copy="Professional Gear. For Every Vision. High quality camera, lighting and grip equipment for films, commercials, documentaries, corporate videos and digital content. Reliable gear. Expert support. On time, every time." image="rental-flatlay.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Rent —</div><div className="source-rental-grid">{rentalTypes.map(([n,t,ic])=><Link href="/book?type=rental" key={n}><span className="source-rental-icon">{ic}</span><span className="source-rental-title">VIEW {t}</span><span className="source-rental-number">{n}</span><ArrowUpRight size={17}/></Link>)}</div><div className="source-trust-strip"><span>🚚 Flexible Rental Periods</span><span>♡ Well Maintained Gear</span><span>🕒 Timely Delivery</span><span>🎧 Expert Support</span><span>✓ Trusted by Professionals</span></div><div className="source-bottom-cta"><p>Need equipment for your next shoot?</p><Link className="button-gold" href="/book?type=rental">Check availability <ArrowUpRight size={15}/></Link></div></section><Footer/></main>;
}
const workItems=[
 ["ad","AD FILM","work-adfilm.jpg"],["doc","DOCUMENTARY","work-documentary.jpg"],["corp","CORPORATE FILM","work-corporate.jpg"],["brand","BRAND FILM","work-brand.jpg"],["promo","PROMOTIONAL VIDEO","work-promo.jpg"],["ad","JEWELLERY AD","work-jewellery.jpg"],["corp","INDUSTRIAL FILM","work-industrial.jpg"],["doc","HEALTHCARE FILM","work-healthcare.jpg"],["promo","EVENT FILM","work-event.jpg"]
];
export function WorksPage(){
 const [filter,setFilter]=useState("all");
 return <main className="site-shell dhc-site"><Header/><section className="wrap source-works"><div className="eyebrow">Our Work —</div><h1 className="serif">Featured <em>Work</em></h1><p>Every production starts with a point of view. Explore the kinds of stories and visual projects Dream House Cinemas creates.</p></div><div className="source-filter">{[["all","ALL"],["ad","AD FILMS"],["doc","DOCUMENTARIES"],["corp","CORPORATE FILMS"],["brand","BRAND FILMS"],["promo","PROMOTIONAL"]].map(([v,t])=><button key={v} onClick={()=>setFilter(v)} className={filter===v?"active":""}>{t}</button>)}</div><div className="source-work-grid">{workItems.filter(([cat])=>filter==="all"||filter===cat).map(([cat,label,img],i)=><article key={img}><img src={SOURCE_ASSET+img} alt={label} loading="lazy"/><div className="source-work-overlay"><small>0{(i+1)} / DHC PORTFOLIO</small><span>{label}</span></div><i aria-hidden="true"><ArrowUpRight size={18}/></i></article>)}</div><p className="source-disclaimer">Project imagery shown as portfolio category previews. Actual project films can be added when the client’s final reel links are supplied.</p></section><Footer/></main>;
}
export function BookPage(){
 const [kind,setKind]=useState("production");
 return <main className="site-shell dhc-site"><Header/><section className="source-form-wrap"><div className="eyebrow">— Let’s Create Together —</div><h1 className="serif">Tell us about <em>your project</em></h1><p>We’re here to bring your vision to life.</p><div className="source-tabs"><button className={kind==="production"?"active":""} onClick={()=>setKind("production")}>🎬 Production Enquiry</button><button className={kind==="rental"?"active":""} onClick={()=>setKind("rental")}>📷 Equipment Rental Request</button></div><form action="mailto:hello@dreamhousecinemas.com" method="post" encType="text/plain" className="source-form"><input name="Enquiry type" type="hidden" value={kind}/><input name="Name" placeholder="Your Name *" required/><input name="Phone" type="tel" placeholder="Phone / WhatsApp *" required/><input name="Email" type="email" placeholder="Email Address *" required/><input name="Project type" placeholder="Project Type *" required/><input name="Shoot location" placeholder="Shoot Location *" required/><input name="Shoot date" type="date" aria-label="Expected Shoot Date"/><input name="Budget" placeholder="Budget Range (Optional)"/><textarea name="Brief" placeholder="Tell us about your project * (Brief about your project, script, requirements, number of shoot days, etc.)" required/><button className="button-gold" type="submit">Submit Enquiry <ArrowUpRight size={15}/></button><small>🔒 We respect your privacy. Your information is safe with us.</small></form></section><Footer/></main>;
}
export function ContactPage(){
 return <main className="site-shell dhc-site"><Header/><section className="source-contact wrap"><div className="source-contact-visual"><FilmVideo src={V.setup}/><span/></div><div className="eyebrow">— Get In Touch —</div><h1 className="serif">Let’s create something <em>amazing together</em></h1><p className="source-contact-intro">Have a project in mind or need equipment for your next shoot? We’re here to help.</p><div className="source-contact-grid"><form className="source-form" action="mailto:hello@dreamhousecinemas.com" method="post" encType="text/plain"><h2>SEND US A MESSAGE</h2><input name="Name" placeholder="Your Name *" required/><input name="Phone" type="tel" placeholder="Phone / WhatsApp *" required/><input name="Email" type="email" placeholder="Email Address *" required/><input name="Enquiry Type" placeholder="Enquiry Type *" required/><input name="Project Type" placeholder="Project Type *" required/><textarea name="Message" placeholder="Tell us about your project * (Brief about your project, requirements, shoot days, etc.)" required/><button className="button-gold" type="submit">Submit Enquiry <ArrowUpRight size={15}/></button><small>🔒 We respect your privacy. Your information is safe with us.</small></form><div className="source-contact-info"><h2>CONTACT INFORMATION</h2><article><b>DREAM HOUSE CINEMAS</b><p>Kerala, India<br/>Serving Across South India</p></article><article><b>CALL / WHATSAPP</b><p>+91 999 555 1234<br/>+91 987 654 3210</p></article><article><b>EMAIL</b><p>hello@dreamhousecinemas.com<br/>info@dreamhousecinemas.com</p></article><article><b>WORKING HOURS</b><p>Mon – Sat : 9:00 AM – 7:00 PM<br/>Sunday : By Appointment</p></article><img src={SOURCE_ASSET+"contact-chair.jpg"} alt="Director's chair on set"/></div></div></section><Footer/></main>;
}

export function AboutPage(){
 return <main className="site-shell dhc-site"><Header/>
  <section className="dhc-about-hero"><FilmVideo src={V.crew}/><div className="dhc-about-shade"/><div className="wrap"><span className="eyebrow">About Us —</span><h1 className="serif">Who we <em>are.</em></h1><p>Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p></div></section>
  <section className="dhc-about-story wrap"><div><span className="eyebrow">About Dream House Cinemas</span><h2 className="serif">Your story is<br/><em>our passion.</em></h2></div><div><p className="large">Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p><p>With a passion for storytelling and a commitment to excellence, we create content that connects, inspires and leaves a lasting impact.</p><p>From concept development to final delivery, we handle every aspect of production with creativity, precision and professionalism. Our state-of-the-art equipment and skilled team ensure world-class quality for films, commercials, documentaries, corporate videos, and digital content.</p><p>We believe in building strong relationships with our clients by understanding their vision and delivering beyond expectations. Whether it’s a small shoot or a large-scale production, we bring the same level of dedication and quality to every project.</p><p><strong>At Dream House Cinemas, your story is our passion.</strong></p><Enquiry label="Work with Dream House Cinemas"/></div></section>
  <section className="source-about-stats wrap"><article><b>500+</b><span>Happy Clients</span></article><article><b>1200+</b><span>Projects Completed</span></article><article><b>2500+</b><span>Equipment Rentals</span></article><article><b>KERALA & SOUTH INDIA</b><span>Serving Across</span></article></section>
  <section className="dhc-about-image"><img src={SOURCE_ASSET+"about-camera.jpg"} alt="Cinema camera and director's chair on set"/><div><span className="eyebrow">The craft is in the details</span><p className="serif">At Dream House<br/><em>Cinemas.</em></p></div></section>
  <section className="dhc-about-cta"><div className="wrap"><span className="eyebrow">Production or equipment rental</span><h2 className="serif">Let’s get your<br/><em>next shoot ready.</em></h2><Enquiry label="Contact Dream House Cinemas"/></div></section><Footer/></main>;
}
