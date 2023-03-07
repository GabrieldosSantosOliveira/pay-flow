import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, Text } from 'react-native';
type Props = {
  title: string;
  subTitle: string;
  type?: 'WARNING' | 'SUCCESS';
};
export const DescriptionLinePay: FC<Props> = ({
  subTitle,
  title,
  type = 'SUCCESS',
}) => {
  return (
    <View
      style={{
        width: '100%',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontFamily: 'Lexend_600SemiBold',
          fontSize: ResponsiveFontScale(12),
          color: '#585666',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Lexend_600SemiBold',
          fontSize: ResponsiveFontScale(12),
          color: type === 'WARNING' ? 'red' : '#5a4fcf',
        }}
      >
        {subTitle}
      </Text>
    </View>
  );
};
