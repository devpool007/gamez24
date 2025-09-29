"use client"
import { Game } from "@/data/mock-games";
import { SectionTitle } from "@/components/SectionTitle";
import { GameCard2 } from "./GameCard2";
// import { getCurrencyRates } from "@/lib/actions/currency-action";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DealsSectionProps {
  title?: string;
  viewAll: boolean;
  games: Game[];
  colorConfig: {
    sectionTitle: string;
    gameCardIcon: string;
    gameCardShadow: string;
  };
  viewAllLink?: string;
}

export const DealsSection2 = ({
  games,
  colorConfig,
  title,
  viewAll,
}: DealsSectionProps) => {


  const rates = {};
  return (
    <section className="mb-12 mt-2">
      <SectionTitle
        titleImg={
          title === "STEAM"
            ? "/steam_logo.png"
            : title === "EPIC_GAMES"
            ? "/epic_games.png"
            : title === "GOG"
            ? "/gog3.png"
            : "/epic_games.png" // default case
        }
        slug= {title === "STEAM" ? "steam" : "gog"}
        viewAll={viewAll}
      />
      <Carousel opts={{ align: "start" }} className="w-full p-4">
        <CarouselPrevious className="flex -top-10 right-16 left-auto translate-y-0" />
        <CarouselNext className="flex -top-10 right-4 translate-y-0" />

        {games.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="text-foreground text-3xl text-center font-modern font-bold">
             Enter game name to search...
            </div>
          </div>
        )}

        <CarouselContent className="content-center gap-25">
          {games.map((game, index) => (
            <CarouselItem
              key={game.id}
              className="pl-8 pb-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <GameCard2
                game={game}
                animationDelay={index * 100}
                iconColorClass={colorConfig.gameCardIcon}
                shadowColorClass={colorConfig.gameCardShadow}
                rates={rates}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
