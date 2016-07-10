var React = require('react');
var BackgroundBox = require('./BackgroundBox.jsx');

var GameBox = React.createClass({

  componentDidMount: function() {
  console.log("loaded");
  },


  drawBackground: function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var velocity=100;
    var bgImage = new Image();
    bgImage.addEventListener('load',drawImage,false);
    bgImage.src = "https://i.ytimg.com/vi/T40NSkd7Olc/maxresdefault.jpg";
    function drawImage(time){
        var lastRepaintTime=window.performance.now();
        var framegap=time-lastRepaintTime;
     //    lastRepaintTime=time;
        var translateX=velocity*(framegap/1000);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var pattern=ctx.createPattern(bgImage,"repeat-x");
        ctx.fillStyle=pattern;
        ctx.rect(translateX,0,bgImage.width,bgImage.height);
         ctx.fill();
            ctx.translate(-translateX,0);
      requestAnimationFrame(drawImage);
    }
    // var lastRepaintTime=window.performance.now();

  },
 

  


  render: function() {
    return (
      <div className="GameBox">
      <div id='title'>
        <h1>StyroBlaster</h1>
      </div>

      <div className="BackgroundBox">
        <BackgroundBox 
        drawBackground={this.drawBackground}
        />
      </div>

      </div>
      );
  }


})

module.exports = GameBox;