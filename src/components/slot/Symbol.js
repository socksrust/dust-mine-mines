const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;
    console.log('name', name);
    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = `/images/${name}.png`;

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "slot-degen",
      "slot-degods",
      "slot-gecko",
      "slot-noiaducks",
      "slot-octo",
      "slot-sdb",
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}