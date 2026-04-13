import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Filters } from '../../components/Filters/Filters';
import { GameCard } from '../../components/GameCard/GameCard';
import { useFetch } from '../../hooks/useFetch';
import type { Game } from '../../hooks/types';
import styles from './SearchPage.module.scss';

const GENRE_TO_CATEGORY: Record<string, string> = {
  'Shooter': 'shooter',
  'MMORPG': 'mmorpg',
  'Action RPG': 'action-rpg',
  'Battle Royale': 'battle-royale',
  'Strategy': 'strategy',
  'MOBA': 'moba',
  'Card Game': 'card',
  'Racing': 'racing',
  'Sports': 'sports',
  'Social': 'social',
  'Fighting': 'fighting',
  'MMO': 'mmo',
  'RPG': 'mmorp',
};

function buildApiUrl(platform: string, sort: string, genre: string): string {
  const params = new URLSearchParams();
  params.set('sort-by', sort);

  if (platform !== 'all') {
    params.set('platform', platform);
  }

  if (genre !== 'All' && GENRE_TO_CATEGORY[genre]) {
    params.set('category', GENRE_TO_CATEGORY[genre]);
  }

  return `/api/games?${params.toString()}`;
}

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const genre = searchParams.get('genre') || 'All';
  const platform = searchParams.get('platform') || 'all';
  const sort = searchParams.get('sort') || 'popularity';

  const apiUrl = buildApiUrl(platform, sort, genre);
  const { data, isLoading, error } = useFetch<Game[]>(apiUrl);

  const filteredGames = useMemo(() => {
    if (!data) return [];
    if (!query) return data;

    const lower = query.toLowerCase();
    return data.filter((game) =>
      game.title.toLowerCase().includes(lower) ||
      game.genre.toLowerCase().includes(lower) ||
      game.developer.toLowerCase().includes(lower)
    );
  }, [data, query]);

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(updates)) {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    }
    setSearchParams(newParams);
  };

  const handleSearch = (newQuery: string) => {
    updateParams({ q: newQuery });
  };

  const handleGenreChange = (newGenre: string) => {
    updateParams({ genre: newGenre });
  };

  const handlePlatformChange = (newPlatform: string) => {
    updateParams({ platform: newPlatform });
  };

  const handleSortChange = (newSort: string) => {
    updateParams({ sort: newSort });
  };

  return (
    <div className={styles.page}>
      <Header />
      <SearchBar onSearch={handleSearch} />

      <Filters
        activeGenre={genre}
        activePlatform={platform}
        activeSort={sort}
        onGenreChange={handleGenreChange}
        onPlatformChange={handlePlatformChange}
        onSortChange={handleSortChange}
      />

      {isLoading && (
        <div className={styles.status}>
          <div className={styles.spinner}></div>
          <p>Loading games...</p>
        </div>
      )}

      {error && (
        <div className={styles.status}>
          <p className={styles.error}>Failed to load games</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <>
          <p className={styles.resultCount}>
            {query
              ? `${filteredGames.length} results for "${query}"`
              : `${filteredGames.length} games`}
          </p>

          <div className={styles.grid}>
            {filteredGames.map((game, index) => (
              <div
                key={game.id}
                className={index === 0 ? styles.gridFeatured : styles.gridItem}
              >
                <GameCard game={game} featured={index === 0} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
