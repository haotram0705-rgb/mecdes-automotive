export const access='public';
export const methods=['POST'];
export default async function(req,res){
  const prompt=String(req.body?.prompt||'').trim().toLowerCase();
  if(!prompt)return res.status(400).json({error:'prompt required'});
  let answer='MECDEX gợi ý C-Class cho nhu cầu cân bằng giữa đô thị, tiện nghi và hiệu năng.';
  if(prompt.includes('suv')) answer='MECDEX gợi ý GLC cho nhu cầu SUV sang trọng, sử dụng hằng ngày và cân bằng tiện nghi.';
  else if(prompt.includes('điện')||prompt.includes('electric')) answer='MECDEX gợi ý Taycan cho nhu cầu xe điện thiên về hiệu năng và trải nghiệm công nghệ.';
  else if(prompt.includes('thể thao')||prompt.includes('performance')||prompt.includes('tăng tốc')) answer='MECDEX gợi ý 911 Spirit 70 cho nhu cầu ưu tiên cảm giác lái và hiệu năng thể thao.';
  return res.json({answer,source:'showroom-preview'});
}