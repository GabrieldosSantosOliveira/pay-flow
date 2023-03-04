import { Boleto } from '@components/Boleto';
import { Header } from '@components/Header';
import { HeaderFlatList } from '@components/HeaderFlatList';
import { FC } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { data } from './../../data';
export const ExtractPage: FC = () => {
  const insets = useSafeAreaInsets();
  const renderItem: FC<ListRenderItemInfo<(typeof data)[0]>> = ({ item }) => {
    return <Boleto {...item} />;
  };
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingTop: insets.top,
      }}
    >
      <Header />
      <FlatList
        ListHeaderComponent={() => (
          <HeaderFlatList
            subTitle={`${data.length} pagos`}
            title="Meus Extratos"
          />
        )}
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </View>
  );
};
