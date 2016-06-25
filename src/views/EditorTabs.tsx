import * as React from 'react';
import {OrderedSet, Map} from 'immutable';
import shallowCompare = require('react-addons-shallow-compare');

import { Loader } from '../components/Loader';
import { TabContainer } from '../components/TabContainer';
import { Tab } from '../components/Tab';
import StatusEffect from '../components/StatusEffect';
import { Entity } from '../records';

interface EditorTabsProps {
  activeView: string;
  entities: Map<string, Entity>;
  setActiveView: Function;
  removeView: Function;
  views: OrderedSet<string>;
}

export default class EditorTabs extends React.Component<EditorTabsProps, {}> {
  public shouldComponentUpdate(nextProps: EditorTabsProps, nextState: {}) {
    /* istanbul-ignore-next */
    return shallowCompare(this, nextProps, nextState);
  }

  public render() {
    const { views, entities, activeView, setActiveView, removeView } = this.props;
    return (
      <TabContainer>
        {
          views.map((view, index) => {
            const entity = entities.get(view);
            if (view === '0') {
              return (
                <Tab key={index} active={activeView === '0'} onClick={ () => setActiveView('0') }>
                  <StatusEffect>index.js</StatusEffect>
                </Tab>
              );
            }
            return entity ?
              <Tab key={view}
                   active={view === activeView}
                   onClick={ () => setActiveView(view) }
                   onClickClose={ () => removeView(view)}>
                <StatusEffect>{entity.name}</StatusEffect>
              </Tab> :
              <Loader key={index} />;
          })
        }
      </TabContainer>
    );
  }
}
