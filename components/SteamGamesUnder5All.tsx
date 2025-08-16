'use client';

import { useEffect, useState, useTransition } from 'react';
import { DealsGrid } from '@/components/DealsGrid';
import { Button } from '@/components/ui/button';
import { getSteamGames, getSteamGamesBatch } from '@/lib/actions/steam-action';
import { Game } from '@/data/mock-games';
import { dealsConfig } from '@/config/dealsConfig';

export function SteamGamesWithServerActions() {
  const [steamGames, setSteamGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // useTransition for handling server action loading states
  const [isPending, startTransition] = useTransition();
  const [isInitialLoading, setIsInitialLoading] = useState(true );

  const gamesPerPage = 50;

  // Load initial games using Server Action
  const loadInitialGames = async () => {
    setIsInitialLoading(true);
    setError(null);

    try {
      // Use batch server action to load first 2 pages (100 games)
      const result = await getSteamGamesBatch(0, 1);
      
      if (result.success) {
        setSteamGames(result.games);
        setCurrentPage(result.nextPage);
        setHasMore(result.hasMore);
        setIsInitialLoading(false);
      } else {
        setError(result.error || 'Failed to load games');
      }
    } catch (error) {
      console.error('Error loading initial games:', error);
      setError('Failed to load games. Please try again.');
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Load more games using Server Action with useTransition
  const loadMoreGames = () => {
    if (isPending || !hasMore) return;

    startTransition(async () => {
      try {
        setError(null);
        const start = currentPage * gamesPerPage;
        
        console.log(`Loading more games, starting at ${start}...`);
        
        const result = await getSteamGames(start);
        
        if (result.success) {
          if (result.games.length === 0) {
            setHasMore(false);
          } else {
            setSteamGames(prevGames => [...prevGames, ...result.games]);
            setCurrentPage(prevPage => prevPage + 1);
            setHasMore(result.hasMore);
          }
        } else {
          setError(result.error || 'Failed to load more games');
        }
      } catch (error) {
        console.error('Error loading more games:', error);
        setError('Failed to load more games. Please try again.');
      }
    });
  };

  // Initial load on component mount
  useEffect(() => {
    loadInitialGames();
  }, []);

  // Loading state for initial load
  if (isInitialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading Steam games...</p>
        </div>
      </div>
    );
  }

  // Error state when no games loaded
  if (error && steamGames.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={loadInitialGames} disabled={isInitialLoading}>
            {isInitialLoading ? 'Loading...' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DealsGrid
        title={steamGames[0]?.platform ?? "Steam"}
        games={steamGames}
        colorConfig={dealsConfig.steam.colorConfig}
        viewAll={false}
      />
      
      {steamGames.length > 0 && (
        <div className="flex flex-col items-center mt-8 mb-4 space-y-2">
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <Button 
            onClick={loadMoreGames}
            disabled={isPending || !hasMore}
            className="px-8"
          >
            {isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </>
            ) : hasMore ? (
              "Load More"
            ) : (
              'No more games available'
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Showing {steamGames.length} games
          </p>
        </div>
      )}
    </>
  );
}
