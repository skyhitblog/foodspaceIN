import React, {Component} from "react";
import {Platform, View, TouchableOpacity} from "react-native";
import {Events, warn} from "@common";
import Modal from "react-native-modalbox";
import styles from "./styles";
import Icon from "@expo/vector-icons/SimpleLineIcons";
export default class Index extends Component {

  closeModal = () => {
    this.modal.close();
  }

  closeModalLayout() {
    this.modal.close();
  }

  openModal() {
    this.modal.open();
  }

  render() {
    const {type, css} = this.props;
    return (
      <Modal ref={(modal) => this.modal = modal}
             animationDuration={100}
             backdropOpacity={Platform.OS == 'android' ? 0.9 : 0.5}
             position={"top"}
             style={[typeof type != 'undefined' ? styles.modalReadlater : styles.modalBoxWrap, css]}>

        <View style={styles.wrap}>
          {this.props.children}
        </View>

        <TouchableOpacity
          style={styles.iconZoom}
          onPress={this.closeModal}>
          <Icon style={styles.textClose}
                name="close"
                size={22} color={'rgba(0,0,0, 0.4)'}
                backgroundColor="transparent"/>
        </TouchableOpacity>
      </Modal>
    );
  }
}
