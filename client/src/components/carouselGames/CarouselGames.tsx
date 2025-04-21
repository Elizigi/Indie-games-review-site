import { FC, useEffect, useRef, useState } from "react";
import { Game } from "../gameCard/GameCard";
import styles from "./CarouselGames.module.scss";
import { useNavigate } from "react-router";

interface CarouselGamesProps {
  games: Game[];
}

const CarouselGames: FC<CarouselGamesProps> = ({ games }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag state refs
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const navigate = useNavigate();
  const [cannotClick, setCannotClick] = useState(false);
  const goToGamePage = (game_id: number) => {
    if (cannotClick) return;
    navigate(`/game/${game_id}`);
  };

  // Prevent context menu and handle right-click release
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        isDraggingRef.current = false;
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);
  const moveLeft = () => () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const moveRight = () => () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 1000, behavior: "smooth" });
  };
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !containerRef.current) return;
    e.preventDefault();
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = containerRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    e.preventDefault();
    const dx = e.clientX - startXRef.current * 1.5;
    containerRef.current.scrollLeft = scrollLeftRef.current - dx;
    setCannotClick(true);
  };
  const onMouseUp = () => {
    setTimeout(() => {
      setCannotClick(false);
    }, 300);
  };
  const topRated = [...games]
    .sort(
      (a, b) =>
        b.game_rating_combined / b.game_rating_users -
        a.game_rating_combined / a.game_rating_users
    )
    .slice(0, 3);
  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.carouselContainer}
        onContextMenu={(e) => e.preventDefault()}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <button className={styles.navLeft} onClick={moveLeft()}>{`<`}</button>
        {topRated.map((game) => (
          <div
            key={game.game_id}
            className={styles.carouselItem}
            onClick={() => goToGamePage(game.game_id)}
          >
            <div className={styles.gameCard}>
              <img src={game.game_main_img_url} alt={game.game_name} />
              <p>{game.game_name}</p>
            </div>
          </div>
        ))}
        <button className={styles.navRight} onClick={moveRight()}>{`>`}</button>
      </div>
    </div>
  );
};

export default CarouselGames;
