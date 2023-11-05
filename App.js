import React from 'react';
import { View, Text, Button, DeviceEventEmitter } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/homePage';
import SearchResultsPage from './src/pages/searchResultsPage';
import VideoPlayerPage from './src/pages/videoPlayerPage';
import { BaseComponent } from './src/components/baseComponent/baseComponent'

const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomePage">
          <Stack.Screen name="HomePage" component={HomePage} options=
            {{
              headerStyle: { backgroundColor: '#0a2e38' },
              headerShown: false,
              cardShadowEnabled: false,
              //  cardStyle: {backgroundColor: '#0a2e38'};

              headerTitle: props => <Text>aaa</Text>,
              headerRight: () => (
                <Button
                  onPress={(e) => { }}
                  title="主页"
                  color="#000"
                  backgroundcolor="#000"
                />
              ),
            }}
          />
          <Stack.Screen name='SearchResultsPage' navigate={this.props.navigation} component={SearchResultsPage} options={{
            headerTitle: props => <Text>aaa</Text>,
            headerShown: false,

            headerRight: () => (
              <Button
                onPress={(e) => {
                  
                  // 发送场景变化的信息
                  // DeviceEventEmitter.emit('sceneChange', { "123":"qwe" });
                  // SearchResultsPage.navigationRightBtnClick()
                  // this.SearchResultsPage.navigationRightBtnClick()
                }
                }
                title=""
                color="#000"
              />
            ),
          }} />
          <Stack.Screen name='VideoPlayerPage' component={VideoPlayerPage}
            options={{
              headerTitle: props => <Text>aaa</Text>,
              headerShown: false,

              headerRight: () => (
                <Button
                  onPress={(e) => {
                    DeviceEventEmitter.emit('sceneChange', { "123": "qwe" });
                  }
                  }
                  title=""
                  color="#000"
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;