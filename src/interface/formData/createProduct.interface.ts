export interface IVariant {
  storage: string; // Storage capacity of the variant, e.g., "128GB"
  ram: string; // RAM capacity of the variant, e.g., "8GB"
  color: string[]; // Available colors for the variant
  price: number; // Price of the variant
  stockQuantity: number; // Quantity in stock for this variant
}

export interface IProductForm {
  brand: string; // Brand name of the product
  model: string; // Model name of the product
  variants: IVariant[]; // Array of product variants
  features: {
    screenSize: string; // Screen size of the product, e.g., "6.1 inches"
    battery: string; // Battery capacity, e.g., "3900mAh"
    camera: string; // Camera specifications, e.g., "50MP"
    processor: string; // Processor type, e.g., "Snapdragon 8 Gen 2"
    os: string; // Operating system, e.g., "Android 13"
  };
  releaseDate: string; // Release date of the product in ISO format
  isAvailable: boolean; // Availability status of the product
}
