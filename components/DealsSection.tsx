import { Game } from "@/data/mock-games";
import { SectionTitle } from "@/components/SectionTitle";
import { GameCard } from "@/components/GameCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface DealsSectionProps {
  title?: string;
  buttonText?: string;
  games: Game[];
  colorConfig: {
    sectionTitle: string;
    gameCardIcon: string;
    gameCardShadow: string;
  };
  viewAllLink?: string;
}

export const DealsSection = ({ games, colorConfig }: DealsSectionProps) => {
  return (
    <section className="mb-12">
      <SectionTitle
        titleImg={
          games[0].platform === "Steam" ? "/steam_logo.png" : "/epic_games.png"
        }
      />
      <Carousel opts={{ align: "start" }} className="w-full p-4">
        <CarouselPrevious className="flex -top-12 right-16 left-auto translate-y-0" />
        <CarouselNext className="flex -top-12 right-4 translate-y-0" />
        <CarouselContent className="content-center gap-20">
          {games.map((game, index) => (
            <CarouselItem
              key={game.id}
              className="pl-8 pb-1 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              {game.next ? (
                <GameCard
                  game={game}
                  buttonText="View Game"
                  animationDelay={index * 100}
                  iconColorClass={colorConfig.gameCardIcon}
                  shadowColorClass={colorConfig.gameCardShadow}
                />
              ) : (
                <GameCard
                  game={game}
                  animationDelay={index * 100}
                  iconColorClass={colorConfig.gameCardIcon}
                  shadowColorClass={colorConfig.gameCardShadow}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
