import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { PixelRatio, View, Text } from 'react-native';
type Props = {
  title: string;
};
export const BoletoListEmpty: FC<Props> = ({ title }) => {
  const { getPixelSizeForLayoutSize } = PixelRatio;
  return (
    <View
      style={{
        width: '100%',
        height: getPixelSizeForLayoutSize(10),
        paddingHorizontal: 40,
      }}
    >
      <Text
        style={{
          fontFamily: 'Inter_600SemiBold',
          fontSize: ResponsiveFontScale(14),
          color: '#585666',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </View>
  );
};
