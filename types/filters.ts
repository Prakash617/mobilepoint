export interface BrandFilter {
  name: string;
  slug: string;
  product_count: number;
  logo: string | null;
}

export interface AttributeValue {
  value: string;
  id: number;
  count: number;
  color_code: string | null;
}

export interface AttributeFilter {
  name: string;
  slug: string;
  values: AttributeValue[];
}

export interface CategoryFilter {
  name: string;
  slug: string;
  parent_id: number;
}

export interface RatingFilter {
  rating: number;
  count: number;
}

export interface FiltersMetadata {
  brands: BrandFilter[];
  attributes: AttributeFilter[];
  categories: CategoryFilter[];
  ratings: RatingFilter[];
}
