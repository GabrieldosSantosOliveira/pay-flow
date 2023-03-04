import { ButtonInsertBoleto } from '@components/Button/ButtonInsertBoleto';
import { useFocusEffect } from '@react-navigation/native';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FC, useState } from 'react';
import {
  Alert,
  PixelRatio,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const BarReader: FC = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const { roundToNearestPixel } = PixelRatio;
  useFocusEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE,
      );
    }
    changeScreenOrientation();
  });
  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
    ...props
  }) => {
    if (type == '128' && data.length === 44) {
      Alert.alert(
        `Bar code with type ${type} and data ${data} has been scanned! ${JSON.stringify(
          props,
        )}`,
      );
      setScanned(true);
    }
  };
  if (!hasPermission)
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <Text>De permissão de sua Conta</Text>
      </View>
    );
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Camera
        onBarCodeScanned={scanned ? null : handleBarCodeScanned}
        style={{
          zIndex: 1,
          flex: 1,
        }}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.itf14],
        }}
      />
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
          width: roundToNearestPixel(width),
          height: roundToNearestPixel(height),
          zIndex: 2,
          position: 'absolute',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: '#FFFFFF',
            fontFamily: 'Inter_400Regular',
            fontSize: ResponsiveFontScale(14),
          }}
        >
          Escaneie o código de barras do boleto
        </Text>
        <View></View>
        <ButtonInsertBoleto onPress={() => setScanned(false)} />
      </View>
    </View>
  );
};
