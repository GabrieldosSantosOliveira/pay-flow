import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

export const AddBoletoButton: FC<BottomTabBarButtonProps> = (props) => {
  return (
    <View
      style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}
    >
      <TouchableWithoutFeedback {...props}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#FF941A',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 50,
          }}
        >
          <MaterialIcons name="add" size={30} color="white" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
