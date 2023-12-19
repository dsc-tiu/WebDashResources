document.addEventListener('DOMContentLoaded', function () {
  initializeGame();
});

function initializeGame() {
  generateRandomColor();
  updateGuessColor();
}

function generateRandomColor() {
  var targetRed = Math.floor(Math.random() * 256);
  var targetGreen = Math.floor(Math.random() * 256);
  var targetBlue = Math.floor(Math.random() * 256);

  updateColorBox('target-color-box', targetRed, targetGreen, targetBlue);
  resetGuess();
}

function updateColorBox(boxId, red, green, blue) {
  var colorBox = document.getElementById(boxId);
  colorBox.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function updateGuessColor() {
  var redSlider = document.getElementById('red');
  var greenSlider = document.getElementById('green');
  var blueSlider = document.getElementById('blue');

  redSlider.addEventListener('input', function () {
    updateColorPreview();
  });

  greenSlider.addEventListener('input', function () {
    updateColorPreview();
  });

  blueSlider.addEventListener('input', function () {
    updateColorPreview();
  });
}

function updateColorPreview() {
  var userRed = parseInt(document.getElementById('red').value);
  var userGreen = parseInt(document.getElementById('green').value);
  var userBlue = parseInt(document.getElementById('blue').value);

  updateColorBox('guess-color-box', userRed, userGreen, userBlue);

  var userColorHex = rgbToHex(userRed, userGreen, userBlue);
  document.getElementById('user-color-hex').textContent = userColorHex;
}

function checkGuess() {
  var userRed = parseInt(document.getElementById('red').value);
  var userGreen = parseInt(document.getElementById('green').value);
  var userBlue = parseInt(document.getElementById('blue').value);

  var colorBox = document.getElementById('target-color-box');
  var color = getComputedStyle(colorBox).backgroundColor;
  color = color
    .substring(4, color.length - 1)
    .replace(/ /g, '')
    .split(',');

  var targetRed = parseInt(color[0]);
  var targetGreen = parseInt(color[1]);
  var targetBlue = parseInt(color[2]);

  var diff = Math.sqrt(
    Math.pow(userRed - targetRed, 2) + Math.pow(userGreen - targetGreen, 2) + Math.pow(userBlue - targetBlue, 2)
  );

  var resultElement = document.getElementById('result');
  if (Math.round(diff) === 0) {
    resultElement.innerHTML = `<span style="color:green;">Your guess is <b>Perfect!</b></span>`;
  } else if (Math.round(diff) <= 25) {
    resultElement.innerHTML =
      'Your guess is almost Perfect!<br />' +
      'You are about<span id="unitsg">&nbsp;' +
      Math.round(diff) +
      '&nbsp;</span>  units away from the correct color.';
  } else {
    resultElement.innerHTML =
      'Your guess is <span id="unitsr">&nbsp;' + Math.round(diff) + '&nbsp;</span> units away from the correct color.';
  }
}

function resetGuess() {
  document.getElementById('red').value = 0;
  document.getElementById('green').value = 0;
  document.getElementById('blue').value = 0;
  updateColorPreview();
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}
