import Logo from '@assets/Logo.png';
import { View, Image } from 'react-native';
export const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image source={Logo} resizeMode="center" />
    </View>
  );
};
