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
    <div className="w-full bg-background/80 backdrop-blur-sm ">
      <div className="flex justify-start space-x-6 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            onClick={() => handleTabClick(tab.path)}
            className={`py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === tab.path
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
