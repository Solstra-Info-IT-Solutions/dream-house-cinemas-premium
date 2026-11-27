"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Clapperboard, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { equipmentGroups, money } from "@/lib/equipment";

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
  return <header className="nav dhc-nav"><Link href="/" className="brand"><span className="brand-mark dhc-logo-wrap"><Image src="/images/dhc-logo.webp" alt="Dream House Cinemas logo" width={46} height={46} priority /></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link>
    <nav className="nav-links"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/production">Production</Link><Link href="/rental">Equipment</Link><Link href="/works">Our Work</Link><Link href="/contact">Contact</Link><Link className="nav-cta" href="/book">Book Now</Link></nav>
    <button className="nav-cta mobile-menu" onClick={()=>setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open} aria-controls="dhc-mobile-navigation">{open?<X size={18}/>:<Menu size={18}/>}</button>
    {open&&<nav id="dhc-mobile-navigation" className="mobile-panel"><Link onClick={()=>setOpen(false)} href="/">Home</Link><Link onClick={()=>setOpen(false)} href="/about">About Us</Link><Link onClick={()=>setOpen(false)} href="/production">Production</Link><Link onClick={()=>setOpen(false)} href="/rental">Rental Equipment</Link><Link onClick={()=>setOpen(false)} href="/works">Our Works</Link><Link onClick={()=>setOpen(false)} href="/book">Book Now</Link><Link onClick={()=>setOpen(false)} href="/contact">Contact</Link></nav>}
  </header>;
}
function Footer(){return <footer className="footer"><div className="wrap footer-row"><Link className="brand" href="/"><span className="brand-mark dhc-logo-wrap"><Image src="/images/dhc-logo.webp" alt="Dream House Cinemas logo" width={64} height={64} /></span><span className="brand-name">DREAM HOUSE CINEMAS<small>FILM PRODUCTION · EQUIPMENT RENTAL</small></span></Link><span className="footer-note">© {new Date().getFullYear()} Dream House Cinemas. All Rights Reserved.</span><a className="footer-contact" href="/contact">Contact & enquiries</a></div></footer>}
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
  <section className="dhc-production-band"><FilmVideo src={V.setup} poster={P.crew}/><div className="dhc-band-shade"/><div className="dhc-band-copy"><span className="eyebrow">Production services</span><p className="serif">Make every<br/><em>frame count.</em></p><span>PRE-PRODUCTION · PRODUCTION · POST</span></div></section>
  <section className="dhc-services wrap"><div className="section-head"><div><span className="eyebrow">Production capabilities</span><h2 className="serif">From brief to<br/><em>final frame.</em></h2></div></div><div className="dhc-service-grid">{services.map(([t,d])=><motion.article className="dhc-service" key={t} {...reveal}><h3 className="serif">{t}</h3><p>{d}</p><a href="mailto:hello@dreamhousecinemas.com?subject=Production%20Enquiry" aria-label={`Enquire about ${t}`}></a></motion.article>)}</div></section>
  <section id="rental" className="dhc-rental"><div className="wrap"><div className="section-head"><div><span className="eyebrow">Equipment rental</span><h2 className="serif">The right tools<br/>for <em>your vision.</em></h2></div><p className="dhc-rental-lede">Build your kit around the shoot. Tell us your dates, production requirements and preferred setup — our team can help with a rental enquiry.</p></div>
   <EquipmentCatalogue compact/>
   <div className="dhc-rental-note"><span>NEED A COMPLETE CAMERA PACKAGE?</span><Enquiry label="Request a rental quote"/></div>
  </div></section>
  <section className="dhc-reel"><FilmVideo src={V.lens} poster={P.camera}/><div className="dhc-reel-shade"/><div className="dhc-reel-caption"><span className="eyebrow">Built around the craft</span><p className="serif">Every setup<br/>starts with <em>the details.</em></p></div></section>
  <section className="dhc-process wrap"><div className="dhc-process-image"><Image src={P.crew} alt="Film crew working with a cinema camera rig" width={1400} height={900} sizes="(max-width: 900px) 100vw, 50vw" loading="lazy"/></div><div className="dhc-process-copy"><span className="eyebrow">A crew-first approach</span><h2 className="serif">Production thinking.<br/><em>Practical support.</em></h2><p>We know a shoot is more than a camera body. It is the lens choice, the movement, the light, the monitoring and the crew working together. Our production and rental conversations start with what the project actually needs.</p><Enquiry label="Talk to our team"/></div></section>
  <section className="dhc-contact"><FilmVideo src={V.crew} poster={P.crew}/><div className="dhc-contact-shade"/><div className="wrap dhc-contact-copy"><span className="eyebrow">Your next production starts here</span><h2 className="serif">Have a shoot<br/>in mind? <em>Let’s talk.</em></h2><p>Share your production brief or equipment list. We’ll take it from there.</p><Enquiry label="Start a production or rental enquiry"/></div></section>
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

