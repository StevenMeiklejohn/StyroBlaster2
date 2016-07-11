var React = require('react');

var BackgroundBox = React.createClass({
  

    componentDidMount: function() {
      var context = this.getDOMNode().getContext('2d');
      this.paint(context);
    },

    componentDidUpdate: function() {
      var context = this.getDOMNode().getContext('2d');
      context.clearRect(0, 0, 900, 500);
     
    },

    paint: function(context) {
      console.log(context);

      var img = new Image();
      img.addEventListener("load", function() {
        context.drawImage(img, 0, 0, 900, 500);
        context.save();
      }, false);
      img.src = 'https://i.ytimg.com/vi/T40NSkd7Olc/maxresdefault.jpg';


      // var img=document.getElementById("stars");
      // context.drawImage(img, 0, 0, 900, 500);
      // context.save();

      // context.translate(100, 100);
      // context.rotate(this.props.rotation, 100, 100);
      // context.fillStyle = '#F00';
      // context.fillRect(-50, -50, 100, 100);
      // context.restore();
    },

    render: function() {
      return <canvas width={900} height={500} />;
    }

  });





module.exports = BackgroundBox;