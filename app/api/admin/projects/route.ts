import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {requireAdmin} from "@/lib/admin-auth";
import {db} from "@/lib/db";
const schema=z.object({title:z.string().trim().min(2).max(140),description:z.string().max(5000).optional(),categoryId:z.string().min(1),coverImage:z.string().url().optional().or(z.literal("")),mediaUrl:z.string().url(),featured:z.boolean().optional(),recent:z.boolean().optional(),published:z.boolean().optional(),sortOrder:z.number().int().optional()});
const slugify=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export async function GET(){const denied=await requireAdmin();if(denied)return denied;return NextResponse.json({projects:await db.project.findMany({include:{category:true},orderBy:{updatedAt:"desc"}})});}
export async function POST(req:NextRequest){const denied=await requireAdmin();if(denied)return denied;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid project details"},{status:400});const base=slugify(p.data.title);let slug=base,n=1;while(await db.project.findUnique({where:{slug}})){slug=base+"-"+(++n);}const project=await db.project.create({data:{...p.data,slug}});return NextResponse.json({project},{status:201});}
