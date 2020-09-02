"use strict"

module.exports = matrixProduct

var generatePlan = require("./lib/planner.js")

function shape(arr) {
  if(Array.isArray(arr)) {
    return [ arr.length, arr[0].length ]
  } else {
    return arr.shape
  }
}

function checkShapes(out, a, b) {
  var os = shape(out)
  var as = shape(a)
  var bs = shape(b)
  if(os[0] !== as[0] || os[1] !== bs[1] || as[1] !== bs[0]) {
    throw new Error("Mismatched array shapes for matrix product")
  }
}

function classifyType(m) {
  if(Array.isArray(m)) {
    if(Array.isArray(m)) {
      return [ "r", "native" ]
    }
  } else if(m.shape && (m.shape.length === 2)) {
    if(m.order[0]) {
      return [ "r", m.dtype ]
    } else {
      return [ "c", m.dtype ]
    }
  }
  throw new Error("Unrecognized data type")
}

var CACHE = {}

function matrixProduct(out, a, b, alpha, beta) {
  if(alpha === undefined) {
    alpha = 1.0
  }
  if(beta === undefined) {
    beta = 0.0
  }
  var useAlpha = (alpha !== 1.0)
  var useBeta  = (beta !== 0.0)
  var outType  = classifyType(out)
  var aType    = classifyType(a)
  var bType    = classifyType(b)

  checkShapes(out, a, b)

  var typeSig  = [ outType, aType, bType, useAlpha, useBeta ].join(":")
  var proc     = CACHE[typeSig]
  if(!proc) {
    proc = CACHE[typeSig] = generatePlan(outType, aType, bType, useAlpha, useBeta)
  }
  return proc(out, a, b, alpha, beta)
}