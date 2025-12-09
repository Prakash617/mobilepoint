"use client";

import { useState } from "react";

export default function Longtextmore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p className={`${open ? "" : "line-clamp-2"} text-gray-800 px-5 pt-6 text-sm text-justify`}>
        {text}
      </p>

      <button
        onClick={() => setOpen(!open)}
        className="text-[#0D6EFD] text-sm hover:underline ml-5 mt-2"
      >
        {open ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
