import * as React from 'react';
import Radium = require('radium');
import withHandlers from 'recompose/withHandlers';

import { Icon } from '../components/Icon';
import fontStyles from '../styles/font';
import panelStyles from '../styles/panel';

type ButtonClickEvent = React.MouseEvent<HTMLButtonElement>;

interface TabProps {
  active?: boolean;
  onClick?: () => void;
  onClickClose?: () => void;
}

const TabBase: React.StatelessComponent<TabProps> = ({
  active,
  children,
  onClick,
  onClickClose,
}) => (
  <div style={[styles.container, active ? styles.active : styles.inactive]}>
    <div style={styles.flexContainer}>
      <button style={[styles.button, styles.label]} onClick={onClick}>{ children }</button>
      { onClickClose && <button style={styles.button} onClick={onClickClose}><Icon name="fa fa-times" /></button> }
    </div>
  </div>
);

export const Tab = Radium(TabBase);

export const styles = {
  active: {
    backgroundColor: 'white',
  },
  container: {
    borderRight: panelStyles.border,
    color: '#333333',
    cursor: 'default',
    display: 'inline-block',
    flex: '1 1 auto',
    ...fontStyles.default,
  },
  flexContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  inactive: {
    backgroundColor: '#d4d4d4',
  },
  button: {
    backgroundColor: 'transparent',
    border: 0,
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 3,
  },
  label: {
    paddingLeft: 15,
    display: 'inline-block',
    marginRight: 10,
  },
};
