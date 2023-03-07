import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { View, PixelRatio } from 'react-native';
export const HeaderAddBoleto: FC = () => {
  const { getPixelSizeForLayoutSize } = PixelRatio;
  const { navigate } = useNavigation();
  return (
    <View
      style={{
        height: getPixelSizeForLayoutSize(30),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
      }}
    >
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="#B1B0B8"
        onPress={() => navigate('BarReader')}
      />
    </View>
  );
};
