import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import { fabric } from 'fabric';
import UploadImage from './uploadImage/uploadImage';
import '../store';
import { APP_LOAD } from '../constants/actionTypes';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {}
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD })
});

class App extends Component {
  componentDidMount() {
    var canvas = new fabric.Canvas('canvas');
    canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));

    canvas.selectionColor = 'rgba(0,255,0,0.3)';
    canvas.selectionBorderColor = 'red';
    canvas.selectionLineWidth = 5;
  }

  componentWillMount() {
    this.props.onLoad();
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <UploadImage />
        <canvas id="canvas" width="800" height="450" style={{ border: '1px solid #000000' }}></canvas>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

