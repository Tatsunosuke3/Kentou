export class SGFProperty {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }
}


export class SGFNode {
  constructor(...properties) {
    this.id = SGFNode.getId();
    this.parent = null;
    this.children = [];
    
    this.properties = properties;
  }
  
  get nodeType() {
    
    
  }
  
  //==========================================================================================
  static getId(){
    if(this.counter === undefined) {
      this.counter = 0;
    }
    
    this.counter++;
    return this.counter;
  }
  
  //==========================================================================================
  //子要素を追加する。
  append(...nodes) {
    nodes.forEach((node) => {
      
      node.parent = this;
      this.children.push(node);
    });
  }
  
  //指定した子要素を削除する。
  remove(node) {
    const idx = this.children.indexOf(node);
    this.children.splice(idx, 1);
  }
  
  //
  findProperty(name) {
    return this.properties.find((property) => {
      return property.name == name;
    });
  }
  
  //
  getPropertyValue(name) {
    const target = this.findProperty(name);
    
    if(!target) return undefined;
    return target.value;
  }
  
  //ルートノードからこのノードまでのノードリストを取得する。
  getNodes() {
    const nodes = [];
    
    let current = this;
    while(current.parent) {
      current.unshift(this);
      current = current.parent;
    }
  }
  
  //連結されている全てのノードに対し処理を行う。
  forEach(callback) {
    let current = this;
    const stack = [];

    while(current !== undefined) {
      if(callback(current) === false) {
        break;
      }

      current.children.concat().reverse().forEach((child) => {
        stack.push(child);
      });

      current = stack.pop();
    }
  }
  

}

