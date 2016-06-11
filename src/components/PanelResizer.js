import React, { PropTypes } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

const coords = {
  bottom: 'clientY',
  left: 'clientX',
  right: 'clientX',
  top: 'clientY',
};

const multiplier = {
  bottom: 1,
  left: -1,
  right: 1,
  top: -1,
};

export class PanelResizer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    onResize: PropTypes.func,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    property: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      resizing: false
    };
    this.resize = this.resize.bind(this);
    this.endResize = this.endResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.resize);
    window.addEventListener('mouseup', this.endResize);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.resize);
    window.removeEventListener('mouseup', this.endResize);
  }

  startResize(event) {
    event.preventDefault();
    this.setState({ resizing: true, initial: event[coords[this.props.position]] });
  }

  resize(event) {
    if (!this.state.resizing) return;

    event.preventDefault();
    this.props.onResize(
      this.props.property,
      (event[coords[this.props.position]] - this.state.initial) * multiplier[this.props.position]
    );
  }

  endResize(event) {
    if (!this.state.resizing) return;

    event.preventDefault();
    this.props.onResize(this.props.property, null, true);
    this.setState({ resizing: false, initial: 0 });
  }

  render() {
    const { position } = this.props;
    return (
      <div style={styles[position]}
           onMouseDown={this.startResize.bind(this)}
           onMouseMove={this.resize}
           onMouseUp={this.endResize}
      ></div>
    );
  }
}

export default Radium(PanelResizer);

const styles = {
  top: {
    cursor: 'ns-resize',
    height: 11,
    left: 0,
    position: 'absolute',
    top: -5,
    width: '100%',
    zIndex: 1,
  },
  right: {
    cursor: 'ew-resize',
    height: '100%',
    position: 'absolute',
    right: -5,
    top: 0,
    width: 11,
    zIndex: 1,
  }
};
