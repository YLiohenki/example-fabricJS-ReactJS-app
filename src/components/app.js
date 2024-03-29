import React, { Component } from 'react';
import './app.css';
import UploadImage from './uploadImage/uploadImage';
import DownloadImage from './downloadImage/downloadImage';
import CanvasManager from './canvasManager/canvasManager';
import Filters from './filters/filters';
import '../store';
import { APP_LOAD } from '../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  onLoad: () =>
    dispatch({ type: APP_LOAD })
});

class App extends Component {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    return (
      <div className="App">
        <UploadImage />
        <div className="AppVisual">
          <Filters />
          <CanvasManager />
          <DownloadImage />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

