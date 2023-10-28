import { Button, Card, Divider, List, ListItem, Text } from '@ui-kitten/components';
import { Stack, useRouter, useLocalSearchParams, Link } from 'expo-router';
import { ReactElement, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, View } from 'react-native';

import { ForwardIcon } from '../../components/ForwardIcon';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import TransactionsTabView from '../../components/TransactionsTabView';
import { ReasonStatusText } from '../../enums/status';
import { BankReducerActions, useBankTransaction } from '../../hooks/useBankTransaction';
import { MovementInterface } from '../../interfaces';

export default function Details(): ReactElement {
  const params = useLocalSearchParams();

  const { title, state, loading, dispatch, validateOperations } = useBankTransaction(
    params.key as string
  );

  const onDelete = (item: MovementInterface) => {
    dispatch({
      type: BankReducerActions.DELETE_ENTRY,
      payload: item
    });
  };
  const onUpdate = (item: MovementInterface) => {
    // @ts-ignore
    const month = item.date.getMonth();
    const date = item.date.getDate();
    dispatch({
      type: item.id ? BankReducerActions.UPDATE_ENTRY : BankReducerActions.ADD_ENTRY,
      payload: {
        ...item,
        // @ts-ignore
        amount: parseFloat(item.amount),
        // @ts-ignore
        date: `${item.date.getFullYear()}-${month < 10 ? '0' : ''}${month + 1}-${
          date < 10 ? '0' : ''
        }${date}`
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title
        }}
      />
      <TransactionsTabView datas={state.datas} onDelete={onDelete} onUpdate={onUpdate} />
      {state.status === 'VALID' ? (
        <Card style={{ margin: 32, marginBottom: 0 }} status="success">
          <Text status="success" category="s1" style={{ textAlign: 'center' }}>
            Tout est bon 🥳🥂
          </Text>
        </Card>
      ) : null}
      {state.status !== 'UNKNOWN' && state.status !== 'VALID' ? (
        <Card style={{ margin: 32, marginBottom: 0, marginTop: 8 }} status="danger">
          <Text status="danger" category="s1" style={{ textAlign: 'center' }}>
            {ReasonStatusText[state.status]}
          </Text>
        </Card>
      ) : null}
      <Button
        onPress={validateOperations}
        style={{ marginHorizontal: 32, marginBottom: 24, marginTop: 16 }}
        disabled={loading}
        accessoryLeft={loading ? LoadingIndicator : null}
        accessoryRight={!loading ? ForwardIcon : null}>
        VÉRIFIER
      </Button>
    </View>
  );
}
