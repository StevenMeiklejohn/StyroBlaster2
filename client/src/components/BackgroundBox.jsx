var React = require('react');

var BackgroundBox = React.createClass({

  render: function() {
    return (
      <div id="main">
        {this.props.drawBackground()}
      </div>
  )}

})

module.exports = BackgroundBox;