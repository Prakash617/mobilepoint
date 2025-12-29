"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";

type AttributeValue = {
  id: number;
  value: string;
  image?: string | null;
  color_code?: string | null;
};

type Attribute = {
  name: string;
  display_name: string;
  values: AttributeValue[];
};

type VariantAttribute = {
  attribute: string;
  value: string;
  color_code?: string | null;
};

type Variant = {
  id: number;
  sku: string;
  price: string;
  compare_at_price?: string;
  stock_quantity: number;
  is_in_stock: boolean;
  is_default: boolean;
  attributes: VariantAttribute[];
  images: { id: number; image: string; alt_text: string }[];
};

type Props = {
  availableAttributes: Attribute[];
  variants: Variant[];
};

export default function ProductAttributes({ availableAttributes, variants }: Props) {
  // Track selected value per attribute
  const [selected, setSelected] = useState<Record<string, AttributeValue>>({});

  // Set default selection on first render
  useEffect(() => {
    const defaultSelection: Record<string, AttributeValue> = {};
    availableAttributes.forEach((attr) => {
      defaultSelection[attr.name] = attr.values[0];
    });
    setSelected(defaultSelection);
  }, [availableAttributes]);

  const handleSelect = (attrName: string, value: AttributeValue) => {
    setSelected((prev) => ({
      ...prev,
      [attrName]: value,
    }));
  };

  // Find the matching variant based on selected attributes
  const selectedVariant = useMemo(() => {
    return variants.find((variant) =>
      variant.attributes.every(
        (attr) => selected[attr.attribute]?.value === attr.value
      )
    );
  }, [selected, variants]);

  return (
    <div className="space-y-6">
      {availableAttributes.map((attr) => (
        <div key={attr.name} className="mt-6">
          <p className="font-bold">
            {attr.display_name}:{" "}
            <span className="text-secondary font-semibold">
              {selected[attr.name]?.value || "Select"}
            </span>
          </p>

          <div className="flex gap-2 mt-3">
            {attr.values.map((v) => {
              const isActive = selected[attr.name]?.id === v.id;

              return (
                <div
                  key={v.id}
                  onClick={() => handleSelect(attr.name, v)}
                  className={`border-2 rounded-lg px-3 py-1 cursor-pointer flex items-center justify-center gap-2
                    hover:border-success
                    ${isActive ? "border-success" : "border-gray-300"}
                  `}
                >
                  {v.image && (
                    <div>
                      <Image
                        src={v.image}
                        alt={v.value}
                        width={70}
                        height={70}
                        className="object-contain"
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-sm">{v.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Price display */}
      <div className="mt-4">
        <p className="text-lg font-bold">
          Price:{" "}
          {selectedVariant
            ? `$${selectedVariant.price}`
            : `$${variants[0]?.price || "0.00"}`}
        </p>
        {selectedVariant?.compare_at_price && (
          <p className="text-sm line-through text-gray-500">
            ${selectedVariant.compare_at_price}
          </p>
        )}
      </div>
    </div>
  );
}
