import { Touchable } from '@components/Touchable';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC, ReactNode } from 'react';
import { Text } from 'react-native';
import { PixelRatio, View, GestureResponderEvent } from 'react-native';
type Props = {
  type?: 'PRIMARY' | 'SECONDARY';
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  icon?: ReactNode;
};
export const ButtonWarning: FC<Props> = ({
  onPress,
  text,
  type = 'PRIMARY',
  icon,
}) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          backgroundColor: type === 'PRIMARY' ? '#E83F5B' : 'transparent',
          borderRadius: 8,
          paddingHorizontal: 20,
          height: PixelRatio.getPixelSizeForLayoutSize(20),
          justifyContent: 'space-between',
        }}
      >
        {icon}
        <Text
          style={{
            fontFamily: 'Lexend_600SemiBold',
            fontSize: ResponsiveFontScale(16),
            color: type === 'PRIMARY' ? 'white' : '#E83F5B',
          }}
        >
          {text}
        </Text>
        <View />
      </View>
    </Touchable>
  );
};
