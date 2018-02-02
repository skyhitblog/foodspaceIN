/**
 * Created on 20/12/2016.
 */
import {Dimensions, Platform} from 'react-native';
import Color from "./Color";
const _height = Dimensions.get('window').height;
const {height, width} = Dimensions.get('window');
const {heightWindow} = Dimensions.get('window');
import Constants from "./Constants";
import Device from './Device'
import Config from './Config'

let Styles = {
  width: Dimensions.get('window').width,
  height: Platform.OS !== 'ios' ? _height : (_height - 20),
  navBarHeight: Platform !== 'ios' ? (height - heightWindow) : 0,
  headerHeight: Platform.OS === 'ios' ? 40 : 56,

  thumbnailRatio: 1.2, //Thumbnail ratio, the product display height = width * thumbnail ratio

  app: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingTop: Device.ToolbarHeight
  },

  FontSize: {
    tiny: 12,
    small: 14,
    medium: 16,
    big: 18,
    large: 20,
  },
  IconSize: {
    TextInput: 25,
    ToolBar: 18,
    Inline: 20,
  },
  FontFamily: {}
};

Styles.Common = {
  Column: {},
  ColumnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ColumnCenterTop: {
    alignItems: 'center',
  },
  ColumnCenterBottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ColumnCenterLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  ColumnCenterRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  Row: {
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        top: !Config.showStatusBar ? (Device.isIphoneX ? -20 : -8) : (Device.isIphoneX ? -15 : 0),
      },
      android: {
        top: 0,
      }
    })
  },
  RowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RowCenterTop: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  RowCenterBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  RowCenterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RowCenterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  RowCenterBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //More traits

  IconSearchView: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 10,
    borderRadius: 50,

    shadowOffset: {width: 0, height: -4},
    shadowColor: 'rgba(0,0,0, .3)',
    elevation: 10,
    shadowOpacity: 0.1,
    zIndex: 9999,
  },
  IconSearch: {
    width: 20,
    height: 20,
    margin: 12,
    zIndex: 9999,
  },
  logo: {
    width: Platform.OS === 'ios' ? 180 : 300,
    height: Platform.OS === 'ios' ? 20 : 60,
    resizeMode: "contain",
    ...Platform.select({
      ios: {
        marginTop: Device.isIphoneX ? -12 : 2,
      },
      android: {
        marginTop: 2,
      }
    })
  },
  toolbar: {
    backgroundColor: Color.navigationBarColor,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    justifyContent: 'center',
    width: width,
    ...Platform.select({
      ios: {
        height: Config.showStatusBar ? (Device.isIphoneX ? 25 : 40) : (Device.isIphoneX ? 5 : 25),
      },
      android: {
        height: Config.showStatusBar ? 70 : 46,
        paddingTop: Config.showStatusBar ? 24 : 0,
      }
    })
  },

  headerStyle: {
    color: Color.navigationTitleColor,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Constants.fontFamily,
    ...Platform.select({
      ios: {
        marginBottom: !Config.showStatusBar ? 14 : 0
      },
      android: {
        marginBottom: 4
      }
    })
  },
  headerStyleWishList: {
    color: Color.navigationTitleColor,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Constants.fontFamily,
    marginBottom: !Config.showStatusBar ? (Device.isIphoneX ? 40 : 15) : (Device.isIphoneX ? 25 : 5),
  },
  toolbarIcon: {
    "width": 16,
    "height": 16,
    "resizeMode": "contain",

    "marginRight": 12,
    "marginBottom": 12,
    "marginLeft": 8,
    "opacity": 0.8,
    ...Platform.select({
      ios: {
        marginTop: Config.showStatusBar ? (Device.isIphoneX ? -20 : 7) : (Device.isIphoneX ? -30 : -3 ),
      },
      android: {
        marginTop: 10
      }
    })
  },
  iconBack: {
    width: 24,
    marginLeft: 20,
  },
  toolbarFloat : {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    borderBottomWidth: 0,

    width: width,
    ...Platform.select({
      ios: {
        height: Config.showStatusBar ? (Device.isIphoneX ? 25 : 40) : (Device.isIphoneX ? 5 : 25),
      },
      android: {
        height: Config.showStatusBar ? 70 : 46,
        paddingTop: Config.showStatusBar ? 24 : 0,
      }
    })
  }

};

export default Styles;
