var React = require('react');
var BackgroundBox = require('./BackgroundBox.jsx');

var GameBox = React.createClass({

  componentDidMount: function() {
  console.log("loaded");
  },


  drawBackground: function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height =500;

    //Draw Background Image
    var bgImage = new Image();
    bgImage.src = "https://i.ytimg.com/vi/T40NSkd7Olc/maxresdefault.jpg";
    bgImage.onload = function(){
    ctx.drawImage(bgImage,0,0)
    };
    return canvas;
 

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