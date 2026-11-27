import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {db} from "@/lib/db";
export const dynamic="force-dynamic";
function youtubeEmbed(url:string){
 try{const u=new URL(url);let id="";if(u.hostname.includes("youtu.be"))id=u.pathname.slice(1);else if(u.hostname.includes("youtube.com"))id=u.searchParams.get("v")||u.pathname.split("/").filter(Boolean).pop()||"";return id? "https://www.youtube-nocookie.com/embed/"+id+"?rel=0":null;}catch{return null;}
}
export default async function WorkDetailPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=await db.project.findFirst({where:{slug,published:true},include:{category:true}});
 if(!project)notFound();
 const media=project.mediaUrl||"";const embed=media?youtubeEmbed(media):null;const directVideo=/\.(mp4|webm|ogg)(\?.*)?$/i.test(media);
 return <main className="site-shell dhc-site" style={{minHeight:"100vh",color:"#f4f0e9"}}><header style={{padding:"28px 5vw",borderBottom:"1px solid #4a4134"}}><Link href={"/works/category/"+project.category.slug} className="button-line">Back to {project.category.name}</Link></header><article className="wrap" style={{paddingTop:64,paddingBottom:80,maxWidth:1100}}><p className="eyebrow">{project.category.name}</p><h1 className="serif" style={{fontSize:"clamp(38px,7vw,76px)"}}>{project.title}</h1>{media&&(embed?<div style={{position:"relative",aspectRatio:"16/9",margin:"36px 0",background:"#080808"}}><iframe src={embed} title={project.title+" video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{position:"absolute",inset:0,width:"100%",height:"100%",border:0}}/></div>:directVideo?<video controls playsInline preload="metadata" poster={project.coverImage||undefined} style={{display:"block",width:"100%",maxHeight:680,aspectRatio:"16/9",objectFit:"contain",background:"#080808",margin:"36px 0"}}><source src={media}/></video>:<p style={{margin:"30px 0"}}><a className="button-gold" href={media} target="_blank" rel="noreferrer">Watch project video</a></p>)}{!media&&project.coverImage&&<div style={{position:"relative",aspectRatio:"16/9",margin:"36px 0"}}><Image src={project.coverImage} alt={project.title} fill sizes="100vw" style={{objectFit:"cover"}} priority/></div>}<p style={{fontSize:18,lineHeight:1.9,maxWidth:800,color:"#c8c1b7",whiteSpace:"pre-wrap"}}>{project.description}</p><p style={{marginTop:48}}><Link href="/book" className="button-line">Discuss a project</Link></p></article></main>;
}
