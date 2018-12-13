class ColorPicker {
	constructor() {
		this.body = document.querySelector('body');
		this.showColorPicked = document.querySelector('.color__picker__hi');
		this.colors = { red: 0, green: 0, blue: 0 };
		this.firstCall = true;
	}

	_setColor(color) {
		this.body.style.backgroundColor = color;
		this._getHex(color);
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
				  )}${`0${parseInt(color[3], 10).toString(16)}`.slice(-2)}`
				: '';
	}

	_colorsToRgba() {
		return `rgb(${this.colors.red}, ${this.colors.green}, ${this.colors.blue})`;
	}

	moreColor(color, aLittle = false, less = false) {
		if (this.firstCall) {
			this.colors[color] = 255;
			this.firstCall = false;
		} else if (aLittle) {
			!less ? (this.colors[color] += 30) : (this.colors[color] -= 30);
		} else {
			!less ? (this.colors[color] += 120) : (this.colors[color] -= 120);
		}
		const rgb = this._colorsToRgba();
		this._setColor(rgb);
	}
}

const voiceColor = new ColorPicker();
