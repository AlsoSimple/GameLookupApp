import styles from './Filters.module.scss';

const GENRES = [
  'All', 'Shooter', 'MMORPG', 'Action RPG', 'Battle Royale',
  'Strategy', 'MOBA', 'Card Game', 'Racing', 'Sports',
  'Social', 'Fighting', 'MMO', 'RPG'
];

const PLATFORMS = [
  { label: 'All Platforms', value: 'all' },
  { label: 'PC', value: 'pc' },
  { label: 'Browser', value: 'browser' },
];

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Release Date', value: 'release-date' },
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Relevance', value: 'relevance' },
];

interface FiltersProps {
  activeGenre: string;
  activePlatform: string;
  activeSort: string;
  onGenreChange: (genre: string) => void;
  onPlatformChange: (platform: string) => void;
  onSortChange: (sort: string) => void;
}

export const Filters = ({
  activeGenre,
  activePlatform,
  activeSort,
  onGenreChange,
  onPlatformChange,
  onSortChange,
}: FiltersProps) => {

  return (
    <div className={styles.filters}>
      <div className={styles.row}>
        <select
          value={activePlatform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className={styles.select}
        >
          {PLATFORMS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select
          value={activeSort}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.select}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.genres}>
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`${styles.chip} ${activeGenre === genre ? styles.active : ''}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};
