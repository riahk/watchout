var height = 600;
var width = 900;

var drag = d3.behavior.drag()
             .on('dragstart', function() {})
             .on('drag', function(){ player.attr('cx', d3.event.x)
                                           .attr('cy', d3.event.y)})
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