function EquipmentCatalogue({compact=false}:{compact?:boolean}){
 const [groups,setGroups]=useState<{id:string;title:string;items:{id:string;name:string;price:number}[]}[]>(equipmentGroups.map((g,i)=>({id:String(i),title:g.title,items:g.items.map(item=>({id:item.name,name:item.name,price:item.price}))})));
 useEffect(()=>{let live=true;fetch("/api/public/equipment").then(r=>r.ok?r.json():null).then(data=>{if(live&&data?.categories?.length)setGroups(data.categories.map((g:{id:string;name:string;items:{id:string;name:string;price:number}[]})=>({id:g.id,title:g.name,items:g.items})));}).catch(()=>{});return()=>{live=false};},[]);
 const [expanded,setExpanded]=useState<Record<string,boolean>>({});
 return <div className={compact?"dhc-catalogue dhc-catalogue-compact":"dhc-catalogue"}>
  {groups.map(group=>{const visible=expanded[group.id]?group.items:group.items.slice(0,6);return <section className="dhc-catalogue-category" key={group.id}>
   <div className="dhc-catalogue-heading"><div><span className="eyebrow">Equipment category</span><h3>{group.title}</h3></div><span className="dhc-catalogue-count">{group.items.length} items</span></div>
   <div className="dhc-catalogue-grid" id={"catalogue-"+group.id}>{visible.map(item=><article className="dhc-catalogue-card" key={item.id}><h4>{item.name}</h4><div className="dhc-catalogue-card-bottom"><strong>{money(item.price)}</strong><Link href={"/book?type=rental&item="+encodeURIComponent(item.name)+"&equipmentId="+encodeURIComponent(item.id)}>Add to enquiry</Link></div></article>)}</div>
   {group.items.length>6&&<button className="dhc-catalogue-toggle" type="button" aria-expanded={!!expanded[group.id]} aria-controls={"catalogue-"+group.id} onClick={()=>setExpanded(v=>({...v,[group.id]:!v[group.id]}))}>{expanded[group.id]?"View less":"View more"}</button>}
  </section>})}
 </div>;
}
function SourcePageHero({eyebrow,title,accent,copy,image}:{eyebrow?:string;title:string;accent?:string;copy:string;image:string}){
 return <section className="source-page-hero wrap"><div className="source-page-hero-copy"><span className="eyebrow">{eyebrow||"Dream House Cinemas"}</span><h1 className="serif">{title} {accent&&<em>{accent}</em>}</h1><p>{copy}</p><div className="source-hero-actions"><Link className="button-gold" href="/book">Discuss your requirements</Link><Link className="button-line" href="/contact">Talk to our team</Link></div></div><div className="source-page-visual"><FilmVideo src={title==="Equipment"?V.lens:V.setup} poster={SOURCE_ASSET+image}/><Image src={SOURCE_ASSET+image} alt={title} fill sizes="(max-width: 900px) 100vw, 50vw" priority/><span className="source-visual-caption">DREAM HOUSE CINEMAS · {title.toUpperCase()}</span></div></section>;
}
export function ProductionPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Production" accent="Services" copy="From Concept to Screen. We Bring Your Vision to Life. Dream House Cinemas provides end-to-end production services for brands, agencies, businesses, filmmakers and organizations. From creative development to final delivery, we handle every step with passion, precision and professional excellence." image="production-sunset.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Produce —</div><div className="source-service-grid">{sourceServices.map(([t,d])=><article key={t}><h2 className="serif">{t}</h2><p>{d}</p></article>)}</div><div className="source-bottom-cta"><p>Big or small, every story deserves great production.<br/><em>Let’s create something amazing together.</em></p><Link className="button-gold" href="/book">Start a project with us</Link></div><p className="source-trust">♡ Creative Excellence　 ·　 On-Time Delivery　 ·　 Professional Team　 ·　 End-to-End Support</p></section><Footer/></main>;
}
export function RentalPage(){
 return <main className="site-shell dhc-site"><Header/><SourcePageHero title="Equipment" accent="Rental" copy="Professional Gear. For Every Vision. High quality camera, lighting and grip equipment for films, commercials, documentaries, corporate videos and digital content. Reliable gear. Expert support. On time, every time." image="rental-flatlay.jpg"/>
 <section className="wrap source-content"><div className="eyebrow">— What We Rent —</div><EquipmentCatalogue/><div className="source-trust-strip"><span>🚚 Flexible Rental Periods</span><span>♡ Well Maintained Gear</span><span>🕒 Timely Delivery</span><span>🎧 Expert Support</span><span>✓ Trusted by Professionals</span></div><div className="source-bottom-cta"><p>Need equipment for your next shoot?</p><Link className="button-gold" href="/book?type=rental">Check availability</Link></div></section><Footer/></main>;
}

