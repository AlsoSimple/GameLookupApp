import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { IoArrowBackOutline, IoGlobeOutline } from 'react-icons/io5';
import type { GameDetail } from '../../hooks/types';
import styles from './GameDetailPage.module.scss';

export const GameDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: game, isLoading, error } = useFetch<GameDetail>(
    `/api/game?id=${id}`
  );

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.status}>
          <div className={styles.spinner}></div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className={styles.page}>
        <div className={styles.status}>
          <p className={styles.error}>Could not load game</p>
          <button className={styles.backButton} onClick={() => navigate(-1)}>Go back</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <IoArrowBackOutline />
      </button>

      <div className={styles.hero}>
        <img src={game.thumbnail} alt={game.title} className={styles.heroImage} />
        <div className={styles.heroFade}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.titleSection}>
          <span className={styles.label}>{game.genre}</span>
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.subtitle}>{game.developer}</p>
        </div>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Publisher</span>
            <span className={styles.metaValue}>{game.publisher}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Platform</span>
            <span className={styles.metaValue}>{game.platform}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Status</span>
            <span className={styles.metaValue}>{game.status}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.description}>{game.description}</p>
        </div>

        {game.screenshots.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Screenshots</h2>
            <div className={styles.screenshots}>
              {game.screenshots.map((ss) => (
                <img key={ss.id} src={ss.image} alt={`${game.title} screenshot`} className={styles.screenshot} />
              ))}
            </div>
          </div>
        )}

        {game.minimum_system_requirements && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>System Requirements</h2>
            <div className={styles.sysReqs}>
              {game.minimum_system_requirements.os && (
                <div className={styles.reqItem}>
                  <span className={styles.reqLabel}>OS</span>
                  <span className={styles.reqValue}>{game.minimum_system_requirements.os}</span>
                </div>
              )}
              {game.minimum_system_requirements.processor && (
                <div className={styles.reqItem}>
                  <span className={styles.reqLabel}>Processor</span>
                  <span className={styles.reqValue}>{game.minimum_system_requirements.processor}</span>
                </div>
              )}
              {game.minimum_system_requirements.memory && (
                <div className={styles.reqItem}>
                  <span className={styles.reqLabel}>Memory</span>
                  <span className={styles.reqValue}>{game.minimum_system_requirements.memory}</span>
                </div>
              )}
              {game.minimum_system_requirements.graphics && (
                <div className={styles.reqItem}>
                  <span className={styles.reqLabel}>Graphics</span>
                  <span className={styles.reqValue}>{game.minimum_system_requirements.graphics}</span>
                </div>
              )}
              {game.minimum_system_requirements.storage && (
                <div className={styles.reqItem}>
                  <span className={styles.reqLabel}>Storage</span>
                  <span className={styles.reqValue}>{game.minimum_system_requirements.storage}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <a
          href={game.game_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.playButton}
        >
          <IoGlobeOutline className={styles.playIcon} />
          Play Now
        </a>
      </div>
    </div>
  );
};
