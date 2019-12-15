import React, { Component } from 'react';
import './canvasManager.css';
import { connect } from 'react-redux';
import { fabric } from 'fabric';
import { FILTER_TYPES } from '../../constants/filterTypes';
import { SAVE_TYPES } from '../../constants/saveTypes';
import { saveAs } from 'file-saver';

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

    applyFilter = (index, filter, property, value) => {
        var objects = this.canvas.getObjects();
        var obj = objects[0];
        if (!obj) {
            return;
        }
        obj.filters[index] = filter;
        if (obj.filters[index] && property != null) {
            obj.filters[index][property] = value;
        }
        obj.applyFilters();
    }

    renderAllFilters = () => {
        if (this.props.filters != null) {
            FILTER_TYPES.forEach(filterType => {
                var fabricFilters = fabric.Image.filters;
                this.applyFilter(filterType.index, this.props.filters[filterType.key].isOn && new fabricFilters[filterType.fabricJSName](), filterType.hasIntensity ? filterType.intensityProperty : null, this.props.filters[filterType.key].intensity);
            });
            this.canvas.renderAll();
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

            this.renderAllFilters();
        }
    }

    saveImage = (dataUrlKey) => (event) => {
        var data = this.canvas.toDataURL({
            format: dataUrlKey,
            quality: 0.98
        });
        var saveAsFileName = `NewImage.${dataUrlKey}`;
        if (this.props.image.filename != null) {
            var position = this.props.image.filename.lastIndexOf(".");
            saveAsFileName = "filtered-" + (this.props.image.filename.substr(0, position < 0 ? this.props.image.filename.length : position) + `.${dataUrlKey}`);
        }
        saveAs(data, saveAsFileName);
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.image != null) {
            if (prevProps.image.file !== this.props.image.file) {
                this.drawImageOnCanvas();
            }
            else if (this.props.image.file != null && this.props.filters != null && prevProps.filters !== this.props.filters) {
                this.renderAllFilters();
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
                <div className="save-image-wrapper">
                    {SAVE_TYPES.map(saveType =>
                        (<button key={saveType.id} className="save-image-button" onClick={this.saveImage(saveType.dataURLKey)} download="somedata.jpeg">Save as {saveType.name}</button>)
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasManager);