export function WorksPage(){
 const [categories,setCategories]=useState<{id:string;name:string;slug:string;projects:{id:string}[]}[]>([]);
 const [recent,setRecent]=useState<{id:string;title:string;slug:string;coverImage:string|null;description:string;mediaUrl:string|null}[]>([]);
 useEffect(()=>{let live=true;Promise.all([fetch("/api/public/works").then(r=>r.ok?r.json():null),fetch("/api/public/recent-works").then(r=>r.ok?r.json():null)]).then(([workData,recentData])=>{if(!live)return;if(workData?.categories)setCategories(workData.categories);if(recentData?.items)setRecent(recentData.items);}).catch(()=>{});return()=>{live=false};},[]);
 return <main className="site-shell dhc-site"><Header/><section className="wrap source-works">
  <div className="source-works-intro"><div className="eyebrow">Our Work —</div><h1 className="serif">Featured <em>Work</em></h1><p>Explore our featured films by category. Choose a category to see only its productions, then open a film to watch the full video.</p></div>
  <div className="source-category-grid">{categories.map(c=><Link key={c.id} href={"/works/category/"+c.slug} className="source-category-card"><span className="eyebrow">{c.projects.length} films</span><h2 className="serif">{c.name}</h2><span className="source-category-action">Explore films</span></Link>)}</div>
  {categories.length===0&&<p className="source-disclaimer">Featured film categories will appear here when published by the admin.</p>}
  <section className="source-recent-works" id="recent-works"><div className="eyebrow">Client activity & latest updates</div><h2 className="serif">Recent <em>Works</em></h2><p>Recent projects, client activities and updates from Dream House Cinemas.</p>
   {recent.length>0?<div className="source-work-grid">{recent.map(p=><Link key={p.id} href={"/recent-works/"+p.slug} className="source-work-card">{p.coverImage&&<Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw"/>}<div className="source-work-overlay"><span>{p.title}</span></div><i aria-hidden="true"/></Link>)}</div>:<p className="source-disclaimer">Client updates will appear here when added by the admin.</p>}
  </section>
 </section><Footer/></main>;
}
export function BookPage(){
 const [kind,setKind]=useState("production");
 const [groups,setGroups]=useState<{id:string;title:string;items:{id:string;name:string;price:number}[]}[]>([]);
 const [selectedIds,setSelectedIds]=useState<string[]>([]);
 const [singleItem,setSingleItem]=useState(false);
 const [form,setForm]=useState({name:"",phone:"",email:"",projectType:"",location:"",shootDate:"",budget:"",message:""});
 const [busy,setBusy]=useState(false);const [notice,setNotice]=useState("");
 useEffect(()=>{const params=new URLSearchParams(window.location.search);const requestedType=params.get("type");if(requestedType==="rental")setKind("rental");const itemName=params.get("item");const equipmentId=params.get("equipmentId");const hasRequestedItem=Boolean(equipmentId||itemName);setSingleItem(hasRequestedItem);fetch("/api/public/equipment",{cache:"no-store"}).then(r=>r.ok?r.json():Promise.reject(new Error("Equipment list could not be loaded"))).then(data=>{const cats=data?.categories||[];if(cats.length){const nextGroups=cats.map((g:{id:string;name:string;items:{id:string;name:string;price:number}[]})=>({id:g.id,title:g.name,items:g.items}));setGroups(nextGroups);const allItems=nextGroups.flatMap((g:{items:{id:string;name:string}[]})=>g.items);const match=(equipmentId?allItems.find((x:{id:string})=>x.id===equipmentId):undefined)||(itemName?allItems.find((x:{name:string})=>x.name.toLowerCase()===itemName.toLowerCase()):undefined);if(match)setSelectedIds([match.id]);else if(hasRequestedItem)setNotice("This equipment item is currently unavailable. Please select another item or contact our team.");}else if(hasRequestedItem)setNotice("Equipment is currently unavailable. Please contact our team.");}).catch(()=>{if(itemName){const fallback=equipmentGroups.flatMap(g=>g.items).find(x=>x.name.toLowerCase()===itemName.toLowerCase());if(fallback)setSelectedIds([fallback.name]);else setNotice("We could not load this equipment item. Please select it from the list.");}else if(equipmentId)setNotice("We could not load this equipment item. Please select it from the list.");});},[]);
 const selected=groups.flatMap(g=>g.items).filter(item=>selectedIds.includes(item.id));
 const estimate=selected.reduce((sum,item)=>sum+item.price,0);
 function update(key:keyof typeof form,value:string){setForm(old=>({...old,[key]:value}));}
 async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);setNotice("");try{const response=await fetch("/api/public/enquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.name,email:form.email,phone:form.phone,subject:kind==="rental"?"Equipment rental enquiry":"Production enquiry",message:[form.projectType&&"Project type: "+form.projectType,form.location&&"Shoot location: "+form.location,form.shootDate&&"Shoot date: "+form.shootDate,form.budget&&"Budget: "+form.budget,form.message].filter(Boolean).join("\n"),equipmentIds:kind==="rental"?selectedIds:[]})});const result=await response.json();if(!response.ok)throw new Error(result.error||"Unable to submit enquiry");setNotice(result.emailConfigured?"Thank you. Your enquiry has been submitted and emailed to our team.":"Thank you. Your enquiry has been saved. Email notifications will activate once the email service is configured.");setForm({name:"",phone:"",email:"",projectType:"",location:"",shootDate:"",budget:"",message:""});if(!singleItem)setSelectedIds([]);}catch(error){setNotice(error instanceof Error?error.message:"Unable to submit enquiry.");}finally{setBusy(false);}}
 const toggle=(id:string)=>setSelectedIds(ids=>ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]);
 return <main className="site-shell dhc-site"><Header/><section className="source-form-wrap"><div className="eyebrow">— Let’s Create Together —</div><h1 className="serif">Tell us about <em>your project</em></h1><p>We’re here to bring your vision to life.</p><div className="source-tabs" role="group" aria-label="Enquiry type"><button type="button" aria-pressed={kind==="production"} className={kind==="production"?"active":""} onClick={()=>setKind("production")}>Production Enquiry</button><button type="button" aria-pressed={kind==="rental"} className={kind==="rental"?"active":""} onClick={()=>setKind("rental")}>Equipment Rental Request</button></div>
 <form onSubmit={submit} className="source-form"><input name="name" placeholder="Your Name *" aria-label="Your name" autoComplete="name" required value={form.name} onChange={e=>update("name",e.target.value)}/><input name="phone" type="tel" placeholder="Phone / WhatsApp *" aria-label="Phone or WhatsApp number" autoComplete="tel" required value={form.phone} onChange={e=>update("phone",e.target.value)}/><input name="email" type="email" placeholder="Email Address *" aria-label="Email address" autoComplete="email" required value={form.email} onChange={e=>update("email",e.target.value)}/><input name="projectType" placeholder="Project Type *" aria-label="Project type" required value={form.projectType} onChange={e=>update("projectType",e.target.value)}/><input name="location" placeholder="Shoot Location *" aria-label="Shoot location" required value={form.location} onChange={e=>update("location",e.target.value)}/><input name="shootDate" type="date" aria-label="Expected Shoot Date" value={form.shootDate} onChange={e=>update("shootDate",e.target.value)}/><input name="budget" placeholder="Budget Range (Optional)" aria-label="Budget range (optional)" value={form.budget} onChange={e=>update("budget",e.target.value)}/>
 {kind==="rental"&&<div className="dhc-booking-picker"><h2>{singleItem?"Selected equipment":"Select equipment"}</h2><p>{singleItem?"This item has been preselected for your enquiry.":"Select the items you want to enquire about. Final availability and quotation will be confirmed by our team."}</p>{selected.map(item=><div key={item.id} className="dhc-booking-estimate"><span>{item.name}</span><strong>{money(item.price)}</strong></div>)}{!singleItem&&groups.map(group=><fieldset key={group.id}><legend>{group.title}</legend>{group.items.map(item=><label key={item.id}><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={()=>toggle(item.id)}/><span>{item.name}</span><strong>{money(item.price)}</strong></label>)}</fieldset>)}<div className="dhc-booking-estimate"><span>{selectedIds.length} item(s) selected · indicative total</span><strong>{money(estimate)}</strong></div></div>}
 <textarea name="message" placeholder="Tell us about your project * (Brief about your project, script, requirements, number of shoot days, etc.)" aria-label="Project brief" required value={form.message} onChange={e=>update("message",e.target.value)}/>{notice&&<p role="status" aria-live="polite">{notice}</p>}<button className="button-gold" type="submit" disabled={busy}>{busy?"Submitting…":"Submit Enquiry"}</button><small>Listed prices are indicative; availability, rental duration and final quotation will be confirmed by Dream House Cinemas.</small></form></section><Footer/></main>;
}
export function ContactPage(){
 return <main className="site-shell dhc-site"><Header/><section className="source-contact wrap"><div className="source-contact-visual"><FilmVideo src={V.setup} poster={P.crew}/><span/></div><div className="eyebrow">— Get In Touch —</div><h1 className="serif">Let’s create something <em>amazing together</em></h1><p className="source-contact-intro">Have a project in mind or need equipment for your next shoot? We’re here to help.</p><div className="source-contact-grid"><form className="source-form" action="mailto:hello@dreamhousecinemas.com" method="post" encType="text/plain"><h2>SEND US A MESSAGE</h2><input name="Name" placeholder="Your Name *" aria-label="Your name" required/><input name="Phone" type="tel" placeholder="Phone / WhatsApp *" aria-label="Phone or WhatsApp number" required/><input name="Email" type="email" placeholder="Email Address *" aria-label="Email address" required/><input name="Enquiry Type" placeholder="Enquiry Type *" aria-label="Enquiry type" required/><input name="Project Type" placeholder="Project Type *" aria-label="Project type" required/><textarea name="Message" placeholder="Tell us about your project * (Brief about your project, requirements, shoot days, etc.)" aria-label="Message" required/><button className="button-gold" type="submit">Submit Enquiry</button><small>🔒 We respect your privacy. Your information is safe with us.</small></form><div className="source-contact-info"><h2>CONTACT INFORMATION</h2><article><b>DREAM HOUSE CINEMAS</b><p>Kerala, India<br/>Serving Across South India</p></article><article><b>CALL / WHATSAPP</b><p>+91 999 555 1234<br/>+91 987 654 3210</p></article><article><b>EMAIL</b><p>hello@dreamhousecinemas.com<br/>info@dreamhousecinemas.com</p></article><article><b>WORKING HOURS</b><p>Mon – Sat : 9:00 AM – 7:00 PM<br/>Sunday : By Appointment</p></article><Image src={P.crew} alt="Film production crew working on set" width={1200} height={750} loading="lazy"/></div></div></section><Footer/></main>;
}

export function AboutPage(){
 return <main className="site-shell dhc-site"><Header/>
  <section className="dhc-about-hero"><FilmVideo src={V.crew} poster={P.crew}/><div className="dhc-about-shade"/><div className="wrap"><span className="eyebrow">About Us —</span><h1 className="serif">Who we <em>are.</em></h1><p>Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p></div></section>
  <section className="dhc-about-story wrap"><div><span className="eyebrow">About Dream House Cinemas</span><h2 className="serif">Your story is<br/><em>our passion.</em></h2></div><div><p className="large">Dream House Cinemas is a Kerala based film production and equipment rental company dedicated to turning ideas into powerful visual stories.</p><p>With a passion for storytelling and a commitment to excellence, we create content that connects, inspires and leaves a lasting impact.</p><p>From concept development to final delivery, we handle every aspect of production with creativity, precision and professionalism. Our state-of-the-art equipment and skilled team ensure world-class quality for films, commercials, documentaries, corporate videos, and digital content.</p><p>We believe in building strong relationships with our clients by understanding their vision and delivering beyond expectations. Whether it’s a small shoot or a large-scale production, we bring the same level of dedication and quality to every project.</p><p><strong>At Dream House Cinemas, your story is our passion.</strong></p><Enquiry label="Work with Dream House Cinemas"/></div></section>
  <section className="source-about-stats wrap"><article><b>500+</b><span>Happy Clients</span></article><article><b>1200+</b><span>Projects Completed</span></article><article><b>2500+</b><span>Equipment Rentals</span></article><article><b>KERALA & SOUTH INDIA</b><span>Serving Across</span></article></section>
  <section className="dhc-about-image"><Image src={SOURCE_ASSET+"about-camera.jpg"} alt="Cinema camera and director's chair on set" width={1800} height={1100} loading="lazy"/><div><span className="eyebrow">The craft is in the details</span><p className="serif">At Dream House<br/><em>Cinemas.</em></p></div></section>
  <section className="dhc-about-cta"><div className="wrap"><span className="eyebrow">Production or equipment rental</span><h2 className="serif">Let’s get your<br/><em>next shoot ready.</em></h2><Enquiry label="Contact Dream House Cinemas"/></div></section><Footer/></main>;
}
