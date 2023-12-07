import KnightMovesTree from "./KnightMovesTree.mjs";

export default function knightMoves(startCoords, endCoords) {
  const kmt = new KnightMovesTree(startCoords);
  return kmt.getPathToPos(endCoords);
}
