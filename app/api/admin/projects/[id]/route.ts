import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {requireAdmin} from "@/lib/admin-auth";
import {db} from "@/lib/db";
const schema=z.object({title:z.string().trim().min(2).max(140).optional(),description:z.string().max(5000).optional(),categoryId:z.string().min(1).optional(),coverImage:z.string().url().optional().or(z.literal("")),mediaUrl:z.string().url().optional().or(z.literal("")),featured:z.boolean().optional(),recent:z.boolean().optional(),published:z.boolean().optional(),sortOrder:z.number().int().optional()});
const slugify=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid project details"},{status:400});try{return NextResponse.json({project:await db.project.update({where:{id},data:{...p.data,...(p.data.title?{slug:slugify(p.data.title)+"-"+id.slice(-5)}:{})}})});}catch{return NextResponse.json({error:"Project not found"},{status:404});}}
export async function DELETE(_req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;try{return NextResponse.json({project:await db.project.update({where:{id},data:{published:false}})});}catch{return NextResponse.json({error:"Project not found"},{status:404});}}
