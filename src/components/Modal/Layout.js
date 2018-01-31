import React, {Component} from "react";
import {View} from "react-native";
import styles from "./styles";
import {IconImage, ModalBox} from "@components";
import {Images, Constants, Events, Languages} from '@common';
import ItemLayout from "./ItemLayout";

const layouts = [
  {layout: Constants.Layout.card, image: Images.icons.iconCard, text: Languages.cardView},
  {layout: Constants.Layout.simple, image: Images.icons.iconRight, text: Languages.simpleView},
  {layout: Constants.Layout.twoColumn, image: Images.icons.iconColumn, text: Languages.twoColumnView},
  {layout: Constants.Layout.threeColumn, image: Images.icons.iconThree, text: Languages.threeColumnView},
  {layout: Constants.Layout.horizon, image: Images.icons.iconHorizal, text: Languages.horizontal},
  {layout: Constants.Layout.advance, image: Images.icons.iconAdvance, text: Languages.advanceView},
]

export default class Layout extends Component {

  componentDidMount() {
    Events.onOpenModalLayout(this.open);
  }

  open = () => this.modal.openModal();

  close = () => this.modal.closeModalLayout();

  render() {
    return (
      <ModalBox ref={(modal) => this.modal = modal }>
        <View style={styles.layoutBox}>
          {layouts.map((item, index) => {
            return <ItemLayout key={index}
                         close={this.close}
                         layout={item.layout}
                         image={item.image}
                         text={item.text}/>
          })}

        </View>
      </ModalBox>
    );
  }
}
