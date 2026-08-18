"use client";

import { useState } from "react";

export default function Longtextmore({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Text container */}
      <div
        className={`relative text-gray-700 text-sm leading-relaxed ${
          open ? "" : "max-h-24 overflow-hidden"
        }`}
      >
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: text }}
        />

        {/* Fade overlay */}
        {!open && (
          <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {/* Show More / Show Less Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-success text-sm font-semibold uppercase hover:underline cursor-pointer mt-3 mb-1 transition-colors ml-5"
      >
        {open ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
