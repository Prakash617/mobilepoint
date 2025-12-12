 export type ProductCardProps = {
    id?: number;
  name: string;
  price: number;
  image: string;
  tag?: string;
  tagColor?: string;
  tagText: string;
  tagPrice?: number;
  free_shipping?: boolean;
  free_gift?: boolean;
  new?: boolean;
  sub_images?: string[];
  slug: string;
  in_stock: true | false;
  quantity?: number
  tag_text?: string

};