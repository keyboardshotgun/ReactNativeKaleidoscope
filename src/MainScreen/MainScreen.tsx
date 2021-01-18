import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import StyleGuide from '../components/StyleGuide';
const MainScreen = ({navigation} : any) => {
    return (
    <View style={StyleGuide.mainScreen}>
      <View style={StyleGuide.mainBottom}>
          <TouchableOpacity
              onPress={() => navigation.navigate('RandomScreen')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000033'}] }>
              <Text style={StyleGuide.whiteFont}>{'Random Box'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('PanGesture')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000067'}] }>
              <Text style={StyleGuide.whiteFont}>{'PanGesture'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('BouncingWave')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000099'}] }>
              <Text style={StyleGuide.whiteFont}>{'PshEye Bird'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('TestScreen')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000067'}] }>
              <Text style={StyleGuide.whiteFont}>{'Kaleidoscope box'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('BouncingBox')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000033'}] }>
              <Text style={StyleGuide.whiteFont}>{'Sunny'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => navigation.navigate('ScrollTypeA')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000066'}] }>
              <Text style={StyleGuide.whiteFont}>{'ScrollTypeA'}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};
export default MainScreen;
