"use client";

import { useState } from "react";

export default function Longtextmore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Text container */}
      <div className={`relative text-gray-800 px-5 pt-6 text-sm text-justify ${open ? "" : "max-h-20 overflow-hidden"}`}>
        <p>{text}</p>

        {/* Fade overlay */}
        {!open && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Show More / Show Less Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-[#0D6EFD] text-sm hover:underline ml-5 mt-2"
      >
        {open ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
