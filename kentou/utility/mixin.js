// export default function mix(base, ...mixins){
//   let copyProperties = function (target = {}, source = {}) {
//     const ownPropertyNames = Object.getOwnPropertyNames(source);

//     ownPropertyNames.filter((key) => {
//       return !/^(prototype|name|constructor)$/.test(key);
//     }).forEach((key) => {
//       const desc = Object.getOwnPropertyDescriptor(source, key);
//       Object.defineProperty(target, key, desc);
//     });
//   };

//   //引数のクラスを親クラスとする匿名クラスを準備
//   let retval = class extends base{
//     constructor(...args){
//       super(...args);

//       //利用したパラメータは削除する
//       args = args.splice(base.length);

//       for(let i in mixins){
//         //匿名クラスにmixinクラスのプロパティをコピーする
//         copyProperties(retval.prototype, mixins[i].prototype);

//         //mixinクラスをオブジェクト化してコンストラクタの実行結果をコピーする
//         let mixinobj = new mixins[i](...args);
//         copyProperties(this, mixinobj);
//         args = args.splice(mixins[i].length);
//       }

//       //Mixinクラスに対するinstanceof代替メソッド
//       this.isMixedWith = (cl) =>  mixins.reduce(
//         (p,c) => p || (cl === c || cl.isPrototypeOf(c)), false);
//     }
//   };
  
//   return retval;
// } 

/*
export default function mix(...mixins) {
  class Mix {
    constructor(...args) {
      this.initialize && this.initialize(...args)

      for (let i in mixins) {
        const newMixin = new mixins[i](...args)

        copyProperties(this, newMixin)
        copyProperties(this.prototype, newMixin.prototype)
      }
    }
  }

  for (let i in mixins) {
    const mixin = mixins[i]

    copyProperties(Mix, mixin)
    copyProperties(Mix.prototype, mixin.prototype)
  }


  return Mix
}

function copyProperties(target = {}, source = {}) {
  const ownPropertyNames = Object.getOwnPropertyNames(source)

  ownPropertyNames
    .filter(key => !/^(prototype|name|constructor)$/.test(key))
    .forEach(key => {
      const desc = Object.getOwnPropertyDescriptor(source, key)

      Object.defineProperty(target, key, desc)
    })
}
*/