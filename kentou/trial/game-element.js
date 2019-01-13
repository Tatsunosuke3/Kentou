import Goban from "/kentou/goban.js";
import { SGFNode, SGFProperty } from "/kentou/sgf-node.js";


export default class GameElement extends HTMLElement {
  constructor() {
    super();
    
    this._sgfRootNode = null;
    this._goban = null;
  }
  
  //=================================================================================
  //現在のノード
  get currentNode() {
    return ;
  }
  
  //ツリーの先頭
  get currentHead() {
  
  }
  
  //手番
  get turn() {
  
  }
  
  //盤面
  get banmen() {
  
  }
  
  
  //=================================================================================
  /**
   * コンポーネントを登録する。
   * @param {Object} - 
   */
  registerComponent(component) {
    this._components.push(component);
  }
  
  /**
   * 指定したノードをカレントノードにする。
   * @param {NodeElement} node - 
   */
  selectNode(node) {
  
  }
  
  /**
   * カレントノードをひとつ後ろのノードに移す。
   */
  back() {
  
  }
  
  /**
   * カレントノードをひとつ前のノードに移す。
   */
  forward() {
  
  }
  
  move(x, y) {
    
    
    
  }
  
  //=================================================================================
  
  //=================================================================================
}