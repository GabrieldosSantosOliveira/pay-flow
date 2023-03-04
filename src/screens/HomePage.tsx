import { Boleto } from '@components/Boleto';
import { Header } from '@components/Header';
import { HeaderBar } from '@components/HeaderBar';
import { HeaderFlatList } from '@components/HeaderFlatList';
import { FC } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export const HomePage: FC = () => {
  const insets = useSafeAreaInsets();
  const data = [
    {
      id: '1',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '2',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '3',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '4',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '5',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '6',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '7',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '8',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '9',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '10',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '11',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '12',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '13',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '14',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '15',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '16',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '17',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '18',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '19',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
    {
      id: '20',
      nameOfBillet: 'MacBook Pro 13',
      valueOfBillet: 10000,
      maturity: new Date(),
      codeOfBillet: '3456789098765434567',
    },
  ];
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
      <HeaderBar countOfBoletos={data.length} />
      <FlatList
        ListHeaderComponent={() => <HeaderFlatList title="Meus Boletos" />}
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    </View>
  );
};
