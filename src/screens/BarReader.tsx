import 'react-native-reanimated';
import { ButtonInsertBoleto } from '@components/Button/ButtonInsertBoleto';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import * as ScreenOrientation from 'expo-screen-orientation';
import { FC, useState, useEffect } from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { runOnJS } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner';
export const BarReader: FC = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const insets = useSafeAreaInsets();
  const [barCode, setBarCode] = useState<string>('');
  const { width, height } = useWindowDimensions();
  const { navigate } = useNavigation();
  const { roundToNearestPixel } = PixelRatio;
  useEffect(() => {
    if (barCode) {
      navigate('AddBoleto', { code: barCode });
    }
  }, [barCode]);
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const detectedBarCodes = scanBarcodes(frame, [BarcodeFormat.ITF], {
      checkInverted: true,
    });
    runOnJS(setBarCode)(detectedBarCodes[0].content.data as string);
  }, []);

  useFocusEffect(() => {
    const getCameraPermissions = async () => {
      const status = await Camera.getCameraPermissionStatus();
      if (status !== 'authorized') {
        navigate('Permission');
      } else {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE,
        );
      }
    };
    getCameraPermissions();
  });
  if (!device) {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: 'black',
        }}
      ></View>
    );
  }
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
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
        style={{
          width,
          height,
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
        <Text style={styles.title}>Escaneie o código de barras do boleto</Text>
        <View></View>
        <ButtonInsertBoleto onPress={() => navigate('AddBoleto', {})} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: ResponsiveFontScale(14),
  },
});
