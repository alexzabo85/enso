
function main(mainArr = [], size) {

  if (size > mainArr.length) return []
  if (size === mainArr.length) return mainArr

  let finalResult = []
  let baseArr = mainArr.splice(0, size - 1)

  // let newRes = []
  finalResult = finalResult.concat(process2(baseArr, mainArr))

  for (let i = 0; mainArr.length; i++) {
    // let newVal =
    baseArr.shift()
    baseArr.push(mainArr.shift())

    finalResult = finalResult.concat(process2(baseArr, mainArr))
    // console.log('i: ', i)
    // console.log(' newVal: ', newVal)
    // console.log(' baseArr: ', baseArr)
  }

  // newRes = 
  // console.log('newRes: ', newRes)
  // console.log('finalResult: ', finalResult)

  while (mainArr.length && 0) {
    finalResult.concat(process2(baseArr, mainArr))
    baseArr.shift()
    baseArr.push(mainArr.splice(0, 1))
    console.log(baseArr, mainArr, finalResult)

  }
  // return [0].concat(process2(baseArr, mainArr))
  return finalResult
}

function process2(baseArr = [], stack = []) {
  const result = stack.map((newVal) => (
    [].concat(baseArr).concat(newVal)
  ))

  return result
}

function factorial(n) {
  if (n) {
    return n * factorial(n - 1)
  }
  else {
    return 1
  }
}
/**
 * 
 * @param {*} n size of string
 * @param {*} k size of set
 * @returns 
 */
function main2(n, k) {
  return factorial(n) / (factorial(n - k) + factorial(k))
}

// console.log(process2([1, 1], [2, 3, 4, 5]))
// console.log(main([1, 2, 3, 4, 5], 3))
// console.log(process.argv[2], process.argv[3])
// console.log(`!${process.argv[2]}=${factorial(process.argv[2])}`)
// console.log(main2(process.argv[2], process.argv[3]))
// console.log(main2(process.argv[2], process.argv[3]))

Array.prototype.combine = function combine(k) {
  var toCombine = this;
  var last;
  function combi(n, comb) {
    var combs = [];
    for (var x = 0, y = comb.length; x < y; x++) {
      for (var l = 0, m = toCombine.length; l < m; l++) {
        combs.push(comb[x] + toCombine[l]);
      }
    }
    if (n < k - 1) {
      n++;
      combi(n, combs);
    } else { last = combs; }
  }
  combi(1, toCombine);
  return last;
}
// Example:
var toCombine = ['a', 'b', 'c'];
var results = toCombine.combine(process.argv[2]);
console.log(`results= ${results}`)
