"use client";
import { Game } from "@/data/mock-games";
import { Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClaimStore } from "@/store/useClaimStore";
import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";

interface GameCardProps {
  game: Game;
  buttonText?: string;
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
  // let trueButtonText = "";
  const claimGame = useClaimStore((state) => state.claimGame);
  const addGamePrice = useClaimStore((state) => state.addGameMoney);
  const [modalOpen, setModalOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState(false);
  const [modalAction, setModalAction] = useState<"claim" | "view" | null>(null);
  const gamePrice =
    game.secondPrice && game.secondPrice !== ""
      ? parseFloat(game.price.replace(/[^0-9.]/g, "")) -
        parseFloat(game.secondPrice.replace(/[^0-9.]/g, ""))
      : parseFloat(game.price.replace(/[^0-9.]/g, ""));
  const gamecardbkg = game.platform === "Steam" ? "bg-[#1b2838]" : "bg-card";

  const handleClaim = (action: "claim" | "view") => {
    setModalAction(action);
    setModalOpen(true);
  };

  function handleOpenBrowser() {
    let urlValue;
    if (game.platform === "Steam") {
      urlValue = game.urlSlug;
    } else {
      urlValue = `https://store.epicgames.com/en-US/p/${game.urlSlug}`;
    }

    setTimeout(() => {
      window.open(urlValue, "_blank");
    }, 800);
    setModalOpen(false);

    if (modalAction === "claim" && !claimStatus) {
      claimGame(game.platform, game.title);
      addGamePrice(gamePrice);
      setClaimStatus(true);
    }
  }

  function handleOpenClient() {
    //NOTE: Do the Steam Client thing here and test it please!
    window.open(
      `com.epicgames.launcher://store/product/${game.urlSlug}`,
      "_blank"
    );
    setModalOpen(false);
    if (modalAction === "claim" && !claimStatus) {
      claimGame(game.platform, game.title);
      addGamePrice(gamePrice);
      setClaimStatus(true);
    }
    //addToMoneySaved(game.price)
  }

  function GameModal() {
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-card rounded-lg p-6 shadow-xl w-full max-w-xs flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-center">
            {modalAction === "view" || claimStatus
              ? "Would you like to view this game?"
              : "Would you like to claim this game?"}
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
      </div>,
      typeof window !== "undefined"
        ? document.body
        : document.createElement("div")
    );
  }

  return (
    <>
      {modalOpen && <GameModal />}
      <div
        className={cn(
          `${gamecardbkg} rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group animate-fade-in-up flex flex-col w-70`,
          shadowColorClass
        )}
        style={{ animationDelay: `${animationDelay}ms`, opacity: 0 }}
      >
        <div className="relative aspect-[5/3] overflow-hidden group-hover:scale-105 transition-transform duration-300">
          {game.imageUrl && game.imageUrl !== "" ? (
            <Image
              src={game.imageUrl}
              alt={game.title}
              fill
              className="object-cover"
            />
          ) : (
            <Image
              src="/not_found.jpeg" // Replace with your not found image path
              alt="Image not found"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="pt-2 pb-4 pl-4 pr-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg truncate text-foreground">
            {game.title}
          </h3>
          <div className="mt-2 space-y-2 text-sm text-muted-foreground flex-grow">
            <div className="flex items-center">
              <Tag className={cn("w-4 h-4 mr-2", iconColorClass)} />
              <span className="line-through">{game.price}</span>
              <span className="mx-1" /> {/* Spacer */}
              <span className="text-foreground">{game.secondPrice}</span>
            </div>
            {game.freeUntil && game.next ? (
              <div className="flex items-center">
                <Calendar className={cn("w-4 h-4 mr-2", iconColorClass)} />
                <span>
                  <>
                    <b>Free</b> from{" "}
                    <span className="text-foreground">{game.freeUntil}</span>
                  </>
                </span>
              </div>
            ) : game.freeUntil && !game.next ? (
              <div className="flex items-center">
                <Calendar className={cn("w-4 h-4 mr-2", iconColorClass)} />
                <span>
                  <>
                    <b>Free</b> until{" "}
                    <span className="text-foreground">{game.freeUntil}</span>
                  </>
                </span>
              </div>
            ) : null}
          </div>
          {game.next ? (
            <Button
              variant="gameCard"
              className="flex-1 gap-2 mt-5"
              onClick={() => handleClaim("view")}
            >
              View Game
            </Button>
          ) : (
            <div className="flex gap-1 sm:gap-2 mt-4 w-full">
              <Button
                variant="gameCard"
                className="flex-1 min-w-0"
                onClick={() => handleClaim("claim")}
              >
                {claimStatus ? "Claimed!" : "Claim"}
              </Button>
              <Button
                variant="gameCard"
                className="flex-1 min-w-0"
                onClick={() => handleClaim("view")}
              >
                View
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
