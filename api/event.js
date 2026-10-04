import { db } from 'hatchable';
export const access='public';
export const methods=['POST'];
export default async function(req,res){const b=req.body||{};if(!b.event_type)return res.status(400).json({error:'event_type required'});await db.query('INSERT INTO experience_events (event_type,payload) VALUES ($1,$2::jsonb)',[String(b.event_type).slice(0,80),JSON.stringify(b.payload||{})]);res.json({ok:true})}