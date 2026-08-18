import { api } from "@/lib/api";

export interface MenuItem {
  id: number;
  menu: number;
  parent: number | null;
  label_en: string;
  label_np: string | null;
  url: string | null;
  title: string | null;
  sub_title: string | null;
  order: number;
  icon: string | null;
  is_external: boolean;
  open_new_tab: boolean;
  is_active: boolean;
  children: MenuItem[];
}

export interface Menu {
  id: number;
  name: string;
  location: string;
  is_active: boolean;
  items: MenuItem[];
}

export const menuService = {
  getByLocation: async (location: string): Promise<Menu[]> => {
    const { data } = await api.get<Menu[]>("/menus/by_location/", {
      params: { location },
    });
    return data;
  },
};
