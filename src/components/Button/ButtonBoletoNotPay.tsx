import { Touchable } from '@components/Touchable';
import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { Text } from 'react-native';
import { PixelRatio, View, GestureResponderEvent } from 'react-native';
type Props = {
  type?: 'PRIMARY' | 'SECONDARY';
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};
export const ButtonBoletoNotPay: FC<Props> = ({
  onPress,
  text,
  type = 'PRIMARY',
}) => {
  return (
    <Touchable onPress={onPress}>
      <View
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: type === 'PRIMARY' ? '#FF941A' : '#FAFAFC',
          borderWidth: 1,
          borderColor: type === 'PRIMARY' ? '#FF941A' : '#E3E3E6',
          borderRadius: 8,
          paddingHorizontal: 20,
          height: PixelRatio.getPixelSizeForLayoutSize(25),
        }}
      >
        <Text
          style={{
            fontFamily: 'Inter_400Regular',
            fontSize: ResponsiveFontScale(16),
            color: type === 'PRIMARY' ? 'white' : '#666666',
          }}
        >
          {text}
        </Text>
      </View>
    </Touchable>
  );
};
