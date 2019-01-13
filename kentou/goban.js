import * as U from "/kentou/utility.js";

//碁盤クラス
//碁盤の一場面を表す。 履歴などは持たない。
export default class Goban {
  
  constructor(options = {}) {
    //碁盤上の石の状態(1:黒 -1:白 0:空)を格納する二次元配列。
    //この二次元配列は直接操作せず、getStone() setStone()を利用しなくてはいけない。
    this._table = null;
    
    //碁盤の路数。reset()内以外では変更してはいけない。
    this._boardSize = 19;
    
    //黒と白どちらの手番か(1:黒 -1:白)
    this.turn = 1;
    
    //コウによって打てない位置 {x, y}。 ない場合は null。
    this._koPosition = null;
    
    //
    this._blackAgehama = 0;
    this._whiteAgehama = 0;
    
    
    
    this.reset(options);
  }
  
  //==========================================================================================
  //
  static get defaultOptions() {
    return {
      boardSize: 19
    };
  }
  
  //
  // static allocateTable(size, initValue) {
  //   const tbl = new Array(size);
  //   for(let i = 0; i < size; i++) {
  //     tbl[i] = new Array(size);
  //     tbl[i].fill(initValue);
  //   }
  //   return tbl;
  // }
  

  //==========================================================================================
  //碁盤の路数
  get boardSize() {
    return this._boardSize;
  }
  
  //どちらの手番か(1:黒番 -1:白番)
  get turn() {
    return this._turn;
  }
  
  set turn(value) {
    return this._turn = value;
  }
  
  //コウの位置(コウがない場合はnull)
  get koPosition() {
    return this._koPosition;
  }
  
  set koPosition(value) {
    this._koPosition = value;
  }
  
  //==========================================================================================
  //石の状態(1:黒 -1:白 0:空)を取得。
  getStone(x, y) {
    if(!this.isValidIndex(x, y)) throw new Error("座標の範囲は 0 ～ (boardSize - 1) で指定してください。");
    
    return this._table[x][y];
  }
  
  //石の状態(1:黒 -1:白 0:空)を設定。
  setStone(x, y, stone) {
    if(!this.isValidIndex(x, y)) throw new Error("座標の範囲は 0 ～ (boardSize - 1) で指定してください。");
    
    this._table[x][y] = stone;
  }
  
  //SGFNodeリストを読み込む。
  readSGFNodes(nodes) {
    const root = nodes.shift();
    
    
  }
  
  //碁盤をリセットする。
  reset(options = {}) {
    const mergeOptions = Object.assign(Goban.defaultOptions, options);
    
    this._boardSize = mergeOptions.boardSize;
    this._table = U.allocateTable(this.boardSize, 0);
  }
  
  //石を置く。
  add(x, y, stone) {
    if(!this.isValidIndex(x, y)) {
      return;
    }
    
    this.setStone(x, y, stone);
  }
  
  //石を着手する。
  move(x, y) {
    if(!this.canMoved(x, y)) {
      return;
    }
    
    const capturedStones = this._findCapturedPositions(x, y, this.turn);
    
    if(this._isKo(x, y, this.turn)) {
      this.koPosition = capturedStones[0];
    } else {
      this.koPosition = null;
    }
    
    //実際の盤に反映。
    this.setStone(x, y, this.turn);
    capturedStones.forEach((capturedStone) => {
      this.setStone(capturedStone.x, capturedStone.y, 0);
    });
    
    this.turn *= -1;
  }
  
  //着手可能か
  canMoved(x, y) {
    if(!this.isValidIndex(x, y)) {
      return false;
    }
    
    if(this.getStone(x, y) != 0) {
      return false;  
    }
    
    if(this._isSuicide(x, y, this.turn)) {
      return false;
    }
    
    if(this.koPosition && this.koPosition.x == x && this.koPosition.y == y) {
      return false;
    }
    
    return true;
  }
  
  //碁盤を複製する。
  clone() {
    const goban = new Goban();
    goban.reset(this.boardSize);
    
    for(let y = 0; y < this.boardSize; y++) {
      for(let x = 0; x < this.boardSize; x++) {
        goban.setStone(x, y, this.getStone(x, y));
      }
    }
    
    return goban;
  }
  
  //他の碁盤の状態を代入する。
  assign(goban) {
    this.reset({boardSize: goban.boardSize});
    
    for(let y = 0; y < this.boardSize; y++) {
      for(let x = 0; x < this.boardSize; x++) {
        this.setStone(x, y, goban.getStone(x, y));
      }  
    }
    
    this.turn = goban.turn;
    this.koPosition = goban.koPosition;
  }
  
