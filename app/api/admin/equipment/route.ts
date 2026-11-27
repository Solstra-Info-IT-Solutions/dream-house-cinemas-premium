import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
const schema=z.object({name:z.string().trim().min(2).max(120),categoryId:z.string().min(1),price:z.number().int().min(0),description:z.string().max(1000).optional(),imageUrl:z.string().url().optional().or(z.literal("")),sortOrder:z.number().int().optional(),active:z.boolean().optional()});
export async function GET(){const denied=await requireAdmin();if(denied)return denied;return NextResponse.json({items:await db.equipmentItem.findMany({include:{category:true},orderBy:[{category:{sortOrder:"asc"}},{sortOrder:"asc"}]})});}
export async function POST(req:NextRequest){const denied=await requireAdmin();if(denied)return denied;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid equipment details"},{status:400});const item=await db.equipmentItem.create({data:p.data});return NextResponse.json({item},{status:201});}
