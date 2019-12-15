import React, { Component } from 'react';
import './canvasManager.css';
import { connect } from 'react-redux';
import { fabric } from 'fabric';

const mapStateToProps = state => ({ image: state.image });
const mapDispatchToProps = dispatch => ({});

class CanvasManager extends Component {
    state = { width: 800, height: 600, status: 'No image' };
    canvas = null;
    componentDidMount = () => {
        this.canvas = new fabric.Canvas('canvas');
    }
    render() {
        if (this.props.image != null && this.props.image.file != null) {
            var imgObj = new Image();
            imgObj.src = this.props.image.file;
            imgObj.onload = () => {
                var canvas = new fabric.Canvas('canvas');
                var image = new fabric.Image(imgObj);
                image.scaleToHeight(this.state.height);
                image.scaleToWidth(this.state.width);
                image.set({
                    left: 0,
                    top: 0,
                    angle: 0,
                    padding: 10,
                    cornersize: 10
                });

                canvas.add(image);

                canvas.forEachObject((obj) => {
                    obj.center();
                });

                this.setState({ status: 'Rendered' })
            }
        }
        return (
            <div>
                <canvas id="canvas" width={this.state.width} height={this.state.height} style={{ border: '1px solid #000000' }} />
                <br />
                <label id="image-render-status">{this.state.status}</label>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasManager);;
