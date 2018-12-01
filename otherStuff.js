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
