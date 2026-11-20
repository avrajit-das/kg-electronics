import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function connectDB(){
  if(cached.conn) return cached.conn;
  if(!cached.promise) cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}
const AdminSchema = new mongoose.Schema({ name:String, email:String, password:String });
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'POST') return res.status(405).json({error:'Only POST'});
  try{ await connectDB(); } catch(e){ return res.status(500).json({error:'DB Error'}); }
  const {name, email, password} = req.body;
  const admin = await Admin.findOne({name, email});
  if(!admin) return res.status(200).json({success:false, message:'Admin not found'});
  const match = await bcrypt.compare(password, admin.password);
  if(!match) return res.status(200).json({success:false, message:'Wrong password'});
  return res.status(200).json({success:true, admin:{name:admin.name, email:admin.email}});
}