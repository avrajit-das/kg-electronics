import mongoose from 'mongoose';
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function connectDB(){
  if(cached.conn) return cached.conn;
  if(!cached.promise) cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}
const ReviewSchema = new mongoose.Schema({ name: String, device: String, rating: Number, text: String, date: { type: Date, default: Date.now } });
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  try{ await connectDB(); } catch(e){ return res.status(500).json({error:'DB Connect Failed', details: e.message}); }
  if(req.method === 'GET'){
    const reviews = await Review.find().sort({date: -1});
    return res.status(200).json(reviews);
  }
  if(req.method === 'POST'){
    const {name, device, rating, text} = req.body;
    if(!name || !text || !rating) return res.status(400).json({error:'Missing fields'});
    const r = new Review({name, device, rating, text});
    await r.save();
    return res.status(200).json({success:true, review:r});
  }
  return res.status(405).json({error:'Method not allowed'});
}