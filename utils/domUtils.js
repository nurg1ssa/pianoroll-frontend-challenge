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
