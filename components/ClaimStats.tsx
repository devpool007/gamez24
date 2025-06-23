
"use client";
import { useClaimStore } from '@/store/useClaimStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Trophy } from 'lucide-react';
import { dealsConfig } from '@/config/dealsConfig';

export const ClaimStats = () => {
  const stats = useClaimStore((state) => state.stats);
  const totalClaims = useClaimStore((state) => state.totalClaims());

  const getDisplayName = (categoryKey: string) => {
    const category = dealsConfig[categoryKey as keyof typeof dealsConfig];
    if (category) {
      return category.title.replace(' Freebies', '').replace(' Deals', '');
    }
    return categoryKey;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2 h-auto">
          <Trophy className="w-6 h-6 text-yellow-500" />
          {totalClaims > 0 && (
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {totalClaims}
            </span>
          )}
          <span className="sr-only">View Claim Stats</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Games Claimed</h4>
            <p className="text-sm text-muted-foreground">
              Your stats for claimed freebies.
            </p>
          </div>
          <div className="grid gap-2 text-sm">
            {Object.entries(stats).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <span>{getDisplayName(category)}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
            <div className="flex items-center justify-between font-bold border-t pt-2 mt-2">
              <span>Total</span>
              <span>{totalClaims}</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
