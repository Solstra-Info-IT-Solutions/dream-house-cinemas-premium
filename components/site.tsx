"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Aperture, ArrowDown, Camera, Clapperboard, Menu, Video as VideoIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
const services = [
  ["Ad film production","Creative commercial films built around your brand and audience."],
  ["Documentary production","Documentary storytelling from research and planning to final delivery."],
  ["Corporate films","Professional films for businesses, teams and organisations."],
  ["Brand films","Distinctive visual stories that communicate brand identity."],
  ["Promotional videos","Promotional content for launches, campaigns and marketing."],
  ["Digital & social media","Video content designed for digital and social platforms."],
  ["Production support","Production assistance and support for shoots of every scale."],
];
function FilmVideo({src,className="",poster}:{src:string;className?:string;poster?:string}) {
  return <video className={className} autoPlay muted loop playsInline preload="metadata" poster={poster} aria-hidden="true"><source src={src} type="video/mp4"/></video>;
}
function Header(){
  const [open,setOpen]=useState(false);
  return <header className="nav dhc-nav"><Link href="/" className="brand"><span className="brand-mark dhc-logo-wrap"><img src="https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:2f741f08-9e62-42c4-a7c8-d7a31de7d16a" alt="Dream House Cinemas logo" /></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link>
    <nav className="nav-links"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/production">Production</Link><Link href="/rental">Equipment</Link><Link href="/works">Our Work</Link><Link href="/contact">Contact</Link><Link className="nav-cta" href="/book">Book Now</Link></nav>
    <button type="button" className="nav-cta mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} aria-controls="dhc-mobile-navigation">{open?<X size={18}/>:<Menu size={18}/>}</button>
    {open&&<nav id="dhc-mobile-navigation" className="mobile-panel" aria-label="Mobile navigation"><Link onClick={()=>setOpen(false)} href="/">Home</Link><Link onClick={()=>setOpen(false)} href="/about">About Us</Link><Link onClick={()=>setOpen(false)} href="/production">Production</Link><Link onClick={()=>setOpen(false)} href="/rental">Rental Equipment</Link><Link onClick={()=>setOpen(false)} href="/works">Our Works</Link><Link onClick={()=>setOpen(false)} href="/book">Book Now</Link><Link onClick={()=>setOpen(false)} href="/contact">Contact</Link></nav>}
  </header>;
}
function Footer(){return <footer className="footer"><div className="wrap footer-row"><Link className="brand" href="/"><span className="brand-mark dhc-logo-wrap"><img src="https://photoshop-api.adobe.io/v2/short-url/urn:aaid:ps:US:2f741f08-9e62-42c4-a7c8-d7a31de7d16a" alt="Dream House Cinemas logo" /></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link><span className="footer-note">© {new Date().getFullYear()} Dream House Cinemas. All Rights Reserved.</span><a className="footer-contact" href="/contact">Contact & enquiries</a></div></footer>}
const reveal={initial:{opacity:0},whileInView:{opacity:1},viewport:{once:true,amount:.12},transition:{duration:.65,ease:[.22,1,.36,1]} as const};
function Enquiry({label="Discuss your production"}:{label?:string}){return <a className="button-gold" href={`mailto:hello@dreamhousecinemas.com?subject=${encodeURIComponent(label)}`}>{label}</a>}
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
    <motion.div className="hero-bottom" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{delay:.85}}><a className="button-gold" href="#rental">Explore equipment rental</a><a className="button-line" href="#production"><Clapperboard size={14}/> Explore production</a></motion.div>
   </div>
   <div className="dhc-hero-foot"><span>CAMERA / LIGHT / GRIP / MOTION</span><a href="#production">SCROLL TO EXPLORE <ArrowDown size={13}/></a><span>DHC — PRODUCTION DIVISION</span></div>
  </section>
  <section className="dhc-intro wrap" id="production"><div className="dhc-intro-head"><span className="eyebrow">One creative partner. Two production essentials.</span><h2 className="serif">We shape the story.<br/><em>We equip the set.</em></h2></div><div className="dhc-intro-copy"><p className="large">Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p><p>With a passion for storytelling and a commitment to excellence, we create content that connects, inspires and leaves a lasting impact. From concept development to final delivery, we handle every aspect of production with creativity, precision and professionalism.</p><Link href="/about" className="button-line">Inside Dream House</Link></div></section>
  <section className="dhc-home-service-strip"><div><span>🎥</span>FILM PRODUCTION</div><div><span>📷</span>CAMERA RENTAL</div><div><span>💡</span>LIGHTING RENTAL</div><div><span>🎬</span>AD FILMS</div><div><span>📺</span>DOCUMENTARIES</div><div><span>👥</span>CORPORATE FILMS</div></section><div className="dhc-home-motto">DREAM. CREATE. CAPTURE.</div>
  <section className="dhc-production-band"><FilmVideo src={V.setup}/><div className="dhc-band-shade"/><div className="dhc-band-copy"><span className="eyebrow">Production services</span><p className="serif">Make every<br/><em>frame count.</em></p><span>PRE-PRODUCTION · PRODUCTION · POST</span></div></section>
  <section className="dhc-services wrap"><div className="section-head"><div><span className="eyebrow">Production capabilities</span><h2 className="serif">From brief to<br/><em>final frame.</em></h2></div></div><div className="dhc-service-grid">{services.map(([t,d])=><motion.article className="dhc-service" key={t} {...reveal}><h3 className="serif">{t}</h3><p>{d}</p><a href="mailto:hello@dreamhousecinemas.com?subject=Production%20Enquiry" aria-label={`Enquire about ${t}`}></a></motion.article>)}</div></section>
  <section id="rental" className="dhc-rental"><div className="wrap"><div className="section-head"><div><span className="eyebrow">Equipment rental</span><h2 className="serif">The right tools<br/>for <em>your vision.</em></h2></div><p className="dhc-rental-lede">Build your kit around the shoot. Tell us your dates, production requirements and preferred setup — our team can help with a rental enquiry.</p></div>
   <EquipmentCatalogue compact/>
   <div className="dhc-rental-note"><span>NEED A COMPLETE CAMERA PACKAGE?</span><Enquiry label="Request a rental quote"/></div>
  </div></section>
  <section className="dhc-reel"><FilmVideo src={V.lens}/><div className="dhc-reel-shade"/><div className="dhc-reel-caption"><span className="eyebrow">Built around the craft</span><p className="serif">Every setup<br/>starts with <em>the details.</em></p></div></section>
  <section className="dhc-process wrap"><div className="dhc-process-image"><img src={P.crew} alt="Film crew working with a cinema camera rig" loading="lazy"/></div><div className="dhc-process-copy"><span className="eyebrow">A crew-first approach</span><h2 className="serif">Production thinking.<br/><em>Practical support.</em></h2><p>We know a shoot is more than a camera body. It is the lens choice, the movement, the light, the monitoring and the crew working together. Our production and rental conversations start with what the project actually needs.</p><Enquiry label="Talk to our team"/></div></section>
  <section className="dhc-contact"><FilmVideo src={V.crew}/><div className="dhc-contact-shade"/><div className="wrap dhc-contact-copy"><span className="eyebrow">Your next production starts here</span><h2 className="serif">Have a shoot<br/>in mind? <em>Let’s talk.</em></h2><p>Share your production brief or equipment list. We’ll take it from there.</p><Enquiry label="Start a production or rental enquiry"/></div></section>
  <Footer/></main>;
}

