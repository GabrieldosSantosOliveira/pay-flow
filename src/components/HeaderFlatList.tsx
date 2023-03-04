import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { View, PixelRatio, Text } from 'react-native';
type Props = {
  title: string;
  subTitle?: string;
};
export const HeaderFlatList: FC<Props> = ({ title, subTitle }) => {
  const { getPixelSizeForLayoutSize } = PixelRatio;
  const { width } = useWindowDimensions();
  const BoxEmpty = () => <View />;
  return (
    <View
      style={{
        height: getPixelSizeForLayoutSize(30),
        width: width - 48,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#E3E3E6',
        alignSelf: 'center',
        marginBottom: 24,
      }}
    >
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: ResponsiveFontScale(18),
          color: '#585666',
        }}
      >
        {title}
      </Text>
      {subTitle ? (
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: ResponsiveFontScale(12),
            color: '#706E7A',
          }}
        >
          {subTitle}
        </Text>
      ) : (
        <BoxEmpty />
      )}
    </View>
  );
};
