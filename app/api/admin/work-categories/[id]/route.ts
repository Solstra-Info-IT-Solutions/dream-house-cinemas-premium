import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {requireAdmin} from "@/lib/admin-auth";
import {db} from "@/lib/db";
const schema=z.object({name:z.string().trim().min(2).max(80).optional(),sortOrder:z.number().int().optional(),active:z.boolean().optional()});
const slugify=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid category"},{status:400});const data={...p.data,...(p.data.name?{slug:slugify(p.data.name)+"-"+id.slice(-5)}:{})};try{return NextResponse.json({category:await db.workCategory.update({where:{id},data})});}catch{return NextResponse.json({error:"Category not found or slug already exists"},{status:404});}}
export async function DELETE(_req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;try{return NextResponse.json({category:await db.workCategory.update({where:{id},data:{active:false}})});}catch{return NextResponse.json({error:"Category not found"},{status:404});}}
