import { Link } from 'react-router-dom';
import type { Game } from '../../hooks/types';
import styles from './GameCard.module.scss';

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export const GameCard = ({ game, featured = false }: GameCardProps) => {

  return (
    <Link
      to={`/game/${game.id}`}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
    >
      <div className={styles.imageWrapper}>
        <img src={game.thumbnail} alt={game.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <span className={styles.genre}>{game.genre}</span>
        <h3 className={styles.title}>{game.title}</h3>
        <p className={styles.developer}>{game.developer}</p>
      </div>
    </Link>
  );
};
