import React, { Component } from 'react';
import './canvasManager.css';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { applyAllFiltersToCanvas } from '../../services/filtersServices';

const mapStateToProps = state => ({ image: state.image, filters: state.filters });
const mapDispatchToProps = dispatch => ({});

class CanvasManager extends Component {
    state = { width: 800, height: 600, status: 'No image' };
    canvas = null;

    componentDidMount = () => {
        this.canvas = new fabric.Canvas('canvas');
        if (this.props.image != null && this.props.image.file != null) {
            this.drawImageOnCanvas();
        }
    }

    drawImageOnCanvas = () => {
        var imgObj = new Image();
        imgObj.src = this.props.image.file;
        imgObj.onload = () => {
            var image = new fabric.Image(imgObj);
            image.scaleToHeight(this.state.height);
            image.scaleToWidth(this.state.width);
            image.set({
                left: 0,
                top: 0,
                angle: 0,
                padding: 10,
                cornersize: 10,
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true
            });

            this.canvas.clear();

            this.canvas.add(image);

            this.canvas.forEachObject((obj) => {
                obj.center();
            });

            this.setState({ status: 'Rendered' });

            applyAllFiltersToCanvas(this.canvas, this.props.filters);
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.image != null) {
            if (prevProps.image.file !== this.props.image.file) {
                this.drawImageOnCanvas();
            }
            else if (this.props.image.file != null && this.props.filters != null && prevProps.filters !== this.props.filters) {
                applyAllFiltersToCanvas(this.canvas, this.props.filters);
            }
        }
    }

    render() {
        return (
            <div>
                <canvas id="canvas" width={this.state.width} height={this.state.height} />
                <br />
                <label id="image-render-status">{this.state.status}</label>
                <br />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasManager);
