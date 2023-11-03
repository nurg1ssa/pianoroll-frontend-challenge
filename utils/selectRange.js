// Function to count note rectangles in the selected range
function countNoteRectanglesInRange(startX, endX) {
    resetNoteRectangleColors()
    const svg = document.querySelector('.piano-roll-svg');
    const noteRectangles = svg.querySelectorAll('.note-rectangle');
    let noteCount = 0;

    for (const noteRectangle of noteRectangles) {
          const rectBoundingBox = noteRectangle.getBoundingClientRect();
          const noteStartX = rectBoundingBox.left;
          const noteEndX = rectBoundingBox.right;

          // Check if the note-rectangle overlaps with the selected range
          if (noteStartX <= endX+32 && noteEndX >= startX+32) {
                noteRectangle.setAttribute('fill', 'red');
                noteCount++;
          }
    }

    return noteCount;
}

// Function to reset the colors to their original state
function resetNoteRectangleColors() {
    const svg = document.querySelector('.piano-roll-svg');
    const noteRectangles = svg.querySelectorAll('.note-rectangle');

    for (const noteRectangle of noteRectangles) {
          noteRectangle.setAttribute('fill', 'black');
    }
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
                      console.log(`Note count in the selected range: ${0}`);
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
                resetNoteRectangleColors()
          }
    }
    
    //Adding event listener when largeSvgContainer have been clicked
    largeSvgContainer.addEventListener('mousedown', (e) => {
          isSelecting = true;
          selectionStartX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
          updateSelection();

          function onMouseMove(e) {
                if (isSelecting) {
                      selectionEndX = e.clientX - largeSvgContainer.getBoundingClientRect().left;
                      updateSelection();
                }
          }

          function onMouseUp() {
                isSelecting = false;

                // Get the start and end points of the range
                const startX = Math.min(selectionStartX, selectionEndX);
                const endX = Math.max(selectionStartX, selectionEndX);

                // Call the function to count note rectangles in the selected range
                const noteCount = countNoteRectanglesInRange(startX, endX);
                console.log(`Note count in the selected range: ${noteCount}`);

                // Remove the 'mousemove' and 'mouseup' event listeners
                largeSvgContainer.removeEventListener('mousemove', onMouseMove);
                largeSvgContainer.removeEventListener('mouseup', onMouseUp);
          }

          largeSvgContainer.addEventListener('mousemove', onMouseMove);
          largeSvgContainer.addEventListener('mouseup', onMouseUp);
    });
}
