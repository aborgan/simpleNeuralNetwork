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
