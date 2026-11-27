import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
const schema=z.object({name:z.string().trim().min(2).max(80),sortOrder:z.number().int().optional(),active:z.boolean().optional()});
const slugify=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export async function GET(){const denied=await requireAdmin();if(denied)return denied;return NextResponse.json({categories:await db.workCategory.findMany({orderBy:{sortOrder:"asc"}})});}
export async function POST(req:NextRequest){const denied=await requireAdmin();if(denied)return denied;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid category"}, {status:400});const slug=slugify(p.data.name);const category=await db.workCategory.create({data:{...p.data,slug}});return NextResponse.json({category},{status:201});}
