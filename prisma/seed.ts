import { PrismaClient } from "@prisma/client";
import { equipmentGroups } from "../lib/equipment";
const db = new PrismaClient();
const workCategories = ["Ad Films", "Documentaries", "Corporate Films", "Brand Films", "Promotional Videos"];
async function main() {
 for (let i=0;i<workCategories.length;i++) {
  const name=workCategories[i], slug=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  await db.workCategory.upsert({where:{slug},update:{name,sortOrder:i,active:true},create:{name,slug,sortOrder:i}});
 }
 for (let i=0;i<equipmentGroups.length;i++) {
  const group=equipmentGroups[i], slug=group.title.toLowerCase().replace(/[^a-z0-9]+/g,"-");
  const category=await db.equipmentCategory.upsert({where:{slug},update:{name:group.title,sortOrder:i,active:true},create:{name:group.title,slug,sortOrder:i}});
  for(let j=0;j<group.items.length;j++){
   const item=group.items[j];
   const existing=await db.equipmentItem.findFirst({where:{categoryId:category.id,name:item.name}});
   if(existing) await db.equipmentItem.update({where:{id:existing.id},data:{price:item.price,sortOrder:j,active:true}});
   else await db.equipmentItem.create({data:{categoryId:category.id,name:item.name,price:item.price,sortOrder:j}});
  }
 }
}
main().finally(async()=>{await db.$disconnect();});
