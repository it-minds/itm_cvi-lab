"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IconModel from "./interfaces/IconModel";
import { RenderIcon } from "./helpers/RenderComponent";
import { Bucket } from "./interfaces/ElasticsearchModels";

const Page: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [results, setResults] = useState<IconModel[]>([]);

  const search = async () => {
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}${activeCategories.map(ac => `&category=${encodeURIComponent(ac)}`).join('')}`
      );
      if (response.ok) {
        const icons: IconModel[] = await response.json();
        setResults(icons);
      } else {
        console.error("Failed to search icons");
      }
    } catch (error) {
      console.error("Error searching icons:", error);
    }
  };

  const handleActiveCategories = async (category: string) => {
    setActiveCategories((activeCategories) => {
    if (activeCategories.includes(category)) {
        // If the string is in the array, remove it
        return activeCategories.filter((ac) => ac !== category);
      } else {
        // If the string is not in the array, add it
        return [...activeCategories, category];
      }
    });
  };

  useEffect(() => {
    // Fetch all categories initially
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (response.ok) {
          const result: Bucket[] = await response.json();
          setCategories(result.map((res) => `${res.key}`));
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch all documents initially
    const fetchAll = async () => {
      try {
        const response = await fetch("/api/search");
        if (response.ok) {
          const icons: IconModel[] = await response.json();
          setResults(icons);
        } else {
          console.error("Failed to fetch icons");
        }
      } catch (error) {
        console.error("Error fetching icons:", error);
      }
    };

    fetchAll();
    fetchCategories();
  }, []);

  useEffect(() => {
    search()
  }, [activeCategories, query])

  return (
    <div className="w-full h-dvh flex flex-col">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-30 flex items-center">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold">
            Download Twoday CVI logos as SVG or JSX
          </h1>
        </div>
        <div>
          <Image
            src="/images/twoday-orange-hexagon.png"
            width={500}
            height={500}
            alt="twoday-element"
          />
        </div>
      </div>
      <div className="pb-4 border border-[rgba(15,23,42,0.08)] shadow-[0_1px_3px_rgba(15,23,42,0.08)] sm:pb-0 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center w-full">
          <div className="relative flex-auto">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              id="default-search"
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full appearance-none rounded-lg bg-transparent py-6 pl-12 pr-4 text-base text-slate-900 transition placeholder:text-slate-400 focus:outline-none sm:text-[0.8125rem] sm:leading-6 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
              placeholder="Search Mockups, Logos, Animations..."
              required
            />
          </div>
        </div>
      </div>
      <div className="w-full h-dvh bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col">
          <div className="pt-6 w-full flex gap-2">
            {categories.map((item, key) => {
              return (
                <button
                  onClick={() => handleActiveCategories(item)}
                  key={key}
                  className={`border py-3 px-5 border-slate-200 rounded-full transition-colors duration-150 ease-in-out ${activeCategories.includes(item) ? "text-white bg-twoday-light-green" : ""}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-x-6 gap-y-4 pb-16 pt-10 sm:pt-11 md:pt-12">
            {results.map((item, key) => {
              return RenderIcon(item, key);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
