import React, { Component } from 'react';
import './uploadImage.css';
import { IMAGE_UPLOAD } from '../../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ image: state.image });
const mapDispatchToProps = dispatch => ({
    onUploadImage: file =>
        dispatch({ type: IMAGE_UPLOAD, payload: { file } })
});

class UploadImage extends Component {
    state = { status: 'No File' };
    constructor() {
        super();
        this.handleChange = event => {
            event.preventDefault();
            var reader = new FileReader();
            reader.onload = (readerOnloadEvent) => {
                this.props.onUploadImage(readerOnloadEvent.target.result);
                this.setState({
                    status: 'Upload Success'
                })
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    render() {
        return (
            <div>
                <label htmlFor="image-upload">Upload Image:</label><input type="file" name="image-upload" id="image-upload" accept=".jpg,.jpeg,.png" onChange={this.handleChange} />
                <br />
                <label id="image-upload-status">{this.state.status}</label>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);;
