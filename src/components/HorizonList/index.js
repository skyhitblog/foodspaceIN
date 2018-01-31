import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Constants, HorizonLayouts, Languages} from '@common';
import {PostBanner} from "@components";
import {warn} from "@app/Omni"
import HorizonList from './HList';

export default class Index extends Component {
  render() {
    const {onShowAll, onViewProductScreen} = this.props;
    return (
      <ScrollView>
        {HorizonLayouts.map((config, index) => <HorizonList horizontal
                                                            onViewProductScreen={onViewProductScreen}
                                                            onShowAll={onShowAll}
                                                            key={"taglist-" + index}
                                                            config={config}
                                                            index={index}/>
        )}
      </ScrollView>)
  }
}
