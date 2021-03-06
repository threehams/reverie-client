import { OrderedSet } from 'immutable';
import * as React from 'react';
import pure from 'recompose/pure';

import { Loader } from '../components/Loader';
import { StatusEffect } from '../components/StatusEffect';
import { Tab } from '../components/Tab';
import { TabContainer } from '../components/TabContainer';
import { EntityState } from '../records';

interface EditorTabsProps {
  activeView: string;
  entities: EntityState;
  setActiveView: Function;
  removeView: Function;
  views: OrderedSet<string>;
}

export const EditorTabsBase: React.StatelessComponent<EditorTabsProps> = ({
  views,
  entities,
  activeView,
  setActiveView,
  removeView,
}) => (
  <TabContainer>
    {
      views.map((view, index) => {
        const entity = entities.get(view);
        if (view === '0') {
          return (
            <Tab
              key={index}
              active={activeView === '0'}
              onClick={ () => setActiveView('0') }
            >
              <StatusEffect>index.js</StatusEffect>
            </Tab>
          );
        }
        return entity ?
          <Tab
            key={view}
            active={view === activeView}
            onClick={ () => setActiveView(view) }
            onClickClose={ () => removeView(view)}
          >
            <StatusEffect>{entity.name}</StatusEffect>
          </Tab> :
          <Loader key={index} />;
      })
    }
  </TabContainer>
);

export const EditorTabs = pure(EditorTabsBase);
