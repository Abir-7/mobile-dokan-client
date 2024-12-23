export interface IVariant {
  storage: string;
  ram: string;
  color: string[];
  price: number;
  stockQuantity: number;
  _id: string;
}

export interface IFeatures {
  screenSize: string;
  battery: string;
  camera: string;
  processor: string;
  os: string;
}

interface IRatings {
  average: number;
  count: number;
}

export interface IProduct {
  seller: string;
  _id: string;
  image: string[];
  brand: string;
  model: string;
  variants: IVariant[];
  features: IFeatures;
  releaseDate: string;
  isAvailable: boolean;
  ratings: IRatings;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  category: string;
}
