import { useAuth } from '@hooks/useAuth';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { View, Image, Text, PixelRatio } from 'react-native';
export const Header = () => {
  const { user } = useAuth();
  return (
    <View
      style={{
        height: PixelRatio.getPixelSizeForLayoutSize(50),
        width: '100%',
        backgroundColor: '#FF941A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Text
          style={{
            fontFamily: 'Lexend_600SemiBold',
            fontSize: ResponsiveFontScale(18),
            color: '#FFFFFF',
          }}
          numberOfLines={1}
        >
          <Text
            style={{
              fontFamily: 'Lexend_400Regular',
              fontSize: ResponsiveFontScale(18),
              color: '#FFFFFF',
            }}
          >
            Olá,{' '}
          </Text>
          {user.displayName}
        </Text>
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: ResponsiveFontScale(12),
            color: '#FAFAFC',
          }}
        >
          Mantenha suas contas em dia
        </Text>
      </View>
      <Image
        source={{ uri: user.photoURL }}
        style={{
          width: PixelRatio.getPixelSizeForLayoutSize(20),
          height: PixelRatio.getPixelSizeForLayoutSize(20),
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </View>
  );
};
