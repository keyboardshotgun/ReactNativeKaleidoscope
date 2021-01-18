import {Dimensions} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const StyleGuide : any = {
    deviceHeight: DEVICE_HEIGHT,
    deviceWidth: DEVICE_WIDTH,
    mainScreen: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        backgroundColor: '#333333',
    },
    mainOcean: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        backgroundColor: '#9b1c1c',
    },
    mainScreenSky: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        backgroundColor: '#01caff',
    },
    pinkButton: {
        position: 'absolute'
        , left: DEVICE_WIDTH / 2 - 40
        , top: DEVICE_HEIGHT - 150
        , backgroundColor: '#FF55FF'
        , width: 80, height: 30
        , borderRadius: 15
        , justifyContent: 'center'
        , alignItems: 'center'
    },
    mainTop: {
        flex: 1,
        backgroundColor: '#c85959',
    },
    mainBottom: {
        flex: 1,
        backgroundColor: '#78b5b8',
        flexDirection: 'column',
    },
    mainTaps: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    whiteFont: {fontSize: 16, color: '#DDDDDD'},
    movingBox: {width: 150, height: 150, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center'},
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
    staticBox : {width:300,height:300,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#333333'},
    kBox: {
        position: 'absolute',
        left: -1,
        top: -1,
        width: 300,
        height: 300,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#333333'
    },
    colors_data : [
        {
            id: 0,
            start: "#00E0D3",
            end: "#00B4D4",
        },
        {
            id: 1,
            start: "#00B4D4",
            end: "#409CAE",
        },
        {
            id: 2,
            start: "#66D8A4",
            end: "#409CAE",
        },
        {
            id: 3,
            start: "#FC727B",
            end: "#F468A0",
        },
        {
            id: 4,
            start: "#8289EA",
            end: "#7A6FC1",
        },
        {
            id: 5,
            start: "#FEC7A3",
            end: "#FD9F9C",
        },

        {
            id: 6,
            start: "#023fa5",
            end: "#7d87b9",
        },

        {
            id: 7,
            start: "#bec1d4",
            end:  "#d6bcc0",
        },
        {
            id: 8,
            start: "#bb7784",
            end: "#8e063b",
        },

        {
            id: 9,
            start: "#4a6fe3",
            end: "#8595e1",
        },
        {
            id: 10,
            start: "#b5bbe3",
            end: "#e6afb9",
        },
        {
            id: 11,
            start: "#e07b91",
            end: "#d33f6a",
        },
        {
            id: 12,
            start: "#11c638",
            end: "#8dd593",
        },
        {
            id: 13,
            start: "#c6dec7",
            end: "#ead3c6",
        },
        {
            id: 14,
            start: "#f0b98d",
            end: "#0fcfc0",
        },
        {
            id: 15,
            start: "#9cded6",
            end: "#d5eae7",
        },
        {
            id: 16,
            start: "#f6c4e1",
            end: "#f79cd4",
        },
    ],
};

export default StyleGuide;
