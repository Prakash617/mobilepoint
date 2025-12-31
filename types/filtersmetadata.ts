// types/filters.ts

export interface FiltersMetaData {
  brands: BrandFilter[];
  attributes: AttributeFilter[];
  categories: CategoryFilter[];
  ratings: RatingFilter[];
}

/* ------------------ Brands ------------------ */
export interface BrandFilter {
  name: string;
  slug: string;
  product_count: number;
  logo: string | null;
}

/* ---------------- Attributes ---------------- */
export interface AttributeFilter {
  name: string;
  slug: string;
  values: AttributeValueFilter[];
}

export interface AttributeValueFilter {
  id: number;
  value: string;
  count: number;
  color_code: string | null;
}

/* ---------------- Categories ---------------- */
export interface CategoryFilter {
  name: string;
  slug: string;
  parent_id?: number | null;
}

/* ---------------- Ratings ---------------- */
export interface RatingFilter {
  rating: number; // 1–5
  count: number;
}
