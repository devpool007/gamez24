import Image from "next/image";
import React from "react";
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// interface SectionTitleProps {
//   children: React.ReactNode;
//   className?: string;
//   viewAllLink?: string;
// }

interface SectionTitleProps {
  titleImg: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ titleImg }) => {
  return (
    <div className="flex justify-between items-center">
      {/* <h1 className={cn("text-2xl font-bold border-l-4 pl-4", className)}>
        {children}
      </h1> */}
      <div className="p-5 size-35">
        <Image src={titleImg} alt={titleImg} width={60} height={60} />
      </div>
    </div>
  );
};
