import { Game } from "@/data/mock-games";
import { SectionTitle } from "@/components/SectionTitle";
import { GameCard } from "@/components/GameCard";

interface DealsGridProps {
  title?: string;
  viewAll: boolean;
  games: Game[];
  colorConfig: {
    sectionTitle: string;
    gameCardIcon: string;
    gameCardShadow: string;
  };
  viewAllLink?: string;
  rates: Record<string, number>;
}

export const DealsGrid = ({
  games,
  colorConfig,
  viewAll,
  rates,
}: DealsGridProps) => {
  return (
    <section className="mb-8">
      <SectionTitle
        titleImg={
          games[0].platform === "Steam"
            ? "/steam_logo.png"
            : games[0].platform === "Epic Games"
            ? "/epic_games.png"
            : games[0].platform === "GOG"
            ? "/gog3.png"
            : "/epic_games.png" // default case
        }
        slug={games[0].platform === "Steam" ? "steam" : "gog"}
        viewAll={viewAll}
      />
      <div className="pb-4 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {games.map((game, index) => (
            <div key={game.id} className="flex justify-center">
              <GameCard
                game={game}
                rates={rates}
                animationDelay={index * 100}
                iconColorClass={colorConfig.gameCardIcon}
                shadowColorClass={colorConfig.gameCardShadow}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
