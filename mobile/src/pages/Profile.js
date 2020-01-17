import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

// import { Container } from './styles';

export default function Profileexpo({navigation}) {
  return (
    <WebView style={{flex:1}} source={{uri: `https://github.com/${navigation.getParam('github')}`}} />
  );
}
