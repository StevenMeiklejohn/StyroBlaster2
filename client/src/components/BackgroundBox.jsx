var React = require('react');

var BackgroundBox = React.createClass({




  render: function() {
    return (

      <canvas id="background" width="900" height="500">
      {this.props.draw()}
      </canvas>

  )}

})

module.exports = BackgroundBox;