import { Loading } from '@components/Loading/Loading';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExtractPage } from '@screens/ExtractPage';
import { HomePage } from '@screens/HomePage';
import { PixelRatio } from 'react-native';

import { AddBoletoButton } from './components/ButtonBarReader';

export type BottomTabsScreens = {
  HomePage: undefined;
  ExtractPage: undefined;
  ModalBarReader: undefined;
};
const { Screen, Navigator } = createBottomTabNavigator<BottomTabsScreens>();

export const BottomTabsRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF941A',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: PixelRatio.getPixelSizeForLayoutSize(30),
        },
      }}
    >
      <Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-minus"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="ModalBarReader"
        component={Loading}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('BarReader');
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-box" size={size} color={color} />
          ),
          tabBarButton: (props) => {
            return <AddBoletoButton {...props} />;
          },
        }}
      />
      <Screen
        name="ExtractPage"
        component={ExtractPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="filetext1" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
