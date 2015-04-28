var d3 = require('d3');

function Drawer() {
  this.vis = d3.select("#drawer")
            .append("svg");

  this.w = 800;
  this.h = 600;

  this.vis.attr("width", this.w)
     .attr("height", this.h);

  this.circleWidth = 5;

  this.fontFamily = 'Times New Roman';
  this.fontSizeHighlight = '1.5em';
  this.fontSizeNormal = '1em';

  this.palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }
}

Drawer.prototype.draw = function(nodes) {
  var _this = this;

  this.vis.selectAll('*').remove();

  var links = [];
  for(var i = 0; i <= nodes.length; ++i) {
    links.push({source: nodes[i % nodes.length], target: nodes[(i + 1) % nodes.length]});
  }

  this.vis.selectAll(".line")
    .data(links)
    .enter()
    .append("line")
    .attr("x1", function(d) { return d.source.x })
    .attr("y1", function(d) { return d.source.y })
    .attr("x2", function(d) { return d.target.x })
    .attr("y2", function(d) { return d.target.y })
    .style("stroke", "rgb(6,120,155)");

  var gnodes = this.vis.selectAll('g.gnode')
     .data(nodes)
     .enter()
     .append('g')
     .classed('gnode', true);
    
  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", _this.circleWidth)
      .style("fill", function(d) { return _this.palette.pink; });

  var labels = gnodes.append("text")
      .text(function(d) { return d.name; })
      .attr('x', function(d, i) { return d.x + 5; })
      .attr('y', function(d, i) { return d.y + 5; });
};

module.exports = Drawer;