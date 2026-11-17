import { IoGameControllerOutline, IoPlay } from 'react-icons/io5';
import { GAME_PORTFOLIO_URL } from '@/lib/constants';

// Same screenshot as the NazTank project card, so there's one image to swap.
const gameScreenshot = '/assets/projects/naztank-1.jpg';

// Hero "screen" that invites visitors to play the 3D game version of this
// portfolio. Lives in the hero's empty side space (not as the background) so
// the professional first impression and text contrast stay intact.
const GamePreview = () => (
   <a
      className="game_preview"
      href={GAME_PORTFOLIO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Play Nazrul's portfolio as a game (opens in a new tab)"
   >
      <div className="game_preview_screen">
         <img src={gameScreenshot} alt="" className="game_preview_img" />
         <span className="game_preview_play" aria-hidden="true">
            <IoPlay />
         </span>
      </div>

      <div className="game_preview_caption">
         <IoGameControllerOutline className="game_preview_icon" aria-hidden="true" />
         <span>
            <strong>Click to play</strong>
            <small>Nazrul&apos;s portfolio, just for fun</small>
         </span>
      </div>
   </a>
);

export default GamePreview;
