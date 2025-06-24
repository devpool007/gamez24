"use client";
import { Game } from "@/data/mock-games";
import { Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClaimStore } from "@/store/useClaimStore";
import Image from "next/image";
import { useState } from "react";

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
  const [modalOpen, setModalOpen] = useState(false);

  const handleClaim = () => {
    setModalOpen(true);
  };

  function handleOpenBrowser() {
    setTimeout(() => {
      window.open(
        `https://store.epicgames.com/en-US/p/${game.urlSlug}`,
        "_blank"
      );
    }, 800);
    setModalOpen(false);
    claimGame(game.platform, game.title);
  }

  function handleOpenClient() {
    window.open(
      `com.epicgames.launcher://store/product/${game.urlSlug}`,
      "_blank"
    );
    setModalOpen(false);
    claimGame(game.platform, game.title);
  }

  function GameModal(){
    return((
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-card rounded-lg p-6 shadow-xl w-full max-w-xs flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Would you like to claim this game?
              </h2>
              <div className="flex gap-2 w-full">
                <Button className="flex-1" onClick={handleOpenBrowser}>
                  Open in browser
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleOpenClient}
                  variant="outline"
                >
                  Open in client
                </Button>
              </div>
              <button
                className="mt-4 text-sm text-muted-foreground hover:underline cursor-pointer"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
  }

  return (
    <>
    {modalOpen && <GameModal/>}
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
    </>
  );
};
