var React = require('react');

var ShipBox = React.createClass({

    ship:null,
    shipX:null,
    shipY:null,
    oldShipX: null,
    oldShipY: null,
    direction: null,
    score: null,
    bomb:null,
    bulletX: null,
    bulletY: null,
    // back:null,
    // oldBack: null,



    componentDidMount: function() {
      // Add keyboard listener.
      window.addEventListener('keydown', this.whatKey, true);
      this.makeShip()
    },







      makeShip: function() {
        //Get canvas element
        this.ctx = this.getDOMNode().getContext('2d');
        this.ctx.clearRect(0, 0, 900, 500);
        console.log(this.ctx);

        // Draw saucer bottom.
        this.ctx.beginPath();
        this.ctx.moveTo(28.4, 16.9);
        this.ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
        this.ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
        this.ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
        this.ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
        this.ctx.closePath();
        this.ctx.fillStyle = "rgb(222, 103, 0)";
        this.ctx.fill();

        // Draw saucer top.
        this.ctx.beginPath();
        this.ctx.moveTo(22.3, 12.0);
        this.ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
        this.ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
        this.ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
        this.ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
        this.ctx.closePath();
        this.ctx.fillStyle = "rgb(51, 190, 0)";
        this.ctx.fill();

        // Save ship data.
        this.ship = this.ctx.getImageData(0, 0, 30, 30);
        this.shipX = 0;
        this.shipY=0;
        console.log(this.ship);
        this.oldBack = this.ctx.getImageData(30, 30, 30, 30);
        this.ctx.putImageData(this.oldBack, 0, 0);
        this.drawAsteroids();
      },

      drawAsteroids: function() {
        console.log("drawAsteroids called");
        this.ctx = this.getDOMNode().getContext('2d');
        console.log(this.ctx);
        // Draw asteroids.
        for (var i = 0; i <= 20; i++) {
          // Get random positions for asteroids.
          var a = Math.floor(Math.random() * 890);
          var b = Math.floor(Math.random() * 490);

          // Make the asteroids red
          this.ctx.fillStyle = "#FF0000";

          // Keep the asteroids far enough away from
          // the beginning or end.
          if (a > 200 && b > 10 && a < 860 && b < 460) {

            // Draw an individual asteroid.
            this.ctx.beginPath();
            this.ctx.arc(a, b, 10, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();
          } else--i;
         }



        // // Draw blue base.
        // this.ctx.fillStyle = "#0000FF";
        // this.ctx.beginPath();
        // this.ctx.rect(270, 270, 30, 30);
        // this.ctx.closePath();
        // this.ctx.fill();
        this.GameLoop();
      },

      GameLoop: function(){
        console.log("GameLoop called");
        // Play the game until the until the game is over.
        setInterval(this.doGameLoop, 16);

      },

      doGameLoop: function() {
        // console.log("doGameLoop Called");

        // console.log(this.ship);
        this.ctx = this.getDOMNode().getContext('2d');
        this.oldBack = this.ctx.getImageData(0, 0, 30, 30);

        // Put ship in new position.
        this.ctx.putImageData(this.ship, this.shipX, this.shipY);

        // Put old background down to erase ship.
        this.ctx.putImageData(this.oldBack, this.oldShipX, this.oldShipY);

      },

      whatKey: function(evt) {

        // Flag to put variables back if we hit an edge of the board.
        var flag = 0;

        // Get where the ship was before key process.
        this.oldShipX = this.shipX;
        this.oldShipY = this.shipY;
        this.oldBack = this.back;

        switch (evt.keyCode) {

          // Left arrow.
        case 37:
          this.shipX = this.shipX - 30;
          if (this.shipX < 0) {
            // If at edge, reset ship position and set flag.
            this.shipX = 0;
            flag = 1;
          }
          this.direction= "L";
          break;

          // Right arrow.
        case 39:
          this.shipX = this.shipX + 30;
          if (this.shipX > 870) {
            // If at edge, reset ship position and set flag.
            this.shipX = 870;
            flag = 1;
          }
          this.direction = "R";
          break;

          // Down arrow
        case 40:
          this.shipY = this.shipY + 30;
          if (this.shipY > 470) {
            // If at edge, reset ship position and set flag.
            this.shipY = 470;
            flag = 1;
          }
          this.direction = "D";
          break;

          // Up arrow 
        case 38:
          this.shipY = this.shipY - 30;
          if (this.shipY < 0) {
            // If at edge, reset ship position and set flag.
            this.shipY = 0;
            flag = 1;
          }
          this.direction = "U";
          break;

          // A key for drawing neutralizer field
        case 65:
          // Using this increases your score.
          // score = score + 20;
          // The ship isn't moving.
          flag = 1;
          // Draw the neutralizing ray which will let you pass.
          this.neutralize(this.direction);
          break;

            // If any other keys were presssed
          default:
            flag = 1; // Don't move the ship.
            alert("Please only use the arrow keys.");

        }

        // If flag is set, the ship did not move.
        // Put everything back the way it was.
        if (flag) {
          this.shipX = this.oldShipX;
          this.shipY = this.oldShipY;
          this.back = this.oldBack;
          this.score = this.score - 1;
        } else {
          // Otherwise, get background where the ship will go
          // So you can redraw background when the ship
          // moves again.
          this.back = this.ctx.getImageData(this.shipX, this.shipY, 30, 30);
        }
        // Increase score.
        // this.score = this.score + 1;

        // // Draw score on scoreboard.
        // ctx2.clearRect(0, 0, 300, 300);
        // ctx2.font = "20 point Ariel";
        // ctx2.fillText("Score", 20, 15);
        // ctx2.fillText(score, 100, 15);

        // // Did we collide?
        this.collideTest(this.direction);
      },


      collideTest: function(direction) {
        console.log("collide test called");

        // Collision detection. Get a clip from the screen.
        var clipWidth = 20;
        var clipDepth = 20;
        var clipLength = clipWidth * clipDepth;
        // alert(clipLength);
        var clipOffset = 5;
        var whatColor = this.ctx.getImageData(this.shipX + clipOffset, this.shipY + clipOffset, clipWidth, clipDepth);

        // Loop through the clip and see if you find red or blue. 
        for (var i = 0; i < clipLength * 4; i += 4) {
          if (whatColor.data[i] == 255) {
            alert("You hit an Asteroid. Game Over. Please Insert Coin.");
            break;
          }
        }

        // Did we hit something?
        if (direction == "P") this.bang();

      },

      bang: function() {

        // You lose.
        alert("Game over! You hit an asteroid.");
        // Stop game.
        clearTimeout(gameLoop);
        window.removeEventListener('keydown', whatKey, true);
      },

      neutralize: function(direction) {
        // Draw green for neutralizer.
        this.ctx = this.getDOMNode().getContext('2d');
        this.ctx.fillStyle = "#00FF00";
        this.ctx.beginPath();
        this.ctx.rect(this.shipX, this.shipY, 30, 30);
        this.ctx.closePath();
        this.ctx.fill();

        // Save it for later.
        var bomb = this.ctx.getImageData(this.shipX, this.shipY, 30, 30);

        // Which way was the ship going?
        // Put down a neuralizer field that way.
        switch (direction) {

        case "D":
          this.ctx.putImageData(bomb, this.shipX, this.shipY + 30);
          break;

        case "U":
          this.ctx.putImageData(bomb, this.shipX, this.shipY - 30);
          break;

        case "L":
          this.ctx.putImageData(bomb, this.shipX - 30, this.shipY);
          break;

        case "R":
          this.ctx.putImageData(bomb, this.shipX + 30, this.shipY);
          break;

        default:
        }
      },

      //This will replace neutralize
      makeBullet: function(){

        // Draw Bullet
        this.ctx = this.getDOMNode().getContext('2d');
        this.ctx.fillStyle = "#00FF00";
        this.ctx.beginPath();
        this.ctx.rect(this.shipX, this.shipY, 30, 30);
        this.ctx.closePath();
        this.ctx.fill();
        // this.moveBullet();
      },

      moveBullet: function(){
        this.ctx = this.getDOMNode().getContext('2d');
        this.bulletX=this.ShipX+30;
        this.bulletY=this.ShipY+30;
      },


    
    render: function() {
      var style = {
        position: "absolute",
        top: "200px",
        left: "50px"
      };
      return (<canvas id="background" width={900} height={500} style={style}/>);
    }
})

module.exports = ShipBox;



