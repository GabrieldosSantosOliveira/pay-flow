import { ButtonSecondary } from '@components/Button/ButtonSecondary';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useChangeOrientation } from '@hooks/useChangeOrientation';
import { useNavigation } from '@react-navigation/native';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera } from 'react-native-vision-camera';
export const Permission: FC = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  useChangeOrientation();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 20,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
      }}
    >
      <Text
        style={{
          fontFamily: 'Lexend_600SemiBold',
          fontSize: ResponsiveFontScale(17),
          color: '#585666',
          textAlign: 'center',
        }}
      >
        De permissão do uso de sua camera para poder escanear o boleto ou
        informe o código manualmente
      </Text>
      <View style={{ width: '100%', gap: 20 }}>
        <ButtonSecondary
          icon={<MaterialIcons name="lock" size={24} />}
          onPress={async () => {
            const status = await Camera.requestCameraPermission();
            if (status === 'authorized') {
              navigate('BarReader');
            }
          }}
          text="Permitir"
        />
        <ButtonSecondary
          onPress={() => {
            navigate('AddBoleto', {});
          }}
          type="SECONDARY"
          text="Inserir manualmente"
          icon={<AntDesign name="barcode" size={24} />}
        />
      </View>
    </View>
  );
};
