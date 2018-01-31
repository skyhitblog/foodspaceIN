import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import {Constants} from '@common'

class ChangeQuantity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.quantity
    }
  }

  render() {
    const hitSlop = {top: 20, right: 10, bottom: 20, left: 10};
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity style={styles.btnUp}
                          hitSlop={hitSlop}
                          onPress={this.increase.bind(this)}>
          <FontAwesome name="sort-up" size={20} color="#b7c4cb" />
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.quantity}</Text>
        <TouchableOpacity style={styles.btnDown}
                          hitSlop={hitSlop}
                          onPress={this.reduced.bind(this)}>
          <FontAwesome name="sort-down" size={20} color="#b7c4cb" />
        </TouchableOpacity>
      </View>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== "undefined") {
      this.setState({quantity: nextProps.quantity})
    }
  }

  increase() {
    if (this.state.quantity < Constants.LimitAddToCart) {
      this.props.onChangeQuantity(this.state.quantity + 1)
      this.setState({quantity: this.state.quantity + 1})
    }
  }

  reduced() {
    if (this.state.quantity > 1) {
      this.props.onChangeQuantity(this.state.quantity - 1)
      this.setState({quantity: this.state.quantity - 1})
    }
  }
}
;
ChangeQuantity.defaultProps = {
  quantity: 1,
  onChangeQuantity: () => {
  }
}

const styles = StyleSheet.create({
  container: {
    width: 30,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d4dce1",
    borderRadius: 15
  },
  text: {
    fontSize: 18,
    fontFamily: Constants.fontFamily
  },
  btnUp: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  btnDown: {
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ChangeQuantity;
