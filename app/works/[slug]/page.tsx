import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {db} from "@/lib/db";
import {isAdminRequest} from "@/lib/admin-auth";
export const dynamic="force-dynamic";
export default async function WorkDetailPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=await db.project.findFirst({where:{slug,published:true},include:{category:true}});
 if(!project)notFound();
 return <main className="site-shell dhc-site" style={{minHeight:"100vh",color:"#f4f0e9"}}><header style={{padding:"28px 5vw",borderBottom:"1px solid #4a4134"}}><Link href="/works" className="button-line">← Back to Our Work</Link></header><article className="wrap" style={{paddingTop:64,paddingBottom:80,maxWidth:1100}}><p className="eyebrow">{project.category.name}</p><h1 className="serif" style={{fontSize:"clamp(38px,7vw,76px)"}}>{project.title}</h1>{project.coverImage&&<div style={{position:"relative",aspectRatio:"16/9",margin:"36px 0"}}><Image src={project.coverImage} alt={project.title} fill sizes="100vw" style={{objectFit:"cover"}} priority/></div>}<p style={{fontSize:18,lineHeight:1.9,maxWidth:800,color:"#c8c1b7"}}>{project.description}</p>{project.mediaUrl&&<p style={{marginTop:28}}><a className="button-gold" href={project.mediaUrl} target="_blank" rel="noreferrer">Watch project</a></p>}<p style={{marginTop:48}}><Link href="/book" className="button-line">Discuss a project</Link></p></article></main>;
}
