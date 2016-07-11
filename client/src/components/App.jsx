var React = require('react');
var Graphic = require('./Graphic.jsx');

var App = React.createClass({

  getInitialState: function() {
    return { rotation: 0 };
  },

  componentDidMount: function() {
    requestAnimationFrame(this.tick);
  },

  tick: function() {
    this.setState({ rotation: this.state.rotation + .01 });
    requestAnimationFrame(this.tick);
  },

  render: function() {
    return <div><Graphic rotation={this.state.rotation} /></div>
  }

});

// React.renderComponent(<App />, document.body);