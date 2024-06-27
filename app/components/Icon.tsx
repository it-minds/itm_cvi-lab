"use client";

import React, { useState } from "react";

interface IconProps {
  iconName: string;
  svg: string;
  category: string;
}

const Icon: React.FC<IconProps> = ({ iconName, svg }) => {
    const [copied, setCopied] = useState(false);

  const CopySVG = async (svgText: string) => {
    try {
      navigator.clipboard.writeText(svgText);
      setCopied(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group relative">
      <div className="relative h-[8.5rem]">
        <div className="absolute inset-0 flex h-full w-full cursor-auto items-center justify-center rounded-xl text-slate-900 ring-1 ring-inset ring-slate-900/[0.08]">
          <div
            className="w-full h-full p-16 lg:p-12 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <button
            onClick={() => CopySVG(svg)}
            className="absolute inset-0 m-1 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-stone-100 bg-opacity-90 text-black rounded-lg"
          >
            {
            !copied 
            ? <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
              />
            </svg>
            : <p>Copied!</p>
}
          </button>
        </div>
      </div>
      <div className="mt-3 h-10 truncate text-center text-[0.8125rem] leading-5 text-slate-500 group-focus-within:line-clamp-2 group-focus-within:whitespace-normal group-hover:line-clamp-2 group-hover:whitespace-normal">
        {iconName}
      </div>
    </div>
  );
};

export default Icon;
