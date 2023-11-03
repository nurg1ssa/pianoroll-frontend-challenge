import PianoRoll from './pianoroll.js';
import { clearElement, createMainCard, revertMainPage } from './utils/domUtils.js';
import { attachSelectionListeners } from './utils/selectRange.js';


class PianoRollDisplay {
  constructor(csvURL) {
    this.csvURL = csvURL;
    this.data = null;
  }

  async loadPianoRollData() {
    try {
      const response = await fetch('https://pianoroll.ai/random_notes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  preparePianoRollCard(rollId) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('piano-roll-card');

    // Create and append other elements to the card container as needed
    const descriptionDiv = document.createElement('div');
    descriptionDiv.textContent = `This is a piano roll number ${rollId + 1}`;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('piano-roll-svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '150');

    // Append the SVG to the card container
    cardDiv.appendChild(svg);
    cardDiv.appendChild(descriptionDiv);

    //setting clicked card as main
    cardDiv.addEventListener('click', () => {
      createMainCard(svg, descriptionDiv);
      attachSelectionListeners();
    });

    return { cardDiv, svg };
  }

  async generateSVGs() {
    if (!this.data) await this.loadPianoRollData();
    if (!this.data) return;

    const pianoRollContainer = document.getElementById('pianoRollContainer');
    clearElement(pianoRollContainer);
    for (let it = 0; it < 20; it++) {
      const start = it * 60;
      const end = start + 60;
      const partData = this.data.slice(start, end);

      const { cardDiv, svg } = this.preparePianoRollCard(it);

      pianoRollContainer.appendChild(cardDiv);
      const roll = new PianoRoll(svg, partData);
    }
  }
}
// card list downloads when web page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const csvToSVG = new PianoRollDisplay();
  await csvToSVG.generateSVGs();

  //returning to main page when click Logo
  const logo = document.querySelector('.logo-container');
  logo.addEventListener('click', () => {
    revertMainPage();
  });
});
