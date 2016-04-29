import React, { Children, PropTypes, cloneElement } from 'react';
import Radium from 'radium';

import panelStyles from '../styles/panel';

export class Panel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    sidebarWidth: PropTypes.number,
    sidebarHeight: PropTypes.number,
    footerHeight: PropTypes.number,
  };

  static defaultProps = {
    sidebarHeight: 300,
    sidebarWidth: 300,
    footerHeight: 150,
  };

  wrapSidebars(sidebars, width, height) {
    const { sidebarHeight } = this.props;
    return (
      <div style={[styles.sidebar, { width, height }]} key="sidebar-wrapper">
        {
          sidebars.map((side, index) => {
            const style = index < sidebars.length - 1 ? {...styles.sidebarSection, height: sidebarHeight } : {};
            return cloneElement(side, { style });
          })
        }
      </div>
    );
  }

  setHeights(children) {
    const { footerHeight, sidebarWidth } = this.props;
    const sidebars = children.filter(child => child.props.type === 'sidebar');
    const main = children.filter(child => child.props.type === 'main')[0];
    const footer = children.filter(child => child.props.type === 'footer')[0];
    const topHeightStyle = footer ? `calc(100vh - ${footerHeight}px)` : '100vh';
    const sidebar = this.wrapSidebars(sidebars, sidebarWidth, topHeightStyle);
    const mainWidth = sidebar ? `calc(100% - ${sidebarWidth}px)` : '100%';
    return [
      sidebar && sidebar,
      main && cloneElement(main, { style: [styles.main, { width: mainWidth, height: topHeightStyle}]}),
      footer && cloneElement(footer, { style: [styles.footer, { height: footerHeight }]})
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

export default Radium(Panel);

const styles = {
  only: {
    width: '100%',
    height: '100vh'
  },
  sidebar: {
    backgroundColor: panelStyles.backgroundColor,
    borderRight: panelStyles.border,
    display: 'inline-block',
    verticalAlign: 'top'
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
};
