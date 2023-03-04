import 'react-native-gesture-handler';
import { SplashScreen } from '@components/SplashScreen';
import { AuthProvider } from '@contexts/AuthContext';
import {
  Inter_600SemiBold,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter';
import {
  Lexend_600SemiBold,
  Lexend_400Regular,
  useFonts,
} from '@expo-google-fonts/lexend';
import { Routes } from '@routes/index';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const [isFontsLoaded] = useFonts({
    Lexend_600SemiBold,
    Inter_600SemiBold,
    Lexend_400Regular,
    Inter_400Regular,
    Inter_500Medium,
  });
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor="#BF6415" />

        {isFontsLoaded ? <Routes /> : <SplashScreen />}
      </SafeAreaProvider>
    </AuthProvider>
  );
}
