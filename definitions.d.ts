// Basic types
type VisibilityType = "DRAFT" | "PUBLISHED" | "HIDDEN";

// Reusable types
type ColorType = {
  name: string;
  image: string;
};

type DateRangeType = {
  startDate: string;
  endDate: string;
};

type HighlightPointsType = {
  headline: string;
  keyPoints: string[];
};

type DiscountType = {
  percentage: number;
  savings: number;
};

type UpsellItemType = {
  id: string;
  name: string;
  salePrice: number;
  price: number;
};

type ImageType = {
  name: string;
  image: string;
};

/***************************************************************/
type CollectionProductType = {
  index: number;
  id: string;
};

type CollectionType = {
  id: string;
  index: number;
  title: string;
  slug: string;
  campaignDuration: DateRangeType;
  collectionType: string;
  bannerImages?: {
    desktopImage: string;
    mobileImage: string;
  };
  products: CollectionProductType[];
  visibility: VisibilityType;
  createdAt: string;
  updatedAt: string;
};

/***************************************************************/
type SettingsType = {
  categorySection: {
    visibility: string;
  };
  [key: string]: any;
};

/***************************************************************/

type PageHeroType = {
  id: string;
  images: {
    desktop: string;
    mobile: string;
  };
  title: string;
  destinationUrl: string;
  visibility: string;
};

/***************************************************************/
type CategoryType = {
  id: string;
  index: number;
  name: string;
  image: string;
  visibility: VisibilityType;
};

/***************************************************************/
type PricingType = {
  basePrice: number;
  salePrice: number;
  discountPercentage: number;
};

type UpsellType = {
  id: string;
  mainImage: string;
  visibility: VisibilityType;
  createdAt: string;
  updatedAt: string;
  pricing: PricingType;
  products: Array<{
    index: number;
    id: string;
    slug: string;
    name: string;
    mainImage: string;
    basePrice: number;
  }>;
};

/***************************************************************/
type ColumnType = { label: string; order: number };
type RowType = { [key: string]: string };

type SizeChartType = {
  inches: {
    columns: ColumnType[];
    rows: RowType[];
  };
  centimeters: {
    columns: ColumnType[];
    rows: RowType[];
  };
};

type KeyPointsType = { index: number; text: string };

type averageOrderValueBoosterType = {
  name: string;
  promotionalMessage: string;
  quantityBreaks?: Array<{
    quantity: number;
    discount: number;
    pricePerItem: number;
    totalPrice: number;
  }>;
};

type ProductType = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  highlights: {
    headline: string;
    keyPoints: KeyPointsType[];
  };
  pricing: PricingType;
  images: {
    main: string;
    gallery: string[];
  };
  options: {
    colors: Array<{
      name: string;
      image: string;
    }>;
    sizes: SizeChartType;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  visibility: "DRAFT" | "PUBLISHED" | "HIDDEN";
  createdAt: string;
  updatedAt: string;
  sourceInfo: {
    platform: string;
    platformUrl: string;
    store: string;
    storeId: string;
    storeUrl: string;
    productUrl: string;
  };
  upsell: string;
  averageOrderValueBooster?: averageOrderValueBoosterType;
  frequentlyBoughtTogether?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};
