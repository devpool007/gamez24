
import { Game } from '@/data/mock-games';
import { SectionTitle } from '@/components/SectionTitle';
import { GameCard } from '@/components/GameCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface DealsSectionProps {
  title: string;
  games: Game[];
  colorConfig: {
    sectionTitle: string;
    gameCardIcon: string;
    gameCardShadow: string;
  };
  viewAllLink?: string;
}

export const DealsSection = ({ title, games, colorConfig, viewAllLink }: DealsSectionProps) => {
  return (
    <section className="mb-12 w-auto">
      <SectionTitle className={colorConfig.sectionTitle} viewAllLink={viewAllLink}>
        {title}
      </SectionTitle>
      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent className="-ml-4">
          {games.map((game, index) => (
            <CarouselItem
              key={game.id}
              className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <GameCard
                game={game}
                animationDelay={index * 100}
                iconColorClass={colorConfig.gameCardIcon}
                shadowColorClass={colorConfig.gameCardShadow}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};
