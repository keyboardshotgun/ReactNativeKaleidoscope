import {Dimensions} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyleGuide = {
  deviceHeight : DEVICE_HEIGHT,
  deviceWidth : DEVICE_WIDTH,
  mainScreen: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: '#333333',
  },
  pinkButton : {
     position:'absolute'
    ,left: DEVICE_WIDTH / 2 - 40
    ,top: DEVICE_HEIGHT - 200
    ,backgroundColor:'#FF55FF'
    ,width:80,height:30
    ,borderRadius:15
    ,justifyContent: 'center'
    ,alignItems: 'center'
  },
  mainTop: {
    flex: 0.92,
    backgroundColor: '#c85959',
  },
  mainBottom: {
    flex: 0.08,
    backgroundColor: '#78b5b8',
    flexDirection: 'row',
  },
  mainTaps: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteFont : {fontSize: 16, color: '#DDDDDD'},
  movingBox : {width:150,height:150,backgroundColor:'#333333',justifyContent:'center',alignItems:'center'},
  spacing: 8,
  palette: {
    primary: '#3884ff',
    secondary: '#FF6584',
    tertiary: '#38ffb3',
    backgroundPrimary: '#d5e5ff', // === rgba(primary, 0.1)
    background: '#f2f2f2',
    border: '#f2f2f2',
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      color: '#999999',
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
    },
  },
};

export default StyleGuide;
