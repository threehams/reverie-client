import React from 'react';
import {OrderedSet, Map} from 'immutable';
import shallowCompare from 'react-addons-shallow-compare';

import Loader from '../components/Loader';
import TabContainer from '../components/TabContainer';
import Tab from '../components/Tab';

export default class EditorTabs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  static propTypes = {
    activeView: React.PropTypes.string,
    entities: React.PropTypes.instanceOf(Map),
    setActiveView: React.PropTypes.func,
    removeView: React.PropTypes.func,
    views: React.PropTypes.instanceOf(OrderedSet)
  };

  render() {
    const { views, entities, activeView, setActiveView, removeView } = this.props;
    return (
      <TabContainer>
        {
          views.map((view, index) => {
            const entity = entities.get(view);
            if (view === '0') {
              return (
                <Tab key={index} active={activeView === '0'} onClick={ () => setActiveView('0') }>
                  index.js
                </Tab>
              );
            }
            return entity ?
              <Tab key={view}
                   active={view === activeView}
                   onClick={ () => setActiveView(view) }
                   onClickClose={ () => removeView(view)}>
                {entity.name}
              </Tab> :
              <Loader key={index} />;
          })
        }
      </TabContainer>
    );
  }
}
