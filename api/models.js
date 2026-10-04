import { db } from 'hatchable';
export const access='public';
export const methods=['GET'];
export default async function(req,res){const {rows}=await db.query('SELECT slug,brand,name,category,trim,engine,fuel_type,torque_nm,drivetrain,battery_capacity_kwh,range_km,power_hp,zero_to_100,top_speed_kmh,powertrain,price_vnd,price_label,image_url,description,source_url,specs_checked_at,price_checked_at FROM vehicle_models ORDER BY brand,name');res.json(rows)}