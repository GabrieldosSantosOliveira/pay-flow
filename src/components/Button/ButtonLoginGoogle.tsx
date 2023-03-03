import GoogleLogo from '@assets/GoogleLogo.svg';
import { Touchable } from '@components/Touchable';
import { FC } from 'react';
import {
  View,
  Text,
  TouchableOpacityProps,
  ViewProps,
  ActivityIndicator,
} from 'react-native';
type IButtonLoginGoogle = TouchableOpacityProps & {
  _content?: ViewProps;
  isLoading?: boolean;
};

export const ButtonLoginGoogle: FC<IButtonLoginGoogle> = ({
  _content,
  isLoading,
  ...props
}) => {
  return (
    <Touchable {...props}>
      <View
        style={[
          {
            flexDirection: 'row',
            width: '100%',
            height: 56,
            backgroundColor: '#FAFAFC',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#E3E3E6',
          },
          _content?.style,
        ]}
      >
        {!isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRightWidth: 1,
                height: '100%',
                borderColor: '#E9E9EB',
              }}
            >
              <GoogleLogo width={24} height={24} />
            </View>
            <View
              style={{
                flex: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 15 }}>
                Entrar com Google
              </Text>
            </View>
          </>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRightWidth: 1,
              height: '100%',
              borderColor: '#E9E9EB',
            }}
          >
            <ActivityIndicator size="small" color="#FF941A" />
          </View>
        )}
      </View>
    </Touchable>
  );
};
