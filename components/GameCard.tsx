"use client";
import { Game } from "@/data/mock-games";
import { Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClaimStore } from "@/store/useClaimStore";
import Image from "next/image";

interface GameCardProps {
  game: Game;
  animationDelay: number;
  iconColorClass?: string;
  shadowColorClass?: string;
}

export const GameCard = ({
  game,
  animationDelay,
  iconColorClass = "text-primary",
  shadowColorClass = "hover:shadow-primary/50",
}: GameCardProps) => {
  const claimGame = useClaimStore((state) => state.claimGame);

  const handleClaim = () => {
    setTimeout(() => {
      window.open('https://store.epicgames.com/en-US/p/the-operator-b835e9', '_blank');
    }, 800);
    claimGame(game.platform, game.title);
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group animate-fade-in-up flex flex-col w-50",
        shadowColorClass
      )}
      style={{ animationDelay: `${animationDelay}ms`, opacity: 0 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover" //what the hell this does figure out later
          // sizes="(max-width: 768px) 100vw, 200px"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg truncate text-foreground">
          {game.title}
        </h3>
        <div className="mt-2 space-y-2 text-sm text-muted-foreground flex-grow">
          <div className="flex items-center">
            <Tag className={cn("w-4 h-4 mr-2", iconColorClass)} />
            <span>{game.platform}</span>
          </div>
          <div className="flex items-center">
            <Calendar className={cn("w-4 h-4 mr-2", iconColorClass)} />
            <span>{game.freeUntil}</span>
          </div>
        </div>
        <Button
          variant="secondary"
          className="w-full mt-4"
          onClick={handleClaim}
        >
          Claim Now
        </Button>
      </div>
    </div>
  );
};
