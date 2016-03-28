var max_x = 600;
var max_y = 300;

var num_points = 30;

var _ = require('underscore');

var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(max_x, max_y)
  , ctx = canvas.getContext('2d');

var fs = require('fs');

function randInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

ctx.save();                  // Save the current state
ctx.fillStyle = '#FFFFFF'       // Make changes to the settings
ctx.fillRect(0, 0, max_x, max_y);   // Draw a rectangle with new settings
ctx.restore();  

var points = _(num_points).times(function(n){return [randInt(0, max_x), randInt(0, max_y)];});
console.log(points);

_(points.length - 1).times(function(index1) {
  var point1 = points[index1];
  _(points.length - index1 - 1).times(function(index2) {
    var point2 = points[index1 + index2 + 1];
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(point1[0], point1[1]);
    ctx.lineTo(point2[0], point2[1]);
    console.log('drawing from ' + index1 + ': ' + point1 + ' to ' + index2 + ':' + point2);
    ctx.stroke();  
  })
})

var out = fs.createWriteStream(__dirname + '/output.png')
  , stream = canvas.createPNGStream();

stream.on('data', function(chunk){
  out.write(chunk);
});