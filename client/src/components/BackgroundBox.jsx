var React = require('react');

var BackgroundBox = React.createClass({

  render: function() {
    return (
      <div id="main">
      <canvas id="canvas">
      {this.props.background()}
      </canvas>
      </div>
  )}

})

module.exports = BackgroundBox;