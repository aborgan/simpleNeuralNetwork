(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var simpleNeuralNetwork = require("./simpleNeuralNetwork")
simpleNeuralNetwork.numTimes = 10000
simpleNeuralNetwork.setWeights(3)
var colorToLearn = ""
var guess = 0;
var inputs = []
var trueOut = []
var weights = []
var currentColor = []

function generateColor() {
  currentColor = [Math.random(), Math.random(), Math.random()]
  console.log("color: ",currentColor)
  document.querySelector('.color').style.backgroundColor = "rgb(" + currentColor[0]*255 + "," + currentColor[1]*255 + "," + currentColor[2]*255 + ")"
}

function printGuess(guess) {
  if(guess*100 < 15) {
    document.querySelector('.guess').innerHTML = "I'm pretty sure this color is not " + colorToLearn
  } else if(guess*100 < 85) {
    document.querySelector('.guess').innerHTML = "I'm not completely sure if this color is " + colorToLearn
  } else {
    document.querySelector('.guess').innerHTML = "I'm pretty sure this color is " + colorToLearn
  }
}

function computeGuess() {
  inputs.push([currentColor[0],currentColor[1],currentColor[2]])
  simpleNeuralNetwork.setWeights(3)
  simpleNeuralNetwork.train(inputs, trueOut, simpleNeuralNetwork.weights)
  generateColor()
  printGuess(simpleNeuralNetwork.guess(currentColor, simpleNeuralNetwork.weights))
}

document.querySelector('#submit').onclick = function submitColor() {
  colorToLearn = document.querySelector('#colorField').value
  document.querySelector('#submit').style.display = "none"
  document.querySelector('#colorField').style.display = "none"
  document.querySelector('.container').style.display = "block"
  document.querySelector('.question').innerHTML = "is this color " + colorToLearn
  generateColor()
}

document.querySelector('#yes').onclick = function submitColor() {
  trueOut.push(1)
  computeGuess()
}

document.querySelector('#no').onclick = function submitColor() {
  trueOut.push(0)
  computeGuess()
}

},{"./simpleNeuralNetwork":2}],2:[function(require,module,exports){
var simpleNeuralNetwork = {
  numTimes: 10000,
  weights: [],
  setWeights: function(numInputs) {for(var i=0;i<numInputs;i++){this.weights.push(this.randWeight())}},
  sigmoid: function(x) {return 1 / (1 + Math.exp(-x))},
  randWeight: function() {return Math.random() / 100 - 0.005},
  vectorDotProduct: function(in1, in2) {return in1.reduce((total, current, idx) => {return total + current * in2[idx]}, 0)},
  transposeMatrix: function(input) {return input[0].map((x,i) => input.map(x => x[i]))},
  guess: function(ins, weights) {return this.sigmoid(this.vectorDotProduct(ins, weights))},
  train: function(inputs, trueOut, weights) {
    for(var count=0; count<this.numTimes; count++) {
      var out = []
      var errTimesDeriv = []
      for(var x in inputs) {
        out.push(this.guess(inputs[x], weights))
        errTimesDeriv.push((trueOut[x]-out[x])*(out[x]*(1-out[x])))
      }
      for(var x in inputs[x]) {weights[x]+=this.vectorDotProduct(this.transposeMatrix(inputs)[x], errTimesDeriv)}
    }
  }
};

module.exports = simpleNeuralNetwork;

},{}]},{},[1]);
