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
  ["01","Film & video production","Concept development, production planning, on-set execution and post-production."],
  ["02","Cinematography & camera crew","Visual storytelling supported by experienced camera and lighting workflows."],
  ["03","Commercial & branded films","Purpose-built films for brands, campaigns, products and digital platforms."],
  ["04","Equipment rental","Camera, lens, lighting, grip and monitoring equipment for your next production."],
];
function FilmVideo({src,className="",poster}:{src:string;className?:string;poster?:string}) {
  return <video className={className} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true"><source src={src} type="video/mp4"/></video>;
}
function Header(){
  const [open,setOpen]=useState(false);
  return <header className="nav dhc-nav"><Link href="/" className="brand"><span className="brand-mark"><Aperture size={20}/></span><span className="brand-name">Dream House Cinemas<small>Production · Cinema Equipment · Rental</small></span></Link>
    <nav className="nav-links"><Link href="/">Home</Link><a href="/#production">Production</a><a href="/#rental">Equipment rental</a><Link href="/about">About</Link><a className="nav-cta" href="mailto:hello@dreamhousecinemas.in?subject=Production%20or%20Rental%20Enquiry">Enquire <ArrowUpRight size={14}/></a></nav>
    <button className="nav-cta mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X size={18}/>:<Menu size={18}/>}</button>
    {open&&<nav className="mobile-panel"><Link onClick={()=>setOpen(false)} href="/">Home</Link><a onClick={()=>setOpen(false)} href="/#production">Production</a><a onClick={()=>setOpen(false)} href="/#rental">Equipment rental</a><Link onClick={()=>setOpen(false)} href="/about">About</Link></nav>}
  </header>;
}
function Footer(){return <footer className="footer"><div className="wrap footer-row"><Link className="brand" href="/"><span className="brand-mark"><Aperture size={18}/></span><span className="brand-name">Dream House Cinemas<small>Production · Cinema Equipment · Rental</small></span></Link><span className="footer-note">© {new Date().getFullYear()} Dream House Cinemas</span><a className="footer-contact" href="mailto:hello@dreamhousecinemas.in">Production & rental enquiries <ArrowUpRight size={13}/></a></div></footer>}
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
    <motion.h1 className="serif" initial={{opacity:0,y:55,filter:"blur(9px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:1.1,ease:[.22,1,.36,1],delay:.15}}>Built for the<br/><em>language of cinema.</em></motion.h1>
    <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.65}} className="dhc-hero-lede">From the first frame to the final cut — production expertise and professional film equipment, ready for the story you want to tell.</motion.p>
    <motion.div className="hero-bottom" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.85}}><a className="button-gold" href="#rental">Explore equipment rental <ArrowUpRight size={15}/></a><a className="button-line" href="#production"><Clapperboard size={14}/> Explore production</a></motion.div>
   </div>
   <div className="dhc-hero-foot"><span>CAMERA / LIGHT / GRIP / MOTION</span><a href="#production">SCROLL TO EXPLORE <ArrowDown size={13}/></a><span>DHC — PRODUCTION DIVISION</span></div>
  </section>
  <section className="dhc-intro wrap" id="production"><div className="dhc-intro-head"><span className="eyebrow">One creative partner. Two production essentials.</span><h2 className="serif">We shape the story.<br/><em>We equip the set.</em></h2></div><div className="dhc-intro-copy"><p className="large">A production house that understands the image — and the equipment that brings it to life.</p><p>Dream House Cinemas brings film and video production together with cinema equipment rental. Whether you need a creative production partner, a dependable camera package or the right lighting and grip support, we help your crew get ready for the frame.</p><Link href="/about" className="button-line">Inside Dream House <ArrowUpRight size={15}/></Link></div></section>
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
export function AboutPage(){
 return <main className="site-shell dhc-site"><Header/><section className="dhc-about-hero"><FilmVideo src={V.crew}/><div className="dhc-about-shade"/><div className="wrap"><span className="eyebrow">About Dream House Cinemas</span><h1 className="serif">A house built<br/>around <em>cinema.</em></h1><p>Production insight. Equipment support. A shared respect for the craft behind every frame.</p></div></section>
  <section className="dhc-about-story wrap"><div><span className="eyebrow">Who we are</span><h2 className="serif">The people and<br/><em>tools behind it.</em></h2></div><div><p className="large">Dream House Cinemas works at the intersection of film production and professional cinema equipment rental.</p><p>We believe great filmmaking comes from a combination of a clear creative vision, a prepared crew and equipment that supports the work. Our approach brings these needs into one conversation — whether a client is developing a film, planning a commercial shoot or sourcing equipment for a production day.</p><p>From camera systems and lenses to lighting, grip and on-set monitoring, we focus on the practical details that help productions move with confidence.</p><Enquiry label="Work with Dream House Cinemas"/></div></section>
  <section className="dhc-about-image"><img src={P.dolly} alt="Cinema camera mounted on a dolly track on a film production set" loading="lazy"/><div><span className="eyebrow">The craft is in the details</span><p className="serif">Ready for<br/><em>the next take.</em></p></div></section>
  <section className="dhc-about-pillars wrap"><div><span className="eyebrow">What guides us</span><h2 className="serif">Creative vision.<br/><em>Production-ready.</em></h2></div><div className="dhc-pillar-list"><article><b>01</b><div><h3>Story-led production</h3><p>Creative decisions begin with the story, audience and purpose of the project.</p></div></article><article><b>02</b><div><h3>Equipment that serves the shot</h3><p>Rental discussions start with the real requirements of the production and crew.</p></div></article><article><b>03</b><div><h3>Collaboration on set</h3><p>Clear communication and practical planning help every department do its best work.</p></div></article></div></section>
  <section className="dhc-about-cta"><div className="wrap"><span className="eyebrow">Production or equipment rental</span><h2 className="serif">Let’s get your<br/><em>next shoot ready.</em></h2><Enquiry label="Contact Dream House Cinemas"/></div></section><Footer/></main>;
}
