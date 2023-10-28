import { Divider, List, ListItem } from '@ui-kitten/components';
import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

import { ArrowListIcon } from '../components/ArrowListIcon';
import { MovementsSampleDatasTitle } from '../constants/MovementsSampleData';

export default function Home() {
  const renderItem = ({ item, index }: { item: { title: string; key: string }; index: number }) => (
    <Link
      href={{
        pathname: '/details/[key]',
        params: { key: item.key }
      }}
      asChild>
      <ListItem
        style={{ paddingVertical: 16 }}
        title={`${index + 1} - ${item.title}`}
        accessoryRight={ArrowListIcon}
      />
    </Link>
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Home',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      />
      <List
        ItemSeparatorComponent={Divider}
        data={MovementsSampleDatasTitle}
        renderItem={renderItem}
      />
    </View>
  );
}
