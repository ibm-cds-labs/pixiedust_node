ndarray-gemm
======
[General matrix multiply](http://en.wikipedia.org/wiki/General_Matrix_Multiply) for [ndarrays](https://github.com/mikolalysenko/ndarray).  This is analogous to the [BLAS level 3](http://en.wikipedia.org/wiki/Basic_Linear_Algebra_Subprograms) routine xGEMM.

Note that while this implementation is correct, it is not yet very optimized.  If someone wants to take over this project or suggest improvements, patches are welcome.

[![build status](https://secure.travis-ci.org/scijs/ndarray-gemm.png)](http://travis-ci.org/scijs/ndarray-gemm)

## Example

```javascript
var zeros = require("zeros")
var ops = require("ndarray-ops")
var gemm = require("ndarray-gemm")

//Create 3 random matrices
var a = zeros([300, 400]) // a is 300 x 400
var b = zeros([400, 500]) // b is 400 x 500
var c = zeros([300, 500]) // c is 300 x 500

ops.random(a)
ops.random(b)
ops.random(c)

//Set c = a * b
gemm(c, a, b)
```

## Install
Install using [npm](https://www.npmjs.com/):

    npm install ndarray-gemm

## API

#### `require("ndarray-gemm")(c, a, b[, alpha, beta])`
Computes a generalized matrix multiplication.  This sets:

```javascript
c = alpha * a * b + beta * c
```

* `c` is a `[n,m]` shape ndarray
* `a` is a `[n,p]` shape ndarray
* `b` is a `[p,m]` shape ndarray
* `alpha` is a scalar weight which is applied to the product `a * b`
* `beta` is a scalar weight applied to `c` when added back in

## License
(c) 2013 Mikola Lysenko. MIT License
