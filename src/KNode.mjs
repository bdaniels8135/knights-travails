export default class KNode {
  #pos;

  #children;

  constructor(pos) {
    this.#pos = pos;
    this.#children = new Set();
  }

  get pos() {
    return this.#pos;
  }

  get children() {
    return [...this.#children];
  }

  addChild(kNode) {
    this.#children.add(kNode);
  }
}
