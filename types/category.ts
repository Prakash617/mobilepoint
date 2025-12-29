export interface GroupedCategory {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  parent: number | null;
  is_featured: boolean;
  is_active: boolean;
  total_products: number;
  children: GroupedCategory[];
}
