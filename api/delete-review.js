import mongoose from 'mongoose';
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function connectDB(){
  if(cached.conn) return cached.conn;
  if(!cached.promise) cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}
const ReviewSchema = new mongoose.Schema({ name:String, device:String, rating:Number, text:String, date:{type:Date, default:Date.now} });
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  if(req.method !== 'DELETE') return res.status(405).json({error:'Only DELETE'});
  try{ await connectDB(); } catch(e){ return res.status(500).json({error:'DB Error'}); }
  const {id} = req.query;
  await Review.findByIdAndDelete(id);
  return res.status(200).json({success:true});
}