import {NextResponse} from "next/server";
import {db} from "@/lib/db";
export const dynamic="force-dynamic";
export async function GET(_req:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=await db.project.findFirst({where:{slug,published:true},include:{category:true}});if(!project)return NextResponse.json({error:"Project not found"},{status:404});return NextResponse.json({project});}
