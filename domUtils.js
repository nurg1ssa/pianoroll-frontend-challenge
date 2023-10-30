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

      mainCard.style.padding = '20px'
      mainCard.style.height = '350px'


      largeSvgContainer.style.padding = '5px'

      cardDescription.style.padding = '5px'

      //setting Main Card Page on small screeens
      if (window.innerWidth <= 600) {
            pianoRollContainer.style.gridTemplateColumns = '1fr';
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