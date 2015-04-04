var height = 600;
var width = 900;
var collision = 0;
var score = 0;
var highScore = 0;

var drag = d3.behavior.drag()
             .on('dragstart', function() {})
             .on('drag', function(){ player.attr('cx', d3.event.x+"px")
                                           .attr('cy', d3.event.y+"px")})
             .on('dragend', function(){});

var playSpace = d3.select('.wrapper').style({"width": width+"px"}).append('svg')
  .style({"height": height+"px", "width": width+"px", "background-image":"url(http://www.hdwallpaperscool.com/wp-content/uploads/2013/12/space-galaxy-high-definition-wallpapers-cool-desktop-widescreen-backgrounds.jpg)", "background-size": "cover"})


var player = playSpace.selectAll('.player').data([1]).enter().append('circle').attr('class', 'player')
            .attr('cx', width/2+"px").attr('cy', height/2+"px").attr('r', "15px").call(drag);

var getCoordinates = function(){

  var data = [];
  for (var i = 0; i < 20; i++) {

  var tuple = []

  var x = Math.random()*width -10
  var y = Math.random()*height -10

  tuple.push(x);
  tuple.push(y);

  data.push(tuple);
  }

  return data;


};

var enemy = playSpace.selectAll('.enemy').data(getCoordinates()).enter().append("circle").attr("class", "enemy").attr("cy", function(d) { return d[1]+"px"})
          .attr("cx", function(d) { return d[0]+"px"}).attr('r', "10px").attr("fill", "aqua")


  setInterval(function(){playSpace.selectAll('.enemy').data(getCoordinates()).transition().duration(2000).attr("cy", function(d) { return d[1]+"px"})
          .attr("cx", function(d) { return d[0]+"px"})}, 2000)

var getData = function(){
  var enemies = d3.selectAll('.enemy');

  var playerCX = d3.selectAll('.player').attr("cx");
      playerCX = +d3.selectAll('.player').attr("cx").slice(0, playerCX.length -2);
  var playerCY = d3.selectAll('.player').attr("cy");
      playerCY = +d3.selectAll('.player').attr("cy").slice(0, playerCY.length-2);



  enemies.each(function(){
    var cy = this.getAttribute('cy');
    var cx = this.getAttribute('cx');
    cx = +cx.slice(0, cx.length-2);
    cy = +cy.slice(0, cy.length-2);
    checkDistance(playerCX, playerCY, cx, cy);
  });

};

var checkDistance = function(pcx, pcy, enx, eny){
  var n = 25
  var distance = Math.sqrt((pcx-enx)*(pcx-enx) + (pcy-eny)*(pcy-eny));
  if (n > distance) {
    console.log("Collision!")
    collision++
    d3.select('.collisions').select('span').text(collision)
    if (score > highScore) {
      highScore = score;
    }
    score = 0;
    d3.select('.high').select('span').text(highScore)
  }
};


//setInterval(getData, 125);

setInterval(function(){
  getData ()
  d3.select(".current").select('span').text(score)
  score++}, 100)











