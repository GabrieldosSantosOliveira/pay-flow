import { Touchable } from '@components/Touchable';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';
import { AddBoleto } from '@screens/AddBoleto';
import { BarReader } from '@screens/BarReader';
import { ExtractPage } from '@screens/ExtractPage';
import { HomePage } from '@screens/HomePage';
import { Permission } from '@screens/Permission';
import { Update } from '@screens/Update';
import { FC } from 'react';
import { View, PixelRatio } from 'react-native';
const { Navigator, Screen } = createBottomTabNavigator();
const AddBoletoButton: FC<BottomTabBarButtonProps> = ({ ...props }) => {
  return (
    <View
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <Touchable {...props}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#FF941A',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="add" size={30} color="white" />
        </View>
      </Touchable>
    </View>
  );
};
export const AuthRoutes = () => {
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
        name="BarReader"
        component={BarReader}
        options={{
          tabBarStyle: {
            height: 0,
            opacity: 0,
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-box" size={size} color={color} />
          ),
          tabBarButton: ({ ...props }) => {
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
      <Screen
        name="AddBoleto"
        component={AddBoleto}
        options={{
          tabBarStyle: { height: 0, opacity: 0 },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="Permission"
        component={Permission}
        options={{
          tabBarStyle: { height: 0, opacity: 0 },
          tabBarButton: () => null,
        }}
      />
      <Screen
        name="Update"
        component={Update}
        options={{
          tabBarStyle: { height: 0, opacity: 0 },
          tabBarButton: () => null,
        }}
      />
    </Navigator>
  );
};
