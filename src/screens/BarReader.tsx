import { ButtonInsertBoleto } from '@components/Button/ButtonInsertBoleto';
import { Ionicons } from '@expo/vector-icons';
import { StackActions, useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreensStack } from '@routes/auth.routes';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BarCodeScanningResult, Camera, FlashMode } from 'expo-camera';
import { FC, useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const BarReader: FC<
  NativeStackScreenProps<ScreensStack, 'BarReader'>
> = ({ navigation }) => {
  const [flashOpen, setFlashOpen] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const handleNavigateToSaveBoleto = ({ data }: BarCodeScanningResult) => {
    if (data.length >= 44) {
      navigation.dispatch(StackActions.replace('AddBoleto', { code: data }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      const getCameraPermissions = async () => {
        const { status } = await Camera.getCameraPermissionsAsync();
        if (status !== 'granted') {
          navigation.navigate('Permission');
        }
      };
      getCameraPermissions();
    }, []),
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
      }}
    >
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.itf14],
        }}
        onBarCodeScanned={handleNavigateToSaveBoleto}
        flashMode={flashOpen ? FlashMode.torch : FlashMode.off}
        style={StyleSheet.absoluteFill}
      />

      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: 20,
          }}
        >
          <View />
          <Text style={styles.title}>
            Escaneie o código de barras do boleto
          </Text>
          <TouchableOpacity
            onPress={() => setFlashOpen((prev) => !prev)}
            style={{
              height: 50,
              width: 50,
              backgroundColor: '#ccc',
              borderRadius: 999,
              opacity: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="ios-flashlight" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            height: '50%',
            opacity: 0.5,
            backgroundColor: '#000',
          }}
        ></View>
        <ButtonInsertBoleto
          onPress={() =>
            navigation.dispatch(StackActions.replace('AddBoleto', {}))
          }
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontFamily: 'Inter_400Regular',
    fontSize: ResponsiveFontScale(14),
  },
});
