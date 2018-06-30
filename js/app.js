AstroidsFunction();

function AstroidsFunction() {

/* Get dom elements set context make ship object */

    "use strict";
    /** @type {HTMLCanvasElement} */
    var FPS = 30; // Frames per second
    var Friction = 0.7; // friction coefficent 
    var astroNumber = 3; // starting numbeer of astroids
    var astroSize = 100; // starting size of astroids in pixles
    var astroSpeed = 50; // max starting speed of astroids in pixles per second
    var ship_size = 50; // Ship height in pixels per second
    var turn_speed = 360; // tur speed in degrees per second
    var ship_trurst = 5; // acceleration of ship in pixles per second per second

    var canva = document.getElementById("displayCanvas");
    var ctx = canva.getContext("2d");
// set up spaceship object
    var ship = {
        x: canva.width / 2,
        y: canva.height / 2,
        r: ship_size / 2,
        a: 90 / 180 * Math.PI, // converts degrees to radians
        rot: 0,
        breaking: false,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    };

    // set up asteroids
    var asteroids = [];
    createteAsteroidBelt();



/* set up event handler */

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

/* Set up a game loop */

setInterval(update, 1000 / FPS);

    function createteAsteroidBelt() {
        asteroids = [];
        var x, y;
        for(var i = 0; i < astroNumber; i++) {
            x = Math.floor(Math.random() * canva.width);
            y = Math.floor(Math.random() * canva.height);
            asteroids.push(newAstroid(x, y));
        }
    }

    // key bord inputs 
    function keyDown(/** @type {keyboardEvent} */ evt) {
        switch(evt.keyCode) {
            case 37: // left arrow (rotate ship left)
               ship.rot = turn_speed / 180 * Math.PI / FPS; 
            break;
            case 38: // forword arrow (thrust ship forword)
                ship.thrusting = true;
            break;
            case 39: // right arrow (rotate ship right)
                ship.rot = -turn_speed / 180 * Math.PI / FPS;
            break;
            case 40: // reverse arrow (backtrust ship reverse)
                ship.breaking = true;
            break;
        }
    }
    function keyUp(/** @type {keyboardEvent} */ evt) {
        switch(evt.keyCode) {
            case 37: // left arrow (stop rotate ship left)
               ship.rot = 0; 
            break;
            case 38: // forword arrow (stop thrust ship forword)
                ship.thrusting = false;
            break;
            case 39: // right arrow (stop rotate ship right)
                ship.rot = 0;
            break;
            case 40: // reverse arrow (stop backtrust ship reverse)
                ship.breaking = false;
            break;
        }
    }
    function newAstroid(x, y) {
        var roid = {
            x: x,
            y: y,
            xv: Math.random() * astroSpeed / FPS * (Math.random() < 0.5 ? 1 : -1),
            yv: Math.random() * astroSpeed / FPS * (Math.random() < 0.5 ? 1 : -1),
            r: astroSize / 2,
            a: Math.random() * Math.PI / 2 // in radians
    };
    return roid;

/* Call update function */    
    function update() {
        // draw space
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canva.width, canva.height);
        // thrust the ship
        if(ship.thrusting) {
            ship.thrust.x += ship_trurst * Math.cos(ship.a) / FPS;
            ship.thrust.y -= ship_trurst * Math.sin(ship.a) / FPS;

            // draw the truster
            ctx.fillStyle = "red";
            ctx.strokeStyle = "yellow";
            ctx.lineWidht = ship_size / 10;
            ctx.beginPath();
        ctx.moveTo(// rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a)) 
        );
            ctx.lineTo(// rear center behind ship
            ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
            ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
        );
        ctx.lineTo(// rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
        );
        ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }else{
            ship.thrust.x -= Friction * ship.thrust.x / FPS;
            ship.thrust.y -= Friction * ship.thrust.y / FPS;
        }
        if(ship.breaking) {
            ship.thrust.x -= Friction * ship.thrust.x / FPS;
            ship.thrust.y -= Friction * ship.thrust.y / FPS;
        }

         // draw triangular ship
        ctx.fillStyle = "lightblue";
        ctx.strokeStyle = "white";
        ctx.lineWidht = ship_size / 20;
        ctx.beginPath();
        ctx.moveTo(// nose of the ship
            ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
            ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
        );
        ctx.lineTo(// rear left
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
        );
        ctx.lineTo(// rear right
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.fill();
        ctx.stroke();


        // draw astroids
        ctx.strokeStyle =  "slategray";
        ctx.lineWidht = ship_size / 20;
        for(var i = 0; i < asteroids.length; i++) {

            // draw a path

            // draw a polygon

            // move the polygon

            // handel the edge of screen 
        }

        // rotate ship
        ship.a += ship.rot;
        // move ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;
        
        // hadle edge of screen
        if(ship.x < 0 - ship.r) {
           ship.x = canva.width + ship.r; 
        }else if(ship.x > canva.width + ship.r) {
            ship.x = 0 - ship.r;
        }

        if(ship.y < 0 - ship.r) {
            ship.y = canva.height + ship.r; 
         }else if(ship.y > canva.height + ship.r) {
             ship.y = 0 - ship.r;
         }
        // center ship dot 
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }
}
