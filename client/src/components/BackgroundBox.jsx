var React = require('react');

var BackgroundBox = React.createClass({

  render: function() {
    return (
      <canvas id="canvas2">
        {this.props.drawBackground()}
      </canvas>
  )}

})

module.exports = BackgroundBox;