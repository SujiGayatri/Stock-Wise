import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "db7djmruw",
  api_key: "586265227389988",
  api_secret: "Z1akS7ApwM7I66EpYTiFYIWsr2o"
});

const uploadFolder = async (localFolder, cloudFolder) => {
  const files = fs.readdirSync(localFolder);
  for (const file of files) {
    const fullPath = path.join(localFolder, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await uploadFolder(fullPath, `${cloudFolder}/${file}`);
    } else {
      await cloudinary.uploader.upload(fullPath, {
        folder: cloudFolder,
        use_filename: true,
        unique_filename: false
      });
      console.log(`Uploaded ${fullPath} → ${cloudFolder}/${file}`);
    }
  }
};

// Run the upload for the Women folder
uploadFolder("./src/assets/Images/Women", "StockWise/women");


// import fs from "fs";
// import path from "path";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "db7djmruw",
//   api_key: "586265227389988",
//   api_secret: "Z1akS7ApwM7I66EpYTiFYIWsr2o"
// });

// const uploadFolder = async (localFolder, cloudFolder) => {
//   const files = fs.readdirSync(localFolder);
//   for (const file of files) {
//     const fullPath = path.join(localFolder, file);
//     if (fs.statSync(fullPath).isDirectory()) {
//       // Recursively upload subfolders
//       await uploadFolder(fullPath, `${cloudFolder}/${file}`);
//     } else {
//       try {
//         // Upload file
//         const result = await cloudinary.uploader.upload(fullPath, {
//           folder: cloudFolder,
//           use_filename: true,
//           unique_filename: false,
//           overwrite: false  // will not overwrite existing files
//         });
//         console.log(`Uploaded ${fullPath} → ${cloudFolder}/${file}`);
//       } catch (err) {
//         console.error(`Failed to upload ${fullPath}:`, err.message);
//       }
//     }
//   }
// };

// // Example: upload just the "Tshirts" folder
// // uploadFolder("./src/assets/Images/Women/T-Shirts", "StockWise/women/T-Shirts")
// //   .then(() => console.log("Tshirts upload done!"))
// //   .catch((err) => console.error("Unexpected error:", err.message));

// // Example: upload just the "WesternTops" folder
// uploadFolder("./src/assets/Images/Women/WesternTops", "StockWise/women/WesternTops")
//   .then(() => console.log("WesternTops upload done!"))
//   .catch((err) => console.error("Unexpected error:", err.message));

