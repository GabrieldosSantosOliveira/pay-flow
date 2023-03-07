import { ResponsiveFontScale } from '@utils/ResponsiveFontScale';
import { FC } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Touchable } from './../Touchable';
interface Props {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
  onPress: () => void;
  isLoading?: boolean;
}
export const ButtonTabBar: FC<Props> = ({
  title,
  type = 'PRIMARY',
  onPress,
  isLoading = false,
}) => {
  return (
    <Touchable disabled={isLoading} onPress={onPress}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={type === 'PRIMARY' ? '#FF941A' : '#706E7A'}
          />
        ) : (
          <Text
            style={{
              fontSize: ResponsiveFontScale(14),
              fontFamily: 'Inter_400Regular',
              color: type === 'PRIMARY' ? '#FF941A' : '#706E7A',
            }}
          >
            {title}
          </Text>
        )}
      </View>
    </Touchable>
  );
};
