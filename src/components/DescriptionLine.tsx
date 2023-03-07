import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, Text } from 'react-native';
type Props = {
  title: string;
  subTitle: string;
};
export const DescriptionLine: FC<Props> = ({ subTitle, title }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 80,
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
      <View
        style={{
          flex: 1,
          maxWidth: '50%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Text
          style={{
            fontFamily: 'Lexend_600SemiBold',
            fontSize: ResponsiveFontScale(12),
            color: 'black',
            width: '100%',
            textAlign: 'right',
          }}
          numberOfLines={1}
        >
          {subTitle}
        </Text>
      </View>
    </View>
  );
};
