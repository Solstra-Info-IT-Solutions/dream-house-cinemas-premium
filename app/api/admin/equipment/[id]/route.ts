import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
const schema=z.object({name:z.string().trim().min(2).max(120).optional(),categoryId:z.string().min(1).optional(),price:z.number().int().min(0).optional(),description:z.string().max(1000).optional(),imageUrl:z.string().url().optional().or(z.literal("")),sortOrder:z.number().int().optional(),active:z.boolean().optional()});
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid equipment details"},{status:400});try{return NextResponse.json({item:await db.equipmentItem.update({where:{id},data:p.data})});}catch{return NextResponse.json({error:"Equipment item not found"},{status:404});}}
export async function DELETE(_req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;try{return NextResponse.json({item:await db.equipmentItem.update({where:{id},data:{active:false}})});}catch{return NextResponse.json({error:"Equipment item not found"},{status:404});}}
