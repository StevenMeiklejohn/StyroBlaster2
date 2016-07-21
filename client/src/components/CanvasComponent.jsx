var React = require('react');
var ReactCanvas = require('react-canvas');

var Surface = ReactCanvas.Surface;
var Image = ReactCanvas.Image;
var Text = ReactCanvas.Text;




rect: function(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}
class CanvasComponent extends React.CreateComponent {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0,0, 900, 500);
        // draw children “components”
        rect({ctx, x: 10, y: 10, width: 50, height: 50});
        rect({ctx, x: 110, y: 110, width: 50, height: 50});
    }
    render() {
         return (
             <canvas ref="canvas" width={900} height={500}/>
         );
    }
}
// ReactDOM.render(<CanvasComponent/>, document.getElementById('GameBox'));

module.exports = CanvasComponent;