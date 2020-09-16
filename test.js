


const oldPromise = global.Promise;

global.Promise = class Promise{

  constructor(exec){
    console.log('>');
    let ret = new oldPromise(exec);

    return ret.then(()=>{console.log('<');return arguments});
  };

};

let oldAsyncFunction = Object.getPrototypeOf(async function(){});




//new Promise((resolve, rejected)=>{setTimeout(resolve, 1000)});



(async function(){
  let start = Date.now();
  while (((Date.now() - start) / 1000)< 5){
    continue;
  };
  return 10;
})();