const SOURCE_ASSET = "https://raw.githubusercontent.com/Solstra-Info-IT-Solutions/dhc-website/main/assets/";
const sourceServices = [
  ["AD FILM PRODUCTION","Creative commercial films built around your brand and audience."],
  ["DOCUMENTARY PRODUCTION","Documentary storytelling from research and planning to final delivery."],
  ["CORPORATE FILMS","Professional films for businesses, teams and organisations."],
  ["BRAND FILMS","Distinctive visual stories that communicate brand identity."],
  ["PROMOTIONAL VIDEOS","Promotional content for launches, campaigns and marketing."],
  ["DIGITAL & SOCIAL MEDIA","Video content designed for digital and social platforms."],
  ["PRODUCTION SUPPORT","Production assistance and support for shoots of every scale."],
];

type EquipmentItem = { name: string; price: number };
const equipmentGroups: { title: string; items: EquipmentItem[] }[] = [
 { title: "Camera", items: [
  {name:"S1H camera body",price:2000},
  {name:"Sigma 24-70 lens",price:800},
  {name:"Zhiyun Crane 3S gimbal",price:1000},
 ]},
 { title: "Lights", items: [
  {name:"Nanlight 500",price:600},{name:"300",price:400},{name:"Other LED light",price:400},
  {name:"RGB tube (one tube)",price:500},{name:"Aperture 1200",price:1500},{name:"Baby 1000",price:250},
  {name:"Baby 800",price:250},{name:"Baby 350",price:200},{name:"Baby 150",price:150},
  {name:"One KV",price:150},{name:"Two KV",price:200},{name:"Cool light",price:300},
  {name:"C stand",price:150},{name:"Jumbo stand",price:250},{name:"All frames",price:500},
  {name:"White clothes",price:100},{name:"Black clothes",price:100},{name:"Skimmer 12×12",price:200},
  {name:"Generator",price:800},{name:"Track and trolley",price:400}
 ]}
];
const money = (amount:number) => "₹"+amount.toLocaleString("en-IN");
function EquipmentCatalogue({compact=false}:{compact?:boolean}){
 const [expanded,setExpanded]=useState<Record<string,boolean>>({});
 return <div className={compact?"dhc-catalogue dhc-catalogue-compact":"dhc-catalogue"}>
  {equipmentGroups.map(group=>{
   const visible=expanded[group.title]?group.items:group.items.slice(0,6);
   return <section className="dhc-catalogue-category" key={group.title}>
    <div className="dhc-catalogue-heading"><div><span className="eyebrow">Equipment category</span><h3>{group.title}</h3></div><span className="dhc-catalogue-count">{group.items.length} items</span></div>
    <div className="dhc-catalogue-grid">{visible.map((item)=><article className="dhc-catalogue-card" key={item.name}><h4>{item.name}</h4><div className="dhc-catalogue-card-bottom"><strong>{money(item.price)}</strong><Link href={"/book?type=rental&item="+encodeURIComponent(item.name)}>Add to enquiry</Link></div></article>)}</div>
    {group.items.length>6&&<button className="dhc-catalogue-toggle" type="button" aria-expanded={!!expanded[group.title]} onClick={()=>setExpanded(v=>({...v,[group.title]:!v[group.title]}))}>{expanded[group.title]?"View less":"View more"}</button>}
   </section>;
  })}
 </div>;
}

function SourcePageHero({eyebrow,title,accent,copy,image}:{eyebrow?:string;title:string;accent?:string;copy:string;image:string}){
 return <section className="source-page-hero wrap"><div className="source-page-hero-copy"><span className="eyebrow">{eyebrow||"Dream House Cinemas"}</span><h1 className="serif">{title} {accent&&<em>{accent}</em>}</h1><p>{copy}</p><div className="source-hero-actions"><Link className="button-gold" href="/book">Discuss your requirements</Link><Link className="button-line" href="/contact">Talk to our team</Link></div></div><div className="source-page-visual"><FilmVideo src={title==="Equipment"?V.lens:V.setup} poster={SOURCE_ASSET+image}/><img src={SOURCE_ASSET+image} alt={title}/><span className="source-visual-caption">DREAM HOUSE CINEMAS · {title.toUpperCase()}</span></div></section>;
}
export function ProductionPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Production" accent="Services" copy="From Concept to Screen. We Bring Your Vision to Life. Dream House Cinemas provides end-to-end production services for brands, agencies, businesses, filmmakers and organizations. From creative development to final delivery, we handle every step with passion, precision and professional excellence." image="production-sunset.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Produce —</div><div className="source-service-grid">{sourceServices.map(([t,d])=><article key={t}><h2 className="serif">{t}</h2><p>{d}</p></article>)}</div><div className="source-bottom-cta"><p>Big or small, every story deserves great production.<br/><em>Let’s create something amazing together.</em></p><Link className="button-gold" href="/book">Start a project with us</Link></div><p className="source-trust">♡ Creative Excellence　 ·　 On-Time Delivery　 ·　 Professional Team　 ·　 End-to-End Support</p></section><Footer/></main>;
}
export function RentalPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Equipment" accent="Rental" copy="Professional Gear. For Every Vision. High quality camera, lighting and grip equipment for films, commercials, documentaries, corporate videos and digital content. Reliable gear. Expert support. On time, every time." image="rental-flatlay.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Rent —</div><EquipmentCatalogue/><div className="source-trust-strip"><span>🚚 Flexible Rental Periods</span><span>♡ Well Maintained Gear</span><span>🕒 Timely Delivery</span><span>🎧 Expert Support</span><span>✓ Trusted by Professionals</span></div><div className="source-bottom-cta"><p>Need equipment for your next shoot?</p><Link className="button-gold" href="/book?type=rental">Check availability</Link></div></section><Footer/></main>;
}
const workItems=[
 ["ad","AD FILM","work-adfilm.jpg"],["doc","DOCUMENTARY","work-documentary.jpg"],["corp","CORPORATE FILM","work-corporate.jpg"],["brand","BRAND FILM","work-brand.jpg"],["promo","PROMOTIONAL VIDEO","work-promo.jpg"],["ad","JEWELLERY AD","work-jewellery.jpg"],["corp","INDUSTRIAL FILM","work-industrial.jpg"],["doc","HEALTHCARE FILM","work-healthcare.jpg"],["promo","EVENT FILM","work-event.jpg"]
];
export function WorksPage(){
 const [filter,setFilter]=useState("all");
 return <main className="site-shell dhc-site"><Header/><section className="wrap source-works"><div className="source-works-intro"><div className="eyebrow">Our Work —</div><h1 className="serif">Featured <em>Work</em></h1><p>Every production starts with a point of view. Explore the kinds of stories and visual projects Dream House Cinemas creates.</p></div><div className="source-filter">{[["all","ALL"],["ad","AD FILMS"],["doc","DOCUMENTARIES"],["corp","CORPORATE FILMS"],["brand","BRAND FILMS"],["promo","PROMOTIONAL"]].map(([v,t])=><button key={v} onClick={()=>setFilter(v)} className={filter===v?"active":""}>{t}</button>)}</div><div className="source-work-grid">{workItems.filter(([cat])=>filter==="all"||filter===cat).map(([cat,label,img])=><article key={img}><img src={SOURCE_ASSET+img} alt={label} loading="lazy"/><div className="source-work-overlay"><span>{label}</span></div><i aria-hidden="true"></i></article>)}</div><p className="source-disclaimer">Project imagery shown as portfolio category previews. Actual project films can be added when the client’s final reel links are supplied.</p></section><Footer/></main>;
}
export function BookPage(){
 const [kind,setKind]=useState("production");
 const [selectedItems,setSelectedItems]=useState<string[]>([]);
 useEffect(()=>{const params=new URLSearchParams(window.location.search);if(params.get("type")==="rental")setKind("rental");const item=params.get("item");if(item&&equipmentGroups.some(group=>group.items.some(entry=>entry.name===item)))setSelectedItems([item]);},[]);
 const toggleItem=(name:string)=>setSelectedItems(items=>items.includes(name)?items.filter(item=>item!==name):[...items,name]);
 const estimate=equipmentGroups.flatMap(group=>group.items).filter(item=>selectedItems.includes(item.name)).reduce((sum,item)=>sum+item.price,0);
 return <main className="site-shell dhc-site"><Header/><section className="source-form-wrap"><div className="eyebrow">— Let’s Create Together —</div><h1 className="serif">Tell us about <em>your project</em></h1><p>We’re here to bring your vision to life.</p><div className="source-tabs" role="group" aria-label="Enquiry type"><button type="button" aria-pressed={kind==="production"} className={kind==="production"?"active":""} onClick={()=>setKind("production")}>Production Enquiry</button><button type="button" aria-pressed={kind==="rental"} className={kind==="rental"?"active":""} onClick={()=>setKind("rental")}>Equipment Rental Request</button></div><form action="mailto:hello@dreamhousecinemas.com" method="post" encType="text/plain" className="source-form"><input name="Enquiry type" type="hidden" value={kind}/><input name="Selected equipment" type="hidden" value={selectedItems.join(", ")}/><input name="Indicative equipment total" type="hidden" value={money(estimate)}/><input name="Name" aria-label="Your name" autoComplete="name" placeholder="Your Name *" required/><input name="Phone" type="tel" aria-label="Phone or WhatsApp number" autoComplete="tel" placeholder="Phone / WhatsApp *" required/><input name="Email" type="email" aria-label="Email address" autoComplete="email" placeholder="Email Address *" required/><input name="Project type" aria-label="Project type" placeholder="Project Type *" required/><input name="Shoot location" aria-label="Shoot location" placeholder="Shoot Location *" required/><input name="Shoot date" type="date" aria-label="Expected shoot date"/><input name="Budget" aria-label="Budget range (optional)" placeholder="Budget Range (Optional)"/>{kind==="rental"&&<div className="dhc-booking-picker"><h2>Select equipment</h2><p>Select the items you want to enquire about. Final availability and quotation will be confirmed by our team.</p>{equipmentGroups.map(group=><fieldset key={group.title}><legend>{group.title}</legend>{group.items.map(item=><label key={item.name}><input type="checkbox" checked={selectedItems.includes(item.name)} onChange={()=>toggleItem(item.name)}/><span>{item.name}</span><strong>{money(item.price)}</strong></label>)}</fieldset>)}<div className="dhc-booking-estimate"><span>{selectedItems.length} item(s) selected · indicative total</span><strong>{money(estimate)}</strong></div></div>}<textarea name="Brief" aria-label="Project brief" placeholder="Tell us about your project * (Brief about your project, script, requirements, number of shoot days, etc.)" required/><button className="button-gold" type="submit">Submit Enquiry</button><small>Listed prices are indicative; availability, rental duration and final quotation will be confirmed by Dream House Cinemas.</small></form></section><Footer/></main>;
}
export function ContactPage(){
 return <main className="site-shell dhc-site"><Header/><section className="source-contact wrap"><div className="source-contact-visual"><FilmVideo src={V.setup}/><span/></div><div className="eyebrow">— Get In Touch —</div><h1 className="serif">Let’s create something <em>amazing together</em></h1><p className="source-contact-intro">Have a project in mind or need equipment for your next shoot? We’re here to help.</p><div className="source-contact-grid"><form className="source-form" action="mailto:hello@dreamhousecinemas.com" method="post" encType="text/plain"><h2>SEND US A MESSAGE</h2><input name="Name" aria-label="Your name" autoComplete="name" placeholder="Your Name *" required/><input name="Phone" type="tel" aria-label="Phone or WhatsApp number" autoComplete="tel" placeholder="Phone / WhatsApp *" required/><input name="Email" type="email" aria-label="Email address" autoComplete="email" placeholder="Email Address *" required/><input name="Enquiry Type" aria-label="Enquiry type" placeholder="Enquiry Type *" required/><input name="Project Type" aria-label="Project type" placeholder="Project Type *" required/><textarea name="Message" aria-label="Message" placeholder="Tell us about your project * (Brief about your project, requirements, shoot days, etc.)" required/><button className="button-gold" type="submit">Submit Enquiry</button><small>🔒 We respect your privacy. Your information is safe with us.</small></form><div className="source-contact-info"><h2>CONTACT INFORMATION</h2><article><b>DREAM HOUSE CINEMAS</b><p>Kerala, India<br/>Serving Across South India</p></article><article><b>CALL / WHATSAPP</b><p>+91 999 555 1234<br/>+91 987 654 3210</p></article><article><b>EMAIL</b><p>hello@dreamhousecinemas.com<br/>info@dreamhousecinemas.com</p></article><article><b>WORKING HOURS</b><p>Mon – Sat : 9:00 AM – 7:00 PM<br/>Sunday : By Appointment</p></article><img src={SOURCE_ASSET+"contact-chair.jpg"} alt="Director's chair on set"/></div></div></section><Footer/></main>;
}

export function AboutPage(){
 return <main className="site-shell dhc-site"><Header/>
  <section className="dhc-about-hero"><FilmVideo src={V.crew}/><div className="dhc-about-shade"/><div className="wrap"><span className="eyebrow">About Us —</span><h1 className="serif">Who we <em>are.</em></h1><p>Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p></div></section>
  <section className="dhc-about-story wrap"><div><span className="eyebrow">About Dream House Cinemas</span><h2 className="serif">Your story is<br/><em>our passion.</em></h2></div><div><p className="large">Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p><p>With a passion for storytelling and a commitment to excellence, we create content that connects, inspires and leaves a lasting impact.</p><p>From concept development to final delivery, we handle every aspect of production with creativity, precision and professionalism. Our state-of-the-art equipment and skilled team ensure world-class quality for films, commercials, documentaries, corporate videos, and digital content.</p><p>We believe in building strong relationships with our clients by understanding their vision and delivering beyond expectations. Whether it’s a small shoot or a large-scale production, we bring the same level of dedication and quality to every project.</p><p><strong>At Dream House Cinemas, your story is our passion.</strong></p><Enquiry label="Work with Dream House Cinemas"/></div></section>
  <section className="source-about-stats wrap"><article><b>500+</b><span>Happy Clients</span></article><article><b>1200+</b><span>Projects Completed</span></article><article><b>2500+</b><span>Equipment Rentals</span></article><article><b>KERALA & SOUTH INDIA</b><span>Serving Across</span></article></section>
  <section className="dhc-about-image"><img src={SOURCE_ASSET+"about-camera.jpg"} alt="Cinema camera and director's chair on set"/><div><span className="eyebrow">The craft is in the details</span><p className="serif">At Dream House<br/><em>Cinemas.</em></p></div></section>
  <section className="dhc-about-cta"><div className="wrap"><span className="eyebrow">Production or equipment rental</span><h2 className="serif">Let’s get your<br/><em>next shoot ready.</em></h2><Enquiry label="Contact Dream House Cinemas"/></div></section><Footer/></main>;
}
