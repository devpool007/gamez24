
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  viewAllLink?: string;
}

export const SectionTitle = ({ children, className, viewAllLink }: SectionTitleProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className={cn("text-4xl font-bold border-l-4 pl-4", className)}>
        {children}
      </h1>
      {viewAllLink && (
        <Button asChild variant="link" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {/* <Link to={viewAllLink}>
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link> */}
        </Button>
      )}
    </div>
  );
};
