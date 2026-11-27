import {notFound} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {db} from "@/lib/db";
export const dynamic="force-dynamic";
export default async function WorkCategoryPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const category=await db.workCategory.findFirst({where:{slug,active:true},include:{projects:{where:{published:true},orderBy:{sortOrder:"asc"}}}});
 if(!category)notFound();
 return <main className="site-shell dhc-site" style={{minHeight:"100vh",color:"#f4f0e9"}}><header style={{padding:"28px 5vw",borderBottom:"1px solid #4a4134"}}><Link href="/works" className="button-line">Back to Our Work</Link></header><section className="wrap source-works"><div className="source-works-intro"><div className="eyebrow">Our Work / {category.name}</div><h1 className="serif">{category.name} <em>Films</em></h1><p>Explore the films and productions in this category.</p></div><div className="source-work-grid">{category.projects.map(p=><Link key={p.id} href={"/works/"+p.slug} className="source-work-card">{p.coverImage&&<Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 640px) 100vw, 33vw"/>}<div className="source-work-overlay"><span>{p.title}</span></div><i aria-hidden="true"/></Link>)}</div>{category.projects.length===0&&<p className="source-disclaimer">No films have been published in this category yet.</p>}</section></main>;
}