export interface Product {
  allPrices: Price[];
  articleNumber: number;
  availableColorIcons: ColorIcon[];
  baseProduct: string;
  brand: string;
  brandName: string;
  code: string;
  description: string;
  images: Image[];
  manufacturerAID: string;
  name: string;
  price: Price;
  stock: Stock;
  taglist: Tag[];
  topLevelCategory: Category;
  url: string;
  variantMatrix: VariantMatrix[];
  volumePricesFlag: boolean;
}

interface Price {
  currencyIso: string;
  formattedValue: string;
  priceType: string;
  value: number;
}

interface ColorIcon {
  code: string;
  altText: string;
  url: string;
}

interface Image {
  format: string;
  imageType: string;
  url: string;
}

interface Stock {
  stockLevelStatus: string;
}

interface Tag {
  backgroundColor?: string;
  code: string;
  description: string;
  fontColor?: string;
  frameColor?: string;
}

interface Category {
  code: string;
  codeAlternative: string;
  url: string;
}

interface VariantMatrix {
  sizeMap: SizeMap[];
  variantOption: VariantOption;
}

interface SizeMap {
  sizeSystem: SizeSystem;
  value: string;
}

interface SizeSystem {
  code: string;
}

interface VariantOption {
  url: string;
}

export interface ProductList {
  products: Product[];
}
