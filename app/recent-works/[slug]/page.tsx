import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
function youtubeEmbed(url: string) {
  try { const u = new URL(url); let id = ""; if (u.hostname.includes("youtu.be")) id = u.pathname.slice(1); else if (u.hostname.includes("youtube.com")) id = u.searchParams.get("v") || u.pathname.split("/").filter(Boolean).pop() || ""; return id ? "https://www.youtube-nocookie.com/embed/" + id + "?rel=0" : null; } catch { return null; }
}
export default async function RecentWorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = await db.recentWork.findFirst({ where: { slug, published: true } }); if (!item) notFound();
  const media = item.mediaUrl || ""; const embed = media ? youtubeEmbed(media) : null; const direct = /\.(mp4|webm|ogg)(\?.*)?$/i.test(media);
  return <main className="site-shell dhc-site" style={{ minHeight: "100vh", color: "#f4f0e9" }}><header style={{ padding: "28px 5vw", borderBottom: "1px solid #4a4134" }}><Link href="/works#recent-works" className="button-line">Back to Recent Works</Link></header><article className="wrap" style={{ paddingTop: 64, paddingBottom: 80, maxWidth: 1100 }}><p className="eyebrow">Client updates · Recent Work</p><h1 className="serif" style={{ fontSize: "clamp(38px,7vw,76px)" }}>{item.title}</h1>{media && (embed ? <div style={{ position: "relative", aspectRatio: "16/9", margin: "36px 0", background: "#080808" }}><iframe src={embed} title={item.title + " video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} /></div> : direct ? <video controls playsInline preload="metadata" poster={item.coverImage || undefined} style={{ display: "block", width: "100%", maxHeight: 680, aspectRatio: "16/9", objectFit: "contain", background: "#080808", margin: "36px 0" }}><source src={media} /></video> : <p style={{ margin: "30px 0" }}><a className="button-gold" href={media} target="_blank" rel="noreferrer">Watch video</a></p>)}{!media && item.coverImage && <div style={{ position: "relative", aspectRatio: "16/9", margin: "36px 0" }}><Image src={item.coverImage} alt={item.title} fill sizes="100vw" style={{ objectFit: "cover" }} priority /></div>}<p style={{ fontSize: 18, lineHeight: 1.9, maxWidth: 800, color: "#c8c1b7", whiteSpace: "pre-wrap" }}>{item.description}</p></article></main>;
}
