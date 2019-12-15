import React, { Component } from 'react';
import './downloadImage.css';
import { connect } from 'react-redux';
import { SAVE_TYPES } from '../../constants/saveTypes';
import { saveAs } from 'file-saver';
import { fabric } from 'fabric';
import { applyAllFiltersToCanvas } from '../../services/filtersServices';

const mapStateToProps = state => ({ image: state.image, filters: state.filters });
const mapDispatchToProps = dispatch => ({});

class DownloadImage extends Component {
    canvas;
    width;
    height;
    canvasElement;
    image;

    processImageSaving = (dataUrlKey) => {
        var imgObj = new Image();
        imgObj.src = this.props.image.file;
        imgObj.onload = () => {
            this.width = imgObj.width;
            this.height = imgObj.height;

            this.image = new fabric.Image(imgObj);
            this.image.set({
                left: 0,
                top: 0,
                angle: 0,
                padding: 0,
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true,
                lockRotation: true
            });
            this.createCanvas();
            this.drawImageOnCanvas();
            this.downloadImage(dataUrlKey);
            this.deleteCanvas();
        }
    }

    createCanvas = () => {
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.setAttribute("id", "hidden_canvas")
        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;
        document.body.appendChild(this.canvasElement);
        this.canvas = new fabric.Canvas("hidden_canvas");
    }

    drawImageOnCanvas = () => {
        this.canvas.clear();
        this.canvas.add(this.image);
        this.canvas.forEachObject((obj) => {
            obj.center();
        });

        applyAllFiltersToCanvas(this.canvas, this.props.filters);
    }

    drawImageOnCanvas = () => {
        this.canvas.clear();
        this.canvas.add(this.image);
        this.canvas.forEachObject((obj) => {
            obj.center();
        });

        applyAllFiltersToCanvas(this.canvas, this.props.filters);
    }

    downloadImage = (dataUrlKey) => {
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

    deleteCanvas = () => {
        document.getElementById("hidden_canvas").outerHTML = "";
    }

    saveImage = (dataUrlKey) => (event) => {
        this.processImageSaving(dataUrlKey);
    }

    render() {
        return (
            <div className="save-image-wrapper">
                {SAVE_TYPES.map(saveType =>
                    (<button key={saveType.id} className="save-image-button" onClick={this.saveImage(saveType.dataURLKey)}>Save as {saveType.name}</button>)
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadImage);
