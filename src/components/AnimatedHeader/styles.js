import {StyleSheet, Platform, Dimensions} from 'react-native';
import {Color, Device, Config, Constants} from "@common";
const {width} = Dimensions.get("window")

export default StyleSheet.create({
  headerLabel: {
    color: '#333',
    fontSize: 28,
    fontFamily: Constants.fontHeader,
    marginBottom: 0,
    marginLeft: 22,

    position: 'absolute',
    top: 50,
    ...Platform.select({
      android: {
        paddingTop: Config.showStatusBar ? 23 : 2,
      },
    }),
  },
  headerView: {
    width: width,
    ...Platform.select({
      ios: {
        height: 50,
      },
      android: {
        height: Config.showStatusBar ? 70 : 50,
      },
    }),
  },
  flatlist: {
    paddingTop: 40
  },
  homeMenu : {
    marginLeft: 16,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: Device.isIphoneX ? 50 : 22,
      },
      android: {
        top: Config.showStatusBar? 30 : 10,
      },
    }),
    zIndex: 9,
  }
});
