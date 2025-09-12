"use client";
import React, { useState } from "react";
import { Filter } from "lucide-react";
import { useLocation } from "react-router-dom";

const cloudName = "db7djmruw";

// Utility function to generate Cloudinary image URLs
const getCloudinaryUrl = (product) => {
  if (!product || !product.Image || !product.Category) return null;
  const safeImageName = encodeURIComponent(product.Image);
  // Construct the public ID based on your Cloudinary upload structure
  const publicId = `StockWise/${product.Category}/${product.Image}`.replace(/\\/g, "/");
  return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
};

const ProductCard = ({ product }) => {
  const imageUrl = getCloudinaryUrl(product);

  const handleImageError = (e) => {
    // console.error("Failed to load image:", imageUrl);
    if (!e.target.dataset.errorLogged) {
    console.error("❌ Image failed to load!");
    console.error("   Product Name:", product?.Name || "Unknown");
    console.error("   Expected Path:", imageUrl);
    console.error("   Category:", product?.Category);
    console.error("   Image filename:", product?.Image);

    // Mark this image as already logged
    e.target.dataset.errorLogged = "true";
  }

    e.target.src = "/defaultImage.jpeg"; // fallback image
    e.target.onerror = null;
  };

  if (!imageUrl) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full max-w-sm mx-auto">
      <div className="px-4 pb-4">
        <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={product.Name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="px-4 pb-4 text-center">
        <h3 className="font-semibold text-gray-900 text-base mb-1">{product.Name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.Type}</p>
        <p className="font-bold text-gray-900 text-lg mb-4">Rs. {product.Price}</p>

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Check Out
        </button>
      </div>
    </div>
  );
};

const Page = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const location = useLocation();
  const suggestions = location.state?.suggestions || [];

  return (
    <div className="px-16 min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h6 className="text-4xl sm:text-xl lg:text-4xl font-black tracking-[0.1em] text-gray-900 text-center sm:text-left">
            Products
          </h6>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span className="font-medium text-gray-700">Filter</span>
            <Filter size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
          {suggestions.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 px-8 py-3 rounded-xl font-medium text-gray-700 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Load More Products
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filter Products</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Categories</option>
                  <option>Unisex Fit</option>
                  <option>Women Fit</option>
                  <option>Men Fit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Prices</option>
                  <option>Under $50</option>
                  <option>$50 - $100</option>
                  <option>Over $100</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;



// "use client";
// import React, { useState } from 'react';
// import { Filter } from 'lucide-react';
// import { useLocation } from "react-router-dom";
// // import img from '../../public/Images/Women'

// const ProductCard = ({ product }) => {
//   console.log('product:............. ', product);
//   if (!product || !product.Image || !product.Category) {
//     return null;
//   }
//   const imageUrl = `/Images/${product.Category}/${product["Image"].replace(/\\/g, '/')}`;

//   const handleImageError = (e) => {
//     console.error("Failed to load image:", imageUrl);
//     // You could also set a fallback image here if you have one
//     e.target.src = "/defaultImage.jpeg"; 
//   };
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full max-w-sm mx-auto">
//       <div className="px-4 pb-4">
//         <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden">
//           <img
//             src={`/Images/${product.Category}/${product["Image"].replace(/\\/g, '/')}`}
//             alt={product.Name}
//             onError={handleImageError}
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//           />
//         </div>
//       </div>

//       <div className="px-4 pb-4 text-center">
//         <h3 className="font-semibold text-gray-900 text-base mb-1">{product.Name}</h3>
//         <p className="text-sm text-gray-500 mb-2">
//            {product.Type}
//         </p>
//         <p className="font-bold text-gray-900 text-lg mb-4">Rs. {product.Price}</p>

//         <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//           Check Out
//         </button>
//       </div>
//     </div>
//   );
// };

// const Page = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const location = useLocation();
//   const suggestions = location.state?.suggestions || [];
//   return (
//     <div className="px-16 min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
//           <h6 className="text-4xl sm:text-xl lg:text-4xl font-black tracking-[0.1em] text-gray-900 text-center sm:text-left">
//             Products
//           </h6>
//           <button 
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl flex items-center gap-3 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             <span className="font-medium text-gray-700">Filter</span>
//             <Filter size={20} className="text-gray-600" />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
//           {suggestions.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         <div className="flex justify-center mt-12">
//           <button className="bg-white hover:bg-gray-50 border border-gray-200 px-8 py-3 rounded-xl font-medium text-gray-700 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//             Load More Products
//           </button>
//         </div>
//       </div>

//       {isFilterOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Filter Products</h3>
//               <button 
//                 onClick={() => setIsFilterOpen(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                   <option>All Categories</option>
//                   <option>Unisex Fit</option>
//                   <option>Women Fit</option>
//                   <option>Men Fit</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
//                 <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
//                   <option>All Prices</option>
//                   <option>Under $50</option>
//                   <option>$50 - $100</option>
//                   <option>Over $100</option>
//                 </select>
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button 
//                   onClick={() => setIsFilterOpen(false)}
//                   className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   onClick={() => setIsFilterOpen(false)}
//                   className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;
