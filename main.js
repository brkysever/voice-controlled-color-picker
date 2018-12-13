class ColorPicker {
  constructor() {
    this.body = document.querySelector('body');
    this.showColorPicked = document.querySelector('.color__picker__hi');
    this.colors = { red: 0, green: 0, blue: 0 };
    this.firstCall = true;
  }

  _getHex(rgb) {
    // https://jsfiddle.net/Mottie/xcqpF/1/light/
    const color = rgb.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    );
    this.showColorPicked.textContent =
      color && color.length === 4
        ? `#${`0${parseInt(color[1], 10).toString(16)}`.slice(
            -2
          )}${`0${parseInt(color[2], 10).toString(16)}`.slice(
            -2
          )}${`0${parseInt(color[3], 10).toString(16)}`.slice(
            -2
          )}`.toUpperCase()
        : '';
  }

  _colorsToRgba() {
    return `rgb(${this.colors.red}, ${this.colors.green}, ${this.colors.blue})`;
  }

  color({ color, aLittle = false, less = false, reset = false }) {
    if (this.firstCall || reset) {
      Object.keys(this.color).forEach(
        resetColor => (this.color[resetColor] = 0)
      );
      this.colors[color] = 255;
      this.firstCall = false;
    } else if (aLittle) {
      !less ? (this.colors[color] += 30) : (this.colors[color] -= 30);
    } else {
      !less ? (this.colors[color] += 120) : (this.colors[color] -= 120);
    }
    const rgb = this._colorsToRgba();
    this.setColor(rgb);
  }

  showError(command) {
    this.showColorPicked.textContent = `Didn't quite catch it. Did you say "${command}"? Could you repeat, please?`;
  }

  setColor(color) {
    this.body.style.backgroundColor = color;
    this._getHex(color);
  }
}
const pickColor = new ColorPicker();

function voiceControlledColorPicker(e) {
  const command = e.results[0][0].transcript;
  if (
    (command.includes('more') && command.includes('red')) ||
    (command.includes('more') && command.includes('blue')) ||
    (command.includes('more') && command.includes('green')) ||
    command.includes('morbleu') ||
    (command.includes('less') && command.includes('red')) ||
    (command.includes('less') && command.includes('blue')) ||
    (command.includes('less') && command.includes('green')) ||
    (command.includes("let's") && command.includes('red')) ||
    (command.includes("let's") && command.includes('blue')) ||
    (command.includes("let's") && command.includes('green')) ||
    (command.includes('bless') && command.includes('red')) ||
    (command.includes('bless') && command.includes('blue')) ||
    (command.includes('bless') && command.includes('green')) ||
    (command.includes('reset') && command.includes('red')) ||
    (command.includes('reset') && command.includes('blue')) ||
    (command.includes('reset') && command.includes('green')) ||
    (command.includes('resets') && command.includes('red')) ||
    (command.includes('resets') && command.includes('blue')) ||
    (command.includes('resets') && command.includes('green'))
  ) {
    const commandWords = command.includes('morbleu')
      ? ['more', 'blue']
      : command.split(' ');
    const color = commandWords[commandWords.length - 1];
    if (
      command.includes('less') ||
      command.includes("let's") ||
      command.includes('bless')
    ) {
      if (commandWords.length > 2) {
        pickColor.color({ color, less: true, aLittle: true });
      } else {
        pickColor.color({ color, less: true });
      }
    } else if (command.includes('reset') || command.includes('resets')) {
      pickColor.color({ color, reset: true });
    } else if (commandWords.length > 2) {
      pickColor.color({ color, aLittle: true });
    } else {
      pickColor.color({ color });
    }
  } else {
    pickColor.showError(command);
  }
}
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-GB';

recognition.addEventListener('result', voiceControlledColorPicker);
recognition.addEventListener('end', recognition.start);

recognition.start();

const button = document.querySelector('.toggleIntroductions');
const intro = document.querySelector('.colorPicker__introduction');
button.addEventListener('click', () => {
  intro.classList.toggle('isShown');
});
