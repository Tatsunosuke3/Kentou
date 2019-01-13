//import Goban from "/kentou/goban.js";
import * as U from "/kentou/utility.js";

export default class GobanElement extends HTMLElement {
  constructor() {
    super();
    
    this.attachShadow({mode: 'open'}); 
    this.shadowRoot.appendChild(this._createStyleElement());
    this.svg = this._createSVGElement();
    this.shadowRoot.appendChild(this.svg);
    
    this.reset();
  }
  
  //=============================================================================================================
  get gameId() {
    return this.getAttribute('game-id');
  }
  
  //碁盤の路数を取得
  get boardSize() {
    return Number( this.getAttribute('board-size') || 19 );
  }
  
  //SVG座標上でのグリッド幅
  get gridSize() {
    return 32;
  }
  
  //SVG座標上でのグリッド幅の半分
  get gridHalf() {
    return this.gridSize / 2;
  }
  
  //
  get stoneSize() {
    return this.gridSize - 1;
  }
  
  //svg要素の全幅
  get svgSize() {
    return this.boardSize * this.gridSize;
  }
  
  //=============================================================================================================
  //碁盤をリセットする。
  reset() {  
    this.table = U.allocateTable(this.boardSize, 0);
    this.stoneElementTable = U.allocateTable(this.boardSize, undefined);
    
    //SVG要素の子要素をすべて削除
    let child;
    while (child = this.svg.lastChild) this.svg.removeChild(child);
    
    //SVG要素のサイズを更新
    this.svg.setAttribute("viewBox", `0 0 ${this.svgSize} ${this.svgSize}`);
    
    
    this.svg.appendChild(this._createBoardElement());
    this.svg.appendChild(this._createLinesElement());
    this.svg.appendChild(this._createStonesElement());
    this.svg.appendChild(this._createDetectionPanelsElement());
  }
  
  setStone(x, y, stone) {
    
  }
  
  changeBoard(rootNode, currentNode, goban) {
    const obj = {
      rootNode: null, 
      currentNode: null,
      goban: null,
      addedNode: null,
      removedNode: null,
    };
  }
  
  //=============================================================================================================
  //スタイルエレメントを生成する。
  _createStyleElement() {
    const style = document.createElement("style");
    style.innerHTML = 
      ':host { display:block; max-width:1216px; max-height:1216px; }\n' +
      'svg { display:block; }\n' +
      '#board { fill:#ffe1a2; }\n' + 
      '#stones > .stone-none { fill:none; }\n' + 
      '#stones > .stone-black { fill:#000; }\n' +
      '#stones > .stone-white { fill:#fff; }\n' +
      '#lines { stroke:#000; }\n';
    
    return style;
  }
  
  //SVGエレメントを生成する。
  _createSVGElement() {
    const svg = document.createElementNS(U.SVG_XMLNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${this.svgSize} ${this.svgSize}`);
    
    return svg;
  }
  
  //碁盤背景レイヤーのエレメントを生成する。
  _createBoardElement() {
    const board = document.createElementNS(U.SVG_XMLNS, "g");
    board.setAttribute("id", "board");
    
    const rect = document.createElementNS(U.SVG_XMLNS, "rect");
    rect.setAttribute("x", 0);
    rect.setAttribute("y", 0);
    rect.setAttribute("width", this.svgSize);
    rect.setAttribute("height", this.svgSize);
    board.appendChild(rect);
    
    return board;
  }
  
  //線レイヤーのエレメントを生成する。
  _createLinesElement() {
    const lines = document.createElementNS(U.SVG_XMLNS, "g");
    lines.setAttribute("id", "lines");
    for(let i = 0; i < this.boardSize; i++) {
      const hLine = document.createElementNS(U.SVG_XMLNS, "line");
      hLine.setAttribute("x1", this.gridHalf);
      hLine.setAttribute("y1", this.gridSize * i + this.gridHalf);
      hLine.setAttribute("x2", this.svgSize - this.gridHalf);
      hLine.setAttribute("y2", this.gridSize * i + this.gridHalf);
      lines.appendChild(hLine);
      
      const vLine = document.createElementNS(U.SVG_XMLNS, "line");
      vLine.setAttribute("x1", this.gridSize * i + this.gridHalf);
      vLine.setAttribute("y1", this.gridHalf);
      vLine.setAttribute("x2", this.gridSize * i + this.gridHalf);
      vLine.setAttribute("y2", this.svgSize - this.gridHalf);
      lines.appendChild(vLine);
    }
    
    return lines;
  }
  
  //石レイヤーのエレメントを生成する。
  _createStonesElement() {
    const stones = document.createElementNS(U.SVG_XMLNS, "g");
    stones.setAttribute("id", "stones");
    
    for(let y = 0; y < this.boardSize; y++) {
      for(let x = 0; x < this.boardSize; x++) {
        const circle = document.createElementNS(U.SVG_XMLNS, "circle");
        circle.setAttribute("cx", this.gridSize * x + this.gridHalf);
        circle.setAttribute("cy", this.gridSize * y + this.gridHalf);
        circle.setAttribute("r", this.stoneSize / 2);
        circle.classList.add("stone-none");
        
        stones.appendChild(circle);
        this.stoneElementTable[x][y] = circle;
      }
    }
    
    return stones;
  }
  
  //当たり判定レイヤーのエレメントを生成する。
  _createDetectionPanelsElement() {
    const detectionPanels = document.createElementNS(U.SVG_XMLNS, "g");
    detectionPanels.setAttribute("id", "detection-panels");
    for(let y = 0; y < this.boardSize; y++) {
      for(let x = 0; x < this.boardSize; x++) {
        const chip = document.createElementNS(U.SVG_XMLNS, "rect");
        chip.setAttribute("x", this.gridSize * x);
        chip.setAttribute("y", this.gridSize * y);
        chip.setAttribute("width", this.gridSize);
        chip.setAttribute("height", this.gridSize);
        chip.setAttribute("fill-opacity", 0);
        chip.dataset.x = x;
        chip.dataset.y = y;
        
        // chip.addEventListener("click", (e) => {
        //   this.goban.move(Number(e.target.dataset.x), Number(e.target.dataset.y));
        // });
        
        detectionPanels.appendChild(chip);
      }
    }
    
    return detectionPanels;
  }
}
customElements.define("knt-goban", GobanElement);