import { redirect } from "next/navigation";
import { isAdminRequest } from "@/lib/admin-auth";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
 if (!(await isAdminRequest())) redirect("/admin/login");
 const [categories, equipment, enquiries, projects] = await Promise.all([
  db.workCategory.count(), db.equipmentItem.count(), db.enquiry.count(), db.project.count()
 ]);
 return <main className="site-shell dhc-site" style={{minHeight:"100vh",padding:"48px 5vw",color:"#f4f0e9"}}><p className="eyebrow">Dream House Cinemas · CMS</p><h1 className="serif" style={{fontSize:44}}>Admin <em>Dashboard</em></h1><p style={{color:"#aaa"}}>Content management workspace</p><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:16,marginTop:36}}>{[["Work categories",categories],["Projects",projects],["Equipment items",equipment],["Enquiries",enquiries]].map(([label,value])=><section key={String(label)} style={{padding:24,border:"1px solid #4a4134",background:"#101010"}}><p className="eyebrow">{label}</p><strong style={{fontSize:34}}>{value}</strong></section>)}</div><section style={{marginTop:32,padding:24,border:"1px solid #4a4134"}}><h2 className="serif" style={{fontSize:28}}>Manage website content</h2><p style={{color:"#aaa",lineHeight:1.8}}>Create and update work categories, projects, Recent Works, equipment and customer enquiries.</p><a className="button-gold" href="/admin/manage" style={{display:"inline-flex",margin:"12px 0 24px"}}>Open CMS manager</a><h2 className="serif" style={{fontSize:28}}>CMS setup</h2><p style={{color:"#aaa",lineHeight:1.8}}>Dashboard foundation is connected. Category, project, equipment and enquiry management screens will be added to this workspace. Configure the production environment variables before enabling public submissions.</p><form action="/api/admin/logout" method="post"><button className="button-line" style={{marginTop:12}}>Sign out</button></form></section></main>;
}
