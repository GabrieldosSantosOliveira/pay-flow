import { ButtonSecondary } from '@components/Button/ButtonSecondary';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { ScreensStack } from '@routes/auth.routes';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { Camera } from 'expo-camera';
import { FC } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const Permission: FC<StackScreenProps<ScreensStack, 'Permission'>> = ({
  navigation,
}) => {
  const insets = useSafeAreaInsets();
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
            const status = await Camera.requestCameraPermissionsAsync();
            if (status.granted) {
              navigation.navigate('BarReader');
            }
          }}
          text="Permitir"
        />
        <ButtonSecondary
          onPress={() => {
            navigation.navigate('AddBoleto', {});
          }}
          type="SECONDARY"
          text="Inserir manualmente"
          icon={<AntDesign name="barcode" size={24} />}
        />
      </View>
    </View>
  );
};
