import { player } from './player/player.js';
import { estimations } from './estimations.js';

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    player();
    estimations();
});