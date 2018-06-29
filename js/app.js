AstroidsFunction();

function AstroidsFunction() {

/* Get dom elements set context make ship object */

    "use strict";
    /** @type {HTMLCanvasElement} */
    var FPS = 30; // Frames per second
    var Friction = 0.7; // friction coefficent 
    var ship_size = 50; // Ship height in pixels
    var turn_speed = 360; // tur speed in degrees per second
    var ship_trurst = 5; // acceleration of ship in pixles per second per second

    var canva = document.getElementById("displayCanvas");
    var ctx = canva.getContext("2d");

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

/* set up event handler */

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
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

/* Set up a game loop */

    setInterval(update, 1000 / FPS);   
/* Call update function */    
    function update() {
        // draw space
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canva.width, canva.height);
        // thrust the ship
        if(ship.thrusting) {
            ship.thrust.x += ship_trurst * Math.cos(ship.a) / FPS;
            ship.thrust.y -= ship_trurst * Math.sin(ship.a) / FPS;
        }else{
            ship.thrust.x -= Friction * ship.thrust.x / FPS;
            ship.thrust.y -= Friction * ship.thrust.y / FPS;
        }
        if(ship.breaking) {
            ship.thrust.x -= Friction * ship.thrust.x / FPS;
            ship.thrust.y -= Friction * ship.thrust.y / FPS;
        }
        // draw ship
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
        ctx.stroke();

        // rotate ship

        // move ship
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;
        ship.a += ship.rot;
        // center ship dot 
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
    }
}
