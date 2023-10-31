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

      // Update the CSS classes
      const mainContainer = document.querySelector('.main-container');
      const pianoRollContainer = document.getElementById('pianoRollContainer');
      const mainCard = document.querySelector('#main-card');
      const cardList = document.querySelector('.card-list');
      cardList.classList.add()
      mainCard.style.display = 'grid'
      pianoRollContainer.style.gridTemplateColumns = '1fr'
      cardList.style.height = '92vh'
      cardList.style.overflow = 'auto'

      //setting Main Card Page on small screeens
      function setGridColumns() {
            if (mainCard.style.display == 'grid') {
                  mainContainer.style.gridTemplateColumns = window.innerWidth <= 600 ? '1fr' : '3fr 1fr';
            }
      }
      window.addEventListener('resize', setGridColumns);
      // Initial setup
      setGridColumns();

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

      mainCard.style.display = 'none'
      mainContainer.style.gridTemplateColumns = '1fr'

      //setting Main Page on small screeens
      function setPianoRollGridColumns() {
            if (mainCard.style.display == 'none') {
                  pianoRollContainer.style.gridTemplateColumns = window.innerWidth <= 600 ? '1fr' : '1fr 1fr 1fr';
            }
      }

      window.addEventListener('resize', setPianoRollGridColumns);
      // Initial setup
      setPianoRollGridColumns()

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
                        resetButton.textContent = '';
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
            }
      }
}
