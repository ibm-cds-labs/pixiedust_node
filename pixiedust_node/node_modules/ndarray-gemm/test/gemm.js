"use strict"

var tape = require("tape")
var zeros = require("zeros")
var dup = require("dup")
var ndarray = require("ndarray")
var ops = require("ndarray-ops")

var gemm = require("../gemm.js")

function runTest(t, out, a, b) {
  for(var i=0; i<3; ++i) {
    for(var j=0; j<3; ++j) {
      for(var k=0; k<3; ++k) {
        for(var l=0; l<3; ++l) {
          if(Array.isArray(out)) {
            for(var n=0; n<3; ++n) {
              for(var m=0; m<3; ++m) {
                out[n][m] = 1.0
              }
            }
          } else {
            ops.assigns(out, 1.0)
          }

          if(Array.isArray(a)) {
            for(var n=0; n<3; ++n) {
              for(var m=0; m<3; ++m) {
                a[n][m] = 0
              }
            }
            a[i][j] = 1.0
          } else {
            ops.assigns(a, 0.0)
            a.set(i, j, 1.0)
          }

          if(Array.isArray(b)) {
            for(var n=0; n<3; ++n) {
              for(var m=0; m<3; ++m) {
                b[n][m] = 0
              }
            }
            b[k][l] = 1.0
          } else {
            ops.assigns(b, 0.0)
            b.set(k, l, 1.0)
          }

          gemm(out, a, b, 0.25, 0.5)

          if(Array.isArray(out)) {
            for(var r=0; r<3; ++r) {
              for(var c=0; c<3; ++c) {
                if (out[r][c]!==(j === k && r === i && c === l ? 0.75 : 0.5)) {
                  t.fail("(" + r + "," + c + ") - (" + i + "," + j + ") x (" + k + "," + l + ")")
                  return
                }
              }
            }
          } else {
            for(var r=0; r<3; ++r) {
              for(var c=0; c<3; ++c) {
                if (out.get(r,c)!==(j === k && r === i && c === l ? 0.75 : 0.5)) {
                  t.fail("(" + r + "," + c + ") - (" + i + "," + j + ") x (" + k + "," + l + ")")
                  return
                }
              }
            }
          }
        }
      }
    }
  }
  t.pass()
}

function Generic(n) {
  this.data = new Array(n)
  this.get = function(i) { return this.data[i] }
  this.set = function(i,x) { return this.data[i] = x }
  this.length = n
}

function genr(r, c)  {
  return ndarray(new Generic(r*c), [r,c])
}

tape("m-r-c g", function(t) {
  runTest(t, dup([3,3]), genr(3,3), genr(3,3).transpose(1,0))
  t.end()
})

tape("m-r-r g", function(t) {
  runTest(t, dup([3,3]), genr(3,3), genr(3,3))
  t.end()
})


tape("r-r-r g", function(t) {
  runTest(t, genr(3,3), genr(3,3), genr(3,3))
  t.end()
})

tape("r-r-c g", function(t) {
  runTest(t, genr(3,3), genr(3,3), genr(3,3).transpose(1,0))
  t.end()
})

tape("r-c-r g", function(t) {
  runTest(t, genr(3,3), genr(3,3).transpose(1,0), genr(3,3))
  t.end()
})

tape("r-r-r", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]), zeros([3,3]))
  t.end()
})

tape("r-r-c", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]), zeros([3,3]).transpose(1,0))
  t.end()
})

tape("r-r-m", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]), dup([3,3]))
  t.end()
})

tape("r-c-r", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]).transpose(1,0), zeros([3,3]))
  t.end()
})

tape("r-c-c", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]).transpose(1,0), zeros([3,3]).transpose(1,0))
  t.end()
})

tape("r-c-m", function(t) {
  runTest(t, zeros([3, 3]), zeros([3,3]).transpose(1,0), dup([3,3]))
  t.end()
})

tape("r-m-r", function(t) {
  runTest(t, zeros([3, 3]), dup([3,3]), zeros([3,3]))
  t.end()
})

tape("r-m-c", function(t) {
  runTest(t, zeros([3, 3]), dup([3,3]), zeros([3,3]).transpose(1,0))
  t.end()
})

tape("r-m-m", function(t) {
  runTest(t, zeros([3, 3]), dup([3,3]), dup([3,3]))
  t.end()
})

tape("c-r-r", function(t) {
  runTest(t, zeros([3, 3]).transpose(1,0), zeros([3,3]), zeros([3,3]))
  t.end()
})

tape("c-r-c", function(t) {
  runTest(t, zeros([3, 3]).transpose(1,0), zeros([3,3]), zeros([3,3]).transpose(1,0))
  t.end()
})

tape("c-c-r", function(t) {
  runTest(t, zeros([3, 3]).transpose(1,0), zeros([3,3]).transpose(1,0), zeros([3,3]))
  t.end()
})

tape("c-c-c", function(t) {
  runTest(t, zeros([3, 3]).transpose(1,0), zeros([3,3]).transpose(1,0), zeros([3,3]).transpose(1,0))
  t.end()
})