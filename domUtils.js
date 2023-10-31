export function clearElement(element) {
      while (element.firstChild) {
            element.removeChild(element.firstChild);
      }
}

//creating Main Card
export function createMainCard(svg, descriptionDiv) {
      const largeSvgContainer = document.getElementById('large-svg-container');
      const cardDescription = document.getElementById('card-description');
      clearElement(largeSvgContainer);
      clearElement(cardDescription);

      // Clone and append the clicked Card to the picked card.
      const pickedCardSvg = svg.cloneNode(true);
      pickedCardSvg.setAttribute('height', '250');
      const pickedCardDescription = descriptionDiv.cloneNode(true);
      largeSvgContainer.appendChild(pickedCardSvg);
      cardDescription.appendChild(pickedCardDescription);
      cardDescription

      // Update the CSS classes
      const mainContainer = document.querySelector('.main-container');
      const pianoRollContainer = document.getElementById('pianoRollContainer');
      const mainCard = document.querySelector('#main-card');
      const cardList = document.querySelector('.card-list');

      mainCard.style.padding = '20px'
      mainCard.style.height = '350px'


      largeSvgContainer.style.padding = '5px'

      cardDescription.style.padding = '5px'

      pianoRollContainer.style.gridTemplateColumns = '1fr';

      //setting Main Card Page on small screeens
      if (window.innerWidth <= 600) {
            mainContainer.style.gridRowGap = '20px'
            cardList.style.height = '40vh'

      } else {
            mainContainer.style.gridTemplateColumns = '3fr 1fr';
            mainContainer.style.gridColumnGap = '20px'
            cardList.style.height = '92vh'
      }

      cardList.style.overflow = 'auto'

      pianoRollContainer.style.gridTemplateColumns = '1fr';

      return { largeSvgContainer, cardDescription }
}

//Returning all as it was
export function revertMainPage() {

      const largeSvgContainer = document.getElementById('large-svg-container');
      const cardDescription = document.getElementById('card-description');
      const mainCard = document.querySelector('#main-card');
      const cardList = document.querySelector('.card-list');
      const pianoRollContainer = document.getElementById('pianoRollContainer');
      const mainContainer = document.querySelector('.main-container');

      largeSvgContainer.style.removeProperty('padding')
      cardDescription.style.removeProperty('padding')

      clearElement(largeSvgContainer);
      clearElement(cardDescription);

      mainCard.style.height = '0px'
      mainCard.style.padding = '0px'

      mainContainer.style.gridTemplateColumns = '1fr';
      mainContainer.style.gridColumnGap = '0px'

      //setting Main Page on small screens
      if (window.innerWidth <= 600) {
            pianoRollContainer.style.gridTemplateColumns = '1fr';
      } else {
            pianoRollContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
      }

      cardList.style.removeProperty('height');
      cardList.style.removeProperty('overflow');
}


export function attachSelectionListeners() {
      let isSelecting = false;
      let selectionStartX = 0;
      let selectionEndX = 0;
      let selectedRange;

      const largeSvgContainer = document.getElementById('large-svg-container');
      const cardDescription = document.getElementById('card-description');

      // Create "Start Point" and "End Point" elements
      const rangeContainer = document.createElement('div');
      const startPointLabel = document.createElement('div');
      startPointLabel.textContent = 'Start Point: ';
      const startPointSpan = document.createElement('span');
      startPointLabel.appendChild(startPointSpan);

      const endPointLabel = document.createElement('div');
      endPointLabel.textContent = 'End Point: ';
      const endPointSpan = document.createElement('span');
      endPointLabel.appendChild(endPointSpan);
      rangeContainer.classList.add('range-container')
      // Append the labels to cardDescription
      rangeContainer.appendChild(startPointLabel);
      rangeContainer.appendChild(endPointLabel);
      cardDescription.appendChild(rangeContainer);


      largeSvgContainer.addEventListener('mousedown', (e) => {
            isSelecting = true;
            selectionStartX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
            updateSelection();
      });

      largeSvgContainer.addEventListener('mousemove', (e) => {
            if (isSelecting) {
                  selectionEndX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
                  updateSelection();
            }
      });

      largeSvgContainer.addEventListener('mouseup', () => {
            isSelecting = false;
      });

      function updateSelection() {
            const startX = Math.min(selectionStartX, selectionEndX);
            const endX = Math.max(selectionStartX, selectionEndX);

            if (!selectedRange) {
                  const rect = document.createElement('div');
                  rect.classList.add('selected-range');
                  largeSvgContainer.appendChild(rect);
                  selectedRange = rect;

                  // Create a reset button
                  const resetButton = document.createElement('div');
                  resetButton.textContent = 'click to reset';
                  rect.addEventListener('click', () => {
                        resetSelection();
                  });

                  // Append the reset button inside the selected range
                  selectedRange.appendChild(resetButton);
            }

            selectedRange.style.left = startX + 'px';
            selectedRange.style.width = endX - startX + 'px';

            // Update the start and end points
            startPointSpan.textContent = `${startX}px`;
            endPointSpan.textContent = `${endX}px`;
      }

      function resetSelection() {
            // Reset the selection by removing the selected range
            if (selectedRange) {
                  largeSvgContainer.removeChild(selectedRange);
                  selectedRange = null;
                  startPointSpan.textContent = ''; // Clear the start point text
                  endPointSpan.textContent = ''; // Clear the end point text
                  resetButton.textContent = '';
            }
      }

}
