export const uploadImage = async (req, res) => {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }
  
    const imageUrl = req.file.path;
    res.status(200).json({ imageUrl });
  };
  