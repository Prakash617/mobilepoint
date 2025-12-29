"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import { useMemo, useState } from "react";



type Props = {
  product: Product;
};

export default function DynamicVariantSelector({ product }: Props) {

  return (
    <div className="mt-6">
                  <p className="font-bold">
                    COLOR:{" "}
                    <span className="text-secondary font-semibold">
                      {" "}
                      Midnight Blue{" "}
                    </span>
                  </p>
    
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {["Midnight Blue", "Deep Purple", "Space Black"].map((c) => (
                      <div
                        key={c}
                        className="border-2 rounded-lg px-2 py-1 cursor-pointer hover:border-success flex items-center justify-center "
                      >
                        <div>
                          <Image
                            src="/phone3.jpg"
                            alt="color"
                            width={70}
                            height={70}
                          />
                        </div>
                        <div>
                          <p className="text-sm">{c}</p>
                          <p className="text-xs font-bold">Rs. 35,000/-</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  );
}
