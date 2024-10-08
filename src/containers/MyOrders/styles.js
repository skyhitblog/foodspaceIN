import {StyleSheet, Platform} from 'react-native';
import {Color, Constants} from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: 70,
    height: 70,
    tintColor: "#B7C4CB"
  },
  numberWrap: {
    position: "absolute",
    top: -18,
    right: -15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "red",
    justifyContent: "center",
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    backgroundColor: 'rgba(0,0,0,0)'
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: 230,
    lineHeight: 40,
    opacity: 0.8,
    fontFamily: Constants.fontHeader
  },
  labelView: {
    width: 90 * Constants.Window.width / 100,
    backgroundColor: 'rgba(206, 215, 221, 1)',
    borderRadius: 10,
    padding: 5
  },
  orderDetailLabel: {
    fontSize: 13,
    textDecorationLine: 'underline',
    color: Color.TabActive,
    marginTop: 10,
    marginBottom: 4,
    fontFamily: Constants.fontFamily
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingLeft: 6
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Constants.fontFamily
  },
  label: {
    fontFamily: Constants.fontHeader,
    fontSize: 16,
    color: Color.Text,
    marginLeft: 8
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    color: "#758692",
    width: 230,
    marginTop: 10,
    lineHeight: 25
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary
  },
  buttonText: {
    fontSize: 15,
  },
  bottomView: {
    flexDirection: "row",
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: "#d4dce1",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center"
  },
  total: {
    fontSize: 16,
    marginLeft: 15,
    color: '#999'
  },
  money: {
    fontSize: 16,
    marginRight: 15,
    color: "#0f98ec"
  },

  listView: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
  },
  flatlist: {
    paddingTop: Platform.OS == 'ios' ? 40 : 50
  },
});
