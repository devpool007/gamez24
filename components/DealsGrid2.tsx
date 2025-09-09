import { Game } from "@/data/mock-games";
import { SectionTitle } from "@/components/SectionTitle";
import { GameCard2 } from "@/components/GameCard2";

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

export const DealsGrid2 = ({
  games,
  colorConfig,
  title,
  viewAll,
  rates,
}: DealsGridProps) => {
  return (
    <section className="mb-8">
      <SectionTitle
        titleImg={
          title === "Steam"
            ? "/steam_logo.png"
            : title === "Epic Games"
            ? "/epic_games.png"
            : title === "GOG"
            ? "/gog3.png"
            : "/epic_games.png" // default case
        }
        slug={title === "Steam" ? "steam" : "gog"}
        viewAll={viewAll}
      />
      {games.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <div className="text-foreground text-3xl text-center font-modern font-bold">
            Sorry no games have been searched or found... 
          </div>
        </div>
      )}
      <div className="pb-4 px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {games.map((game, index) => (
            <div key={game.id} className="flex justify-center">
              <GameCard2
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
