import * as React from 'react';
import { Children, Component, cloneElement } from 'react';
import Radium = require('radium');
import shallowCompare = require('react-addons-shallow-compare');

import { PanelResizer } from './PanelResizer';
import panelStyles from '../styles/panel';

interface PanelContainerProps {
  footerHeight: number;
  resizePanel: Function;
  sidebarHeight: number;
  sidebarWidth: number;
}

interface PanelContainerState {
  footerHeight?: number;
  sidebarHeight?: number;
  sidebarWidth?: number;
}

@Radium
export class PanelContainer extends Component<PanelContainerProps, PanelContainerState> {
  constructor() {
    super();
    this.state = {
      footerHeight: null,
      sidebarHeight: null,
      sidebarWidth: null,
    };
  }

  public shouldComponentUpdate(nextProps, nextState) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { children } = this.props;
    // handle < 2 children early so we can use normal array methods from here
    if (Children.count(children) < 2) {
      return (
        <div style={styles.only}>
          { children }
        </div>
      );
    }

    const panels = this.setHeights(children);
    return (
      <div>
        { panels }
      </div>
    );
  }

  private onPanelResize(property: 'footerHeight' | 'sidebarHeight' | 'sidebarWidth', delta: number, done: boolean) {
    if (done) {
      if (!this.state[property]) {
        return;
      }

      this.props.resizePanel(property, this.state[property]);
      this.setState({[property]: null});
    } else if (this.state[property] !== this.props[property] + delta) {
      this.setState({[property]: this.props[property] + delta});
    }
  }

  private wrapSidebars(sidebars, width, height) {
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

  private setHeights(children) {
    const footerHeight: number = this.state.footerHeight || this.props.footerHeight;
    const sidebarWidth: number = this.state.sidebarWidth || this.props.sidebarWidth;
    const sidebars = children.filter(child => child.props.type === 'sidebar');
    const main = children.filter(child => child.props.type === 'main')[0];
    const footer = children.filter(child => child.props.type === 'footer')[0];
    const topHeightStyle: Object = footer ? `calc(100vh - ${footerHeight}px)` : '100vh';
    const sidebar = this.wrapSidebars(sidebars, sidebarWidth, topHeightStyle);
    const mainWidth = sidebar ? `calc(100% - ${sidebarWidth}px)` : '100%';
    return [
      sidebar && <div key="sidebar-resizable" style={[styles.resizable, { display: 'inline-block' }]}>
        { sidebar }
        <PanelResizer key="sidebar-resizer"
                      propertyName="sidebarWidth"
                      position="right"
                      onResize={this.onPanelResize.bind(this) } />
      </div>,
      main && cloneElement(main, { style: [styles.main, { height: topHeightStyle, width: mainWidth }]}),
      footer && <div key="footer-resizable" style={styles.resizable}>
        <PanelResizer key="footer-resizer"
                      propertyName="footerHeight"
                      position="top"
                      onResize={this.onPanelResize.bind(this) } />
        { cloneElement(footer, { style: [styles.footer, { height: footerHeight }]}) }
      </div>,
    ];
  }
}

const styles = {
  footer: {
    backgroundColor: panelStyles.backgroundColor,
    borderTop: panelStyles.border,
  },
  main: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  only: {
    height: '100vh',
    width: '100%',
  },
  resizable: {
    position: 'relative',
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
};
