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
  try{ await connectDB(); } catch(e){ return res.status(500).json({error:'DB Error'}); }
  await Admin.deleteMany({});
  const admins = [
    { name: "Avrajit Das", email: "dasavrajit2@gmail.com", password: "#avrajitdas@9830873322" },
    { name: "Avijit Das", email: "dasavijit1961@gmail.com", password: "#avijitdas@9432735009" }
  ];
  for(let a of admins){
    const hashed = await bcrypt.hash(a.password, 10);
    await new Admin({ name: a.name, email: a.email, password: hashed }).save();
  }
  return res.status(200).json({ success:true, message:'2 Admins created successfully', count: 2 });
}