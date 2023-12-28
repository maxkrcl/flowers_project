// изображение для перемещения
const flower = document.querySelector('.flower');

// все вложенные div
const cells = document.querySelectorAll('.flowers div');

// мышка нажата?
let isMousePressed = false;
let flowerX, flowerY;


// функция вернёт true, если flowerRect коснётся DOMRect
function isTouch(DOMRect) {
    const flowerRect = flower.getBoundingClientRect();
    const x = flowerRect.x + (flowerRect.width / 2);
    const y = flowerRect.y + (flowerRect.height / 2);
    if (x > DOMRect.left && x < DOMRect.right && y < DOMRect.bottom && y > DOMRect.top) {
        return true;
    }
    return false;
}


flower.addEventListener('touchstart', (event) => {
  isMousePressed = true;
  flowerX = event.touches[0].pageX - flower.offsetLeft;
  flowerY = event.touches[0].pageY - flower.offsetTop;
});

document.addEventListener('touchmove', (event) => {
  if (isMousePressed) {
      flower.style.left = event.touches[0].pageX - flowerX + 'px';
      flower.style.top = event.touches[0].pageY - flowerY + 'px';

      cells.forEach(cell => {
          const cellRect = cell.getBoundingClientRect();
          if (isTouch(cellRect)) {
              cell.style.backgroundColor = '#601060';
          } else {
              cell.style.backgroundColor = '#ffffff';
          }
      });
  }
});

flower.addEventListener('touchend', () => {
  isMousePressed = false;

  cells.forEach(cell => {
      const cellRect = cell.getBoundingClientRect();
      if (isTouch(cellRect)) {
          flower.style.position = 'static';
          cell.appendChild(flower);
          cell.querySelector('.close-icon').style.visibility = 'visible';
      }
  });
});
