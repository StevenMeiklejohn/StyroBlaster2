var React = require('react');
var BackgroundBox = require('./BackgroundBox.jsx');


var GameBox = React.createClass({

  componentDidMount: function() {
  console.log("loaded");
  },



  drawBackground: function(){
    var canvas = document.createElement("CANVAS");
    canvas.id = "background"
    canvas.width = 900;
    canvas.height = 500;


    console.log(canvas);
    console.log(canvas.width);

    var ctx = canvas.getContext("2d");
    console.log(ctx);


    var velocity=100;
    var bgImage = new Image();
    bgImage.src = "https://i.ytimg.com/vi/T40NSkd7Olc/maxresdefault.jpg";
    bgImage.addEventListener('load',drawImage,false);


    function drawImage(time){  
            console.log('drawImage triggered');
            var framegap=time-lastRepaintTime;
            var lastRepaintTime=time;
            var translateX=velocity*(framegap/1000);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var pattern=ctx.createPattern(bgImage,"repeat-x");
            ctx.fillStyle=pattern;
            ctx.rect(translateX,0,bgImage.width,bgImage.height);
            ctx.fill();
            ctx.translate(-translateX,0);   
            requestAnimationFrame(drawImage);
    };
    // var lastRepaintTime=window.performance.now();
  },





 

  
 

  


  render: function() {
    return (
      <div className="GameBox">
        <h1>StyroBlaster</h1>


        <div className="BackgroundBox">

        <BackgroundBox
        draw={this.drawBackground}
        />
        </div>



      </div>
      );
  }


})

module.exports = GameBox;