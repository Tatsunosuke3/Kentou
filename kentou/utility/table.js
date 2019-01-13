
// export default class Table {
//   constructor(options) {
//     const defaultOptions = {
//       rowCount: 1,
//       columnCount: 1,
//       startRowIndex: 0,
//       startColumnIndex: 0,
//       initValue: undefined
//     };
//     const opt = Object.assign(defaultOptions, options);
    
//     this._rowCount = opt.rowCount;
//     this._columnCount = opt.columnCount;
//     this._startRowIndex = opt.startRowIndex;
//     this._startColumnIndex = opt.startColumnIndex;
    
//     this._cells = new Array(this._rowCount);
//     for(let i = 0; i < this._rowCount; i++) {
//       this._cells[i] = new Array(this._columnCount);
      
//       for(let j = 0; j < this._cells[i].length; j++) {
//           this._cells[i][j] = opt.initValue;
//       }
//     }
//   }
  
//   get rowCount() {
//     return this._rowCount;
//   }
  
//   get columnCount() {
//     return this._columnCount;
//   }
  
//   get startRowIndex() {
//     return this._startRowIndex;
//   }
  
//   get startColumnIndex() {
//     return this._startColumnIndex;
//   }
  
//   get endRowIndex() {
//     return this.startRowIndex + this.rowCount - 1;
//   }
  
//   get endColumnIndex() {
//     return this.startColumnIndex + this.columnCount - 1;
//   }
  
//   get(row, column) {
//     if(!this.isValidIndex(row, column)) return undefined;
    
//     return this._cells[row - this.startRowIndex][column - this.startColumnIndex];
//   }
  
//   set(row, column, value) {
//     if(!this.isValidIndex(row, column)) return;
    
//     this._cells[row - this.startRowIndex][column - this.startColumnIndex] = value;
//   }
  
//   isValidIndex(row, column) {
//     return this.startRowIndex <= row && row < (this.startRowIndex + this.rowCount) && 
//       this.startColumnIndex <= column && column < (this.startColumnIndex + this.columnCount);
//   }
  
//   clone() {
//     const tmp = new Table({
//       rowCount: this.rowCount, 
//       columnCount: this.columnCount, 
//       startRowIndex: this.startRowIndex, 
//       startColumnIndex: this.startColumnIndex
//     });
    
//     for(let y = this.startRowIndex; y <= this.endRowIndex; y++) {
//       for(let x = this.startColumnIndex; x <= this.endColumnIndex; x++) {
//         tmp.set(y, x, this.get(y, x));
//       }
//     }
    
//     return tmp;
//   }
// }