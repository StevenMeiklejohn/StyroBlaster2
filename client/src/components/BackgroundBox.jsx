var React = require('react');

var BackgroundBox = React.createClass({

  render: function() {
    return (
      <div id="main">
        <canvas>{this.props.drawBackground()}</canvas>
      </div>
  )}

})

module.exports = BackgroundBox;