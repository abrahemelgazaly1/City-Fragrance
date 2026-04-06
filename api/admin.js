const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

let Admin;
try {
  Admin = mongoose.model('Admin');
} catch {
  Admin = mongoose.model('Admin', adminSchema);
}

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  cachedDb = connection;
  return connection;
}

module.exports = async (req, res) => {
  await connectToDatabase();
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { action, email, password } = req.body;
    
    try {
      if (action === 'login') {
        const admin = await Admin.findOne({ email, password });
        if (!admin) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.json({ success: true, message: 'Login successful' });
      }
      
      if (action === 'create') {
        const admin = new Admin({ email, password });
        await admin.save();
        return res.status(201).json({ success: true });
      }
      
      return res.status(400).json({ message: 'Invalid action' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
};
