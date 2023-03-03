import LogoMini from '@assets/logomini.svg';
import PersonSvg from '@assets/person.svg';
import { ButtonLoginGoogle } from '@components/Button/ButtonLoginGoogle';
import { useAuth } from '@hooks/useAuth';
import { StatusBar } from 'expo-status-bar';
import { View, useWindowDimensions, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const HomePage = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { SingInWithGoogle, isLoadingUser } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        alignItems: 'center',
      }}
    >
      <StatusBar backgroundColor="#BF6415" />
      <View
        style={{
          backgroundColor: '#FF941A',
          width: '100%',
          height: height * 0.36,
          alignItems: 'center',
        }}
      >
        <PersonSvg
          style={{ marginTop: height * 0.08 }}
          width={208}
          height={300}
        />
      </View>
      <View
        style={{
          marginTop: height * 0.08,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          paddingHorizontal: 40,
        }}
      >
        <LogoMini />
        <Text
          style={{
            textAlign: 'center',
            color: '#585666',
            lineHeight: 40,
            fontSize: 32,
            fontFamily: 'Lexend_600SemiBold',
            paddingHorizontal: 30,
          }}
        >
          Organize seus boletos em um só lugar
        </Text>
        <ButtonLoginGoogle
          isLoading={isLoadingUser}
          onPress={SingInWithGoogle}
          disabled={isLoadingUser}
        />
      </View>
    </View>
  );
};