  //他の碁盤と石の配置が同じか
  isEqualTable(goban) {
    if(!(goban instanceof Goban)) {
      return false;
    }
    
    if(this.boardSize != goban.boardSize) {
      return false;
    }
    
    for(let y = 0; y < this.boardSize; y++) {
      for(let x = 0; x < this.boardSize; x++) {
        if( this.getStone(x, y) != goban.getStone(x, y) ) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  //有効な座標か否か。
  isValidIndex(x, y) {
    return 0 <= x && x < this.boardSize && 0 <= y && y < this.boardSize;
  }

  //デバッグ用のテキスト碁盤を取得する。
  toDebugText() {
    var text = "";
    var charList = {"0": "┼ ", "1": "● ", "-1": "○ "};
    
    text += "  ";
    for(let x = 0; x < this.boardSize; x++) {
      text += `${x % 10} `; 
    }
    text += "\n";
    
    for(let y = 0; y < this.boardSize; y++) {
      text += `${y % 10} `;
      
      for(let x = 0; x < this.boardSize; x++) {
        text += charList[ this.getStone(x, y) ];
      } 
      text += "\n";
    }
    
    return text;
  }
  
  _isKo(x, y, stone) {
    //着手した石の四方に同色の石があればコウではない。
    let friendExists = false;
    this._around(x, y, (offset) => {
      friendExists |= this.getStone(offset.x, offset.y) == stone;
    });
    
    if(friendExists) {
      return false;
    }
    
    //
    const capturedStones = this._findCapturedPositions(x, y, stone);
    if(capturedStones.length != 1){
      return false;
    }
    
    const tmpBan = this.clone(), capturedStone = capturedStones[0];
    tmpBan.setStone(capturedStone.x, capturedStone.y, 0);
    tmpBan.setStone(x, y, stone);
    const returnedStones = tmpBan._findCapturedPositions(capturedStone.x, capturedStone.y, stone * -1);
    if(returnedStones.length == 1 && returnedStones[0].x == x && returnedStones[0].y == y) {
      return true;
    }
    
    return false;
  }
  
  //着手した際に取れる石の位置を取得する。
  _findCapturedPositions(x, y, stone) {
    if(this.getStone(x, y) != 0) throw new Error("石が置かれていない位置を指定してください。");
    
    const tmpBan = this.clone(), allCapturedStones = [];
    tmpBan.setStone(x, y, stone);
    this._around(x, y, (offset) => {
      if(this.getStone(offset.x, offset.y) != (stone * -1)) {
        return;
      }
      
      if(!tmpBan._isOccupied(offset.x, offset.y)) {
        return;
      }
      
      const capturedStones = this._findChainPositions(offset.x, offset.y);
      capturedStones.forEach((capturedStone) => {
        tmpBan.setStone(capturedStone.x, capturedStone.y, 0);
      });
      
      allCapturedStones.push(...capturedStones);
    });
    
    return allCapturedStones;
  }
  
  //指定した位置が自殺点であるか否か
  _isSuicide(x, y, stone) {
    if(this.getStone(x, y) != 0) throw new Error("石が置かれていない位置を指定してください。");
    
    const tmpGoban = this.clone();
    tmpGoban.setStone(x, y, stone);
    
    if( !tmpGoban._isOccupied(x, y) ) {
      return false;
    }
    
    let isCaptured = false;
    this._around(x, y, (offset) => {
      isCaptured |= (tmpGoban.getStone(offset.x, offset.y) != stone) && tmpGoban._isOccupied(offset.x, offset.y);
    });
    
    if(isCaptured) {
      return false;
    }
    
    return true;
  }

  //指定した位置の石が取られているか否か。
  _isOccupied(x, y) {
    if(this.getStone(x, y) == 0) return false;
    
    const targetColor = this.getStone(x, y);
    const connectedPositions = this._findChainPositions(x, y);
    const touchPositions = this._findTouchPositions(connectedPositions);
    
    let result = true;
    touchPositions.forEach((pos) => {
       result &= this.getStone(pos.x, pos.y) == (targetColor * -1);
    });
    
    return !!result;
  }
  
  //つながっている点の配列を取得する。
  _findChainPositions(x, y) {
    const targetColor = this.getStone(x, y);
    const list = [];
    this._spread(x, y, (pos) => {
      if(this.getStone(pos.x, pos.y) == targetColor) {
        list.push({x: pos.x, y: pos.y});
        return true;
      }
      
      return false;
    });
    
    return list;
  }
  
  //指定した点に触れている点の配列を取得する。
  _findTouchPositions(positions) {
    const list = [];
    const checkTbl = U.allocateTable(this.boardSize, false);
    
    positions.forEach((position) => {
      checkTbl[position.x][position.y] = true;
    });
    
    positions.forEach((position) => {
      this._around(position.x, position.y, (offset) => {
        if(!this.isValidIndex(offset.x, offset.y) || checkTbl[offset.x][offset.y]) {
          return;
        }
        
        checkTbl[offset.x][offset.y] = true;
        list.push({x: offset.x, y: offset.y});
      });
    });
    
    return list;
  }
  
  //指定した位置から再帰的に処理を行う。
  //callback: bool function({x, y}) 
  //戻り値 ture:処理続行 false:処理中止
  _spread(x, y, callback) {
    const checkTbl = U.allocateTable(this.boardSize, false);
    const stack = [];
    let cp = {x: x, y: y};
    
    while(cp) {
      if(!this.isValidIndex(cp.x, cp.y) || checkTbl[cp.x][cp.y]) {
        cp = stack.pop();
        continue;
      }
      
      checkTbl[cp.x][cp.y] = true;
      if( !callback({x: cp.x, y: cp.y}) ) {
        cp = stack.pop();
        continue;
      }
      
      this._around(cp.x, cp.y, (offset) => { stack.push({x: offset.x, y: offset.y}); });
      
      cp = stack.pop();
    } 
    
  }
  
  //指定した位置の上下左右の位置の処理を行う。
  //callback: void function({x, y})
  _around(x, y, callback) {
    const offsets = [{x:-1, y:0}, {x:0, y:+1}, {x:1, y:0}, {x:0, y:-1}];
    
    offsets.forEach((offset) => {
      const x_ = x + offset.x, y_ = y + offset.y;
      if(!this.isValidIndex(x_, y_)) return;
      
      callback({ x: x_, y: y_ });
    });
  }
}