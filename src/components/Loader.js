import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Loader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    showUntil: React.PropTypes.bool,
    children: React.PropTypes.node
  };

  render() {
    if (!this.props.showUntil) {
      return (
        <div>
          <style>
            {css}
          </style>
          <div className="loader" />
        </div>
      );
    }
    return this.props.children;
  }
}

const css = `
  .loader {
    height: 4px;
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #ddd;
  }
  .loader:before{
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: #2980b9;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
  }
`;
