export function clearElement(element) {
      while (element.firstChild) {
            element.removeChild(element.firstChild);
      }
}

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
      const mainCard = document.querySelector('.main-card');
      const cardList = document.querySelector('.card-list');

      mainCard.style.padding = '20px'
      mainCard.style.height = '350px'

      cardList.style.height = '92vh'
      cardList.style.overflow = 'auto'


      largeSvgContainer.style.padding = '5px'

      cardDescription.style.padding = '5px'

      mainContainer.style.gridTemplateColumns = '3fr 1fr';
      mainContainer.style.gridColumnGap = '20px'

      pianoRollContainer.style.gridTemplateColumns = '1fr';

      return { largeSvgContainer, cardDescription }
}