'use client'

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProductTabsProps = {
  tabs: { value: string; label: string }[];
};

const triggerClass =
  "uppercase text-md mb-2 cursor-pointer hover:text-black text-secondary bg-transparent p-0 data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-none";

export const ProductTabs = ({ tabs }: ProductTabsProps) => {
  return (
    <TabsList className="bg-transparent p-0 gap-4 lg:gap-8">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.value} value={tab.value} className={triggerClass}>
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
