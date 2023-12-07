import KNode from "./KNode.mjs";

export default class KnightMovesTree {
  #root;

  constructor([startX, startY]) {
    const startPos = startX + 8 * startY;
    this.#root = KnightMovesTree.#buildTree(startPos);
  }

  static #getChildPositions(pos) {
    const xCoord = pos % 8;
    const yCoord = Math.floor(pos / 8);
    const possibleMoveVectors = [
      [-2, -1],
      [-2, 1],
      [2, -1],
      [2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
    ];
    const possibleMoveCoords = possibleMoveVectors.map(([xDiff, yDiff]) => [
      xCoord + xDiff,
      yCoord + yDiff,
    ]);
    const legalMoveCoords = possibleMoveCoords.filter(
      ([x, y]) => x >= 0 && x <= 7 && y >= 0 && y <= 7
    );
    const legalMovePositions = legalMoveCoords.map(([x, y]) => x + 8 * y);
    return legalMovePositions;
  }

  static #buildTree(startPos) {
    const root = new KNode(startPos);
    const q = [root];
    const visitedPositions = [startPos];
    while (q.length > 0) {
      const nodeToProcess = q.shift();
      const childPositions = KnightMovesTree.#getChildPositions(
        nodeToProcess.pos
      );
      childPositions.forEach((pos) => {
        if (!visitedPositions.includes(pos)) {
          const newKNode = new KNode(pos);
          nodeToProcess.addChild(newKNode);
          q.push(newKNode);
          visitedPositions.push(pos);
        }
      });
    }
    return root;
  }

  #getPositionsPathToPos(endPos, startNode = this.#root) {
    if (startNode.pos === endPos) return [startNode.pos];
    if (startNode.children.length === 0) return null;
    let path;
    startNode.children.find((childNode) => {
      path = this.#getPositionsPathToPos(endPos, childNode);
      if (path != null) {
        path.unshift(startNode.pos);
        return true;
      }
      return false;
    }, this);
    return path;
  }

  getPathToPos([endX, endY]) {
    const endPos = endX + 8 * endY;
    const positionsPath = this.#getPositionsPathToPos(endPos);
    const coordinatesPath = positionsPath.map((pos) => [
      pos % 8,
      Math.floor(pos / 8),
    ]);
    return coordinatesPath;
  }
}
