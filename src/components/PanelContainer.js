import React, { Children, PropTypes, cloneElement } from 'react';
import Radium from 'radium';
import shallowCompare from 'react-addons-shallow-compare';

import PanelResizer from './PanelResizer';
import panelStyles from '../styles/panel';

export class PanelContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    children: PropTypes.node,
    footerHeight: PropTypes.number,
    resizePanel: PropTypes.func,
    sidebarHeight: PropTypes.number,
    sidebarWidth: PropTypes.number,
  };

  constructor() {
    super();
    this.state = {
      footerHeight: null,
      sidebarHeight: null,
      sidebarWidth: null,
    };
  }

  onPanelResize(property, delta, done) {
    if (done) {
      if (!this.state[property]) return;

      this.props.resizePanel(property, this.state[property]);
      this.setState({[property]: null});
    } else if (this.state[property] !== this.props[property] + delta) {
      this.setState({[property]: this.props[property] + delta});
    }
  }

  wrapSidebars(sidebars, width, height) {
    const sidebarHeight = this.state.sidebarHeight || this.props.sidebarHeight;
    return (
      <div style={[styles.sidebar, { width, height }]} key="sidebar-wrapper">
        {
          sidebars.map((side, index) => {
            const style = index < sidebars.length - 1 ? [styles.sidebarSection, { height: sidebarHeight }] : [];
            return cloneElement(side, { style });
          })
        }
      </div>
    );
  }

  setHeights(children) {
    const footerHeight = this.state.footerHeight || this.props.footerHeight;
    const sidebarWidth = this.state.sidebarWidth || this.props.sidebarWidth;
    const sidebars = children.filter(child => child.props.type === 'sidebar');
    const main = children.filter(child => child.props.type === 'main')[0];
    const footer = children.filter(child => child.props.type === 'footer')[0];
    const topHeightStyle = footer ? `calc(100vh - ${footerHeight}px)` : '100vh';
    const sidebar = this.wrapSidebars(sidebars, sidebarWidth, topHeightStyle);
    const mainWidth = sidebar ? `calc(100% - ${sidebarWidth}px)` : '100%';
    return [
      sidebar && <div key="sidebar-resizable" style={[styles.resizable, { display: 'inline-block' }]}>
        { sidebar }
        <PanelResizer key="sidebar-resizer"
                      property="sidebarWidth"
                      position="right"
                      onResize={this.onPanelResize.bind(this) } />
      </div>,
      main && cloneElement(main, { style: [styles.main, { width: mainWidth, height: topHeightStyle}]}),
      footer && <div key="footer-resizable" style={styles.resizable}>
        <PanelResizer key="footer-resizer"
                      property="footerHeight"
                      position="top"
                      onResize={this.onPanelResize.bind(this) } />
        { cloneElement(footer, { style: [styles.footer, { height: footerHeight }]}) }
      </div>
    ];
  }

  render() {
    const { children } = this.props;
    // handle < 2 children early so we can use normal array methods from here
    if (Children.count(children) < 2) {
      return (
        <div style={styles.only}>
          { children }
        </div>
      );
    }

    if (!children.filter(child => child.props.type === 'main').length) {
      throw new Error('PanelContainer requires a Panel with type of "main"');
    }

    const panels = this.setHeights(children);
    return (
      <div>
        { panels }
      </div>
    );
  }
}

export default Radium(PanelContainer);

const styles = {
  only: {
    width: '100%',
    height: '100vh',
  },
  sidebar: {
    backgroundColor: panelStyles.backgroundColor,
    borderRight: panelStyles.border,
    display: 'inline-block',
    verticalAlign: 'top',
  },
  sidebarSection: {
    borderBottom: panelStyles.border,
  },
  main: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  footer: {
    borderTop: panelStyles.border,
    backgroundColor: panelStyles.backgroundColor,
  },
  resizable: {
    position: 'relative',
  }
};
