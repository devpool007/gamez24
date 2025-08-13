"use client"
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Tab {
  label: string;
  path: string;
}

interface HorizontalNavTabsProps {
  tabs: Tab[];
}

export default function HorizontalNavTabs({ tabs }: HorizontalNavTabsProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    redirect(path);
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-sm">
      <div className="flex justify-start space-x-6 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`mt-5 pt-1 pb-1 pr-2 pl-2 text-sm font-medium rounded-sm border-1 transition-colors  duration-200 ${
              activeTab === tab.path
                ? "bg-violet-700 text-white"
                : "border-transparent text-gray-400 hover:text-white hover:border-violet-600 hover:cursor-pointer"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
