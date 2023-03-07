import { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
export const Loading: FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="small" color="#FF941A" />
    </View>
  );
};
