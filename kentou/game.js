import Goban from "/kentou/goban.js";
import { SGFNode, SGFProperty } from "/kentou/sgf-node.js";


export default class Game {
  constructor(options) {
    
    this._rootNode = new SGFNode();
    this._currentNode = this._rootNode;
  }
  
  static get defaultOptions() {
    return {
      boardSize: 19,
      playingDate: "",
      blackTeamName: "",
      blackPlayerName: "",
      blackPlayerRank: "",
    };
  }
  
  reset(options) {
  
  }
  
  move() {
    
  }
  
  addStone() {
  
  }
  
  
}