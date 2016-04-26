import React, { Children, PropTypes, cloneElement } from 'react';
import Radium from 'radium';

import panelStyles from '../styles/panel';

export class Panel extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    sidebarWidth: PropTypes.number,
    footerHeight: PropTypes.number,
  };

  static defaultProps = {
    sidebarWidth: 340,
    footerHeight: 300,
  };

  wrapSidebars(children) {
    const sidebars = children.filter(child => child.props.type === 'sidebar');
    if (sidebars.length < 2) {
      return children;
    }
    const otherPanels = children.filter(child => child.props.type !== 'sidebar');
    return [
      <div style={styles.sidebar} key="sidebar-wrapper">
        {
          sidebars.map((sidebar, i) => {
            return cloneElement(sidebar, { style: [i < sidebars.length - 1 && styles.sidebarSection] });
          })
        }
      </div>,
      ...otherPanels
    ];
  }

  render() {
    const { children, footerHeight, sidebarWidth } = this.props;
    // handle < 2 children early so we can use normal array methods from here
    if (Children.count(children) < 2) {
      return (
        <div style={styles.only}>
          { children }
        </div>
      );
    }

    const dynamicStyles = {
      sidebar: {
        flex: `0 0 ${sidebarWidth}px`
      },
      footer: {
        flex: `0 0 ${footerHeight}px`
      }
    };

    const panels = this.wrapSidebars(children);
    return <div style={styles.container}>
      {
        panels.map((panel) => {
          if (!styles[panel.props.type]) return panel;
          return cloneElement(panel, { style: { ...styles[panel.props.type], ...dynamicStyles } });
        })
      }
    </div>;
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
