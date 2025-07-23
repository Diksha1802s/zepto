const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
module.exports = {
fileUpload: async (file, folder = "uploads") => {
    try {
      if (!file || file.name === "") return null;
 
      // Get file extension
      let fileExtension = file.name.split(".").pop();
 
      // Generate unique file name using uuid
      const name = uuid() + "." + fileExtension;
 
      // Create the correct path by referencing 'public/images' folder
      const filePath = path.join(__dirname, "..", "public", folder, name);
 
      // Move the file to the desired folder
      file.mv(filePath, (err) => {
        if (err) throw err;
      });
 
      // Return the file path relative to the public folder (this will be accessible via URL)
      return `/images/${name}`;
    } catch (error) {
      console.error("Error during file upload:", error);
      return null;
    }
  },
};
