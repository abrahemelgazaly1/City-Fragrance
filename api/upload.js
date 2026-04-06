const cloudinary = require('cloudinary').v2;
const multiparty = require('multiparty');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const form = new multiparty.Form();
    
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form' });
      }
      
      try {
        const uploadPromises = files.images.map(file => {
          return cloudinary.uploader.upload(file.path, {
            folder: 'legcy-sneakers'
          });
        });
        
        const results = await Promise.all(uploadPromises);
        const urls = results.map(result => result.secure_url);
        
        return res.json({ urls });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    });
  } else if (req.method === 'DELETE') {
    try {
      const { url } = req.body;
      const publicId = url.split('/').slice(-2).join('/').split('.')[0];
      await cloudinary.uploader.destroy(publicId);
      return res.json({ success: true });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
};
