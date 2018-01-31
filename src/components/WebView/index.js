import React, {Component} from "react";
import {View, Text, Image, Dimensions} from "react-native";
import HTML from 'react-native-render-html'
import {Tools, Constants, warn, Events} from "@common";
const {width} = Dimensions.get("window");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: Constants.fontText.size
    };

    Tools.getFontSizePostDetail().then((data) => {
      this.setState({fontSize: data})
    })
  }

  render() {
    const htmlContent = this.props.html;
    const tagsStyles = {
      p: {margin: 0, padding: 0}
    }

    return <View style={{padding: 10}}>
      <HTML html={htmlContent + '<div style="width: ' + (width - 40)+ '"></div>' }
            tagsStyles={tagsStyles}
            renderers={
              {
                img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                  const {src, alt, width, height} = htmlAttribs;
                  if (!src) {
                    return false;
                  }
                  const newWidth = Dimensions.get('window').width - 20;
                  const newHeight = height * newWidth / width;
                  return <Image source={{uri: src}}
                                style={{width: newWidth, height: newHeight, resizeMode: 'contain'}}/>
                }
              }
            }
      /></View>

  }
}
