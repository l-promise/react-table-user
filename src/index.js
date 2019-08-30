import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

class Index extends Component {
  state = {
    flag: false
  };
  show = () => {
    this.setState(
      {
        flag: true
      },
      () => {
        console.log(this.flag);
      }
    );
  };
  hide = () => {
    this.setState({
      flag: false
    });
  };
  render() {
    return <App show={this.show} hide={this.hide} flag={this.state.flag}></App>;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
