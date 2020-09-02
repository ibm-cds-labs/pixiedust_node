'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrameContextConsumer = exports.FrameContext = undefined;

var _Context = require('./Context');

Object.defineProperty(exports, 'FrameContext', {
  enumerable: true,
  get: function get() {
    return _Context.FrameContext;
  }
});
Object.defineProperty(exports, 'FrameContextConsumer', {
  enumerable: true,
  get: function get() {
    return _Context.FrameContextConsumer;
  }
});

var _Frame = require('./Frame');

var _Frame2 = _interopRequireDefault(_Frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Frame2.default;