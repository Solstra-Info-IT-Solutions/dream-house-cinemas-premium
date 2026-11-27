import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {requireAdmin} from "@/lib/admin-auth";
import {db} from "@/lib/db";
const schema=z.object({status:z.enum(["NEW","CONTACTED","IN_PROGRESS","CLOSED"] )});
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}){const denied=await requireAdmin();if(denied)return denied;const {id}=await params;const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid enquiry status"},{status:400});try{return NextResponse.json({enquiry:await db.enquiry.update({where:{id},data:{status:p.data.status}})});}catch{return NextResponse.json({error:"Enquiry not found"},{status:404});}}
