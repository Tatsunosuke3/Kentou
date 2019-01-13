import { SGFNode, SGFProperty } from "/kentou/sgf-node.js"; 
import Goban from "/kentou/goban.js";

const rootNode = new SGFNode(
  new SGFProperty("GM", [1])
);

//const goban = new Goban();
const gobanElement = document.getElementById("goban");
const goban = gobanElement.goban;


// goban.add(0,0, 1);
// goban.add(0,1, 1);
// goban.add(0,2, 1);
// goban.add(1,2, 1);

// goban.add(1,0, -1);
// goban.add(1,1, -1);
// goban.add(2,2, -1);
// goban.add(0,3, -1);
// goban.add(1,3, -1);

// goban.add(7,5, 1);
// goban.add(7,6, 1);
// goban.add(6,7, 1);
// goban.add(8,7, 1);
// goban.add(7,8, 1);

// goban.add(7,4, -1);
// goban.add(6,5, -1);
// goban.add(8,5, -1);
// goban.add(6,6, -1);
// goban.add(8,6, -1);


// goban.add(12,4, 1);
// goban.add(11,5, 1);
// goban.add(13,5, 1);

// goban.add(11,6, -1);
// goban.add(13,6, -1);
// goban.add(12,7, -1);
// goban.add(12,5, -1);

// console.log( goban.toDebugText() );

// console.log( goban._isKo(7, 7, -1) );
// console.log( goban._isKo(12, 6, 1) );




