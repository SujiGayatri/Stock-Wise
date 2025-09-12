// src/Utils/BasicColors.js

export const baseColorMap = {
  red: [255, 0, 0],
  green: [0, 128, 0],
  blue: [0, 0, 255],
  yellow: [255, 255, 0],
  orange: [255, 165, 0],
  pink: [255, 192, 203],
  purple: [128, 0, 128],
  brown: [139, 69, 19],
  black: [0, 0, 0],
  white: [255, 255, 255],
  grey: [128, 128, 128],
  maroon: [128, 0, 0],
  navy: [0, 0, 128],
  teal: [0, 128, 128],
  gold: [255, 215, 0],
};

export const colorCategoryMap = {
  white: ['Red', 'Blue', 'Pink', 'Green', 'Black', 'Yellow', 'Purple'],
  black: ['White', 'Red', 'Beige', 'Pink', 'Grey', 'Gold', 'Teal'],
  red: ['White', 'Black', 'Beige', 'Denim Blue', 'Navy Blue'],
  blue: ['White', 'Yellow', 'Grey', 'Pink', 'Peach'],
  pink: ['White', 'Black', 'Denim Blue', 'Grey', 'Navy'],
  green: ['White', 'Beige', 'Black', 'Yellow', 'Brown'],
  yellow: ['White', 'Denim Blue', 'Black', 'Brown', 'Grey'],
  grey: ['White', 'Black', 'Blue', 'Pink', 'Maroon'],
  brown: ['Beige', 'White', 'Rust', 'Green', 'Yellow'],
  purple: ['White', 'Pink', 'Grey', 'Black', 'Cream'],
  orange: ['White', 'Blue', 'Black', 'Beige', 'Olive'],
  teal: ['White', 'Beige', 'Pink', 'Navy'],
  Navy:['White','Beige','Baby Pink'],
  Maroon:['White','Cream','Beige','Grey']
};

export const getClosestColorName = (rgb) => {
  let minDistance = Infinity;
  let closestColor = 'unknown';

  for (const [name, [r2, g2, b2]] of Object.entries(baseColorMap)) {
    const distance = Math.sqrt(
      Math.pow(rgb[0] - r2, 2) +
      Math.pow(rgb[1] - g2, 2) +
      Math.pow(rgb[2] - b2, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = name;
    }
  }

  return closestColor;
};

export const getRelatedColors = (rgb) => {
  const baseColor = getClosestColorName(rgb); 
  return colorCategoryMap[baseColor] || [baseColor];
};
