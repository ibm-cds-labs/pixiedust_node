# npy-js
## A Numpy to JS and back utility tool

The purpose of this library is to allow the user to read and write `*.npy` files so long as they are standard and not compressed or pickled. This javascript utility builds off the work of [Nicholas Tancredi](https://github.com/NicholasTancredi/read-npy-file). We simply use this library as a tool to read `npy` files and have added functionality to write these `npy` files back to disk if needed.


## Installation

`npm i npy-js`

## Usage

```js
const { readNumpyFile, writeNumpyFile } = require('npy-js');
var da = readNumpyFile('./n.npy');
writeNumpyFile('/o.npy', da);
```

## Testing

To run tests simply run
```js
npm run test
```

