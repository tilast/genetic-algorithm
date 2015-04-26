var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var CITY_POINT_RADIUS = 5;
var CITY_POINT_COLOR = "#8800ee";
var CITY_POINT_NAME_COLOR = "#444";
var CITY_POINT_SHIFT_X = 5;
var CITY_POINT_SHIFT_Y = 5;
var CANVAS_OFFSET_LEFT = 0;
var CANVAS_OFFSET_TOP = 0;
var canvas;
var ctx;

window.onload = function () {
    // initCanvas();

    // city_1_opt = {
    //     name: "Seattle",
    //     coords: new Point({
    //         x: 150, 
    //         y: 50
    //     })
    // }

    // city_2_opt = {
    //     name: "Los Angeles",
    //     coords: new Point({
    //         x: 185, 
    //         y: 431
    //     })
    // }

    // city_3_opt = {
    //     name: "Miami",
    //     coords: new Point({
    //         x: 600, 
    //         y: 500
    //     })
    // }

    // city_4_opt = {
    //     name: "New York",
    //     coords: new Point({
    //         x: 650, 
    //         y: 35
    //     })
    // }

    // city1 = new City(city_1_opt);
    // city2 = new City(city_2_opt);
    // city3 = new City(city_3_opt);
    // city4 = new City(city_4_opt);
    // drawCity(city1);
    // drawCity(city2);
    // drawCity(city3);
    // drawCity(city4);

    // var cityArr = [city1, city2, city3, city4];
    // chromosome = new Chromosome({
    //     size: 4,
    //     genes: [0, 1, 2, 3]
    // });

    // drawFullPath(chromosome, cityArr);
};

function initCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d")
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    CANVAS_OFFSET_LEFT = canvas.offsetLeft,
    CANVAS_OFFSET_TOP = canvas.offsetTop;
    
    canvas.addEventListener('click', canvasClickHandler, false);

}

function canvasClickHandler(element) {
    city_name = prompt("Enter city name", "");
    // debugger;
    if(city_name !== null && city_name !== '') {
            city_opt = {
            name: city_name,
            coords: new Point({
                x: element.pageX - CANVAS_OFFSET_LEFT, 
                y: element.pageY - CANVAS_OFFSET_TOP
            })
        }

        drawCity(new City(city_opt));
    }
}

function drawFullPath(chromosome, cities) {
    debugger;
    ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
    var seq = chromosome.getGenes();
    for (var i = 0; i < seq.length; ++i) {
        connectCities(cities[seq[i]], cities[seq[(i + 1) % seq.length]]);
    }
}

function drawCity(city) {
    var coord = city.getCoords();

    ctx.fillStyle = CITY_POINT_COLOR;
    ctx.beginPath();
    ctx.arc(coord.getX(), coord.getY(), CITY_POINT_RADIUS , 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = CITY_POINT_NAME_COLOR;
    ctx.font="15px Georgia";
    ctx.fillText(city.getName(), coord.getX() + CITY_POINT_SHIFT_X, coord.getY() - CITY_POINT_SHIFT_Y);
}

function connectCities(city1, city2) {
    ctx.beginPath();
    ctx.moveTo(city1.getCoords().getX(), city1.getCoords().getY());
    ctx.lineTo(city2.getCoords().getX(), city2.getCoords().getY());
    ctx.closePath();
    ctx.stroke();
    drawCity(city1);
    drawCity(city2);
}