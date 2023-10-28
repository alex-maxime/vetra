import {
  Button,
  Divider,
  Icon,
  IconElement,
  List,
  ListItem,
  Tab,
  TabView,
  Text
} from '@ui-kitten/components';
import { useState } from 'react';

import { AlertIcon } from './AlertIcon';
import { CheckIcon } from './CheckIcon';
import { CopyIcon } from './CopyIcon';
import { DeleteItemBtn } from './DeleteItemBtn';
import { QuestionMarkIcon } from './QuestionMarkIcon';
import TransactionModalView from './TransactionModalView';
import { TransactionStatus } from '../enums/status';
import { CheckPointInterface, MovementInterface } from '../interfaces';
import { MovementState } from '../types';

const TransactionsIcons = (props: any): IconElement => (
  <Icon {...props} name="trending-up-outline" />
);

const CheckpointIcons = (props: any): IconElement => (
  <Icon {...props} name="checkmark-circle-outline" />
);

interface TransactionsTabViewProps {
  datas: MovementState;
  onDelete?: (item: MovementInterface) => void;
  onUpdate?: (item: MovementInterface) => void;
}
const TransactionsTabView = ({
  datas,
  onDelete,
  onUpdate
}: TransactionsTabViewProps): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentTransaction, setCurrentTansaction] = useState({
    id: null,
    date: '',
    label: '',
    amount: 0
  });

  const openModalWithItem = (item: any) => {
    console.log(item);
    setCurrentTansaction({
      ...item,
      date: new Date(item.date)
    });
    setModalVisible(true);
  };

  const openAddModal = () => {
    setCurrentTansaction({
      id: null,
      date: '',
      label: '',
      amount: 0
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentTansaction({
      id: null,
      date: '',
      label: '',
      amount: 0
    });
    setModalVisible(false);
  };

  const onDeleteItem = (item: MovementInterface) => {
    if (onDelete) {
      onDelete(item);
    }
    closeModal();
  };
  const onUpdateItem = (item: MovementInterface) => {
    if (onUpdate) {
      onUpdate(item);
    }
    closeModal();
  };

  const renderTransactions = ({ item, index }: { item: MovementInterface; index: number }) => {
    const getAccessoryRight = () => {
      switch (item.status) {
        case TransactionStatus.VALID:
          return CheckIcon;
        case TransactionStatus.DUPLICATED:
          return () => <DeleteItemBtn onPress={() => onDeleteItem(item)} />;
        case TransactionStatus.INVALID:
          return AlertIcon;
        case TransactionStatus.NO_CHECK_POINT:
          return CopyIcon;
        default:
          return QuestionMarkIcon;
      }
    };

    // maybe usecallback ?
    const getTextStatus = () => {
      switch (item.status) {
        case TransactionStatus.VALID:
          return 'success';
        case TransactionStatus.DUPLICATED:
          return 'warning';
        case TransactionStatus.INVALID:
          return 'danger';
        case TransactionStatus.NO_CHECK_POINT:
          return 'info';
        default:
          return 'basic';
      }
    };

    return (
      <ListItem
        style={{ paddingVertical: 16 }}
        onPress={() => openModalWithItem(item)}
        title={(evaProps) => {
          return (
            <Text {...evaProps} status={getTextStatus()}>
              {item.amount} €
            </Text>
          );
        }}
        description={(evaProps) => (
          <Text {...evaProps} status={getTextStatus()}>
            {new Date(item.date).toLocaleDateString('fr-FR')} - {item.label}
          </Text>
        )}
        accessoryRight={getAccessoryRight()}
      />
    );
  };

  const renderBalances = ({ item, index }: { item: CheckPointInterface; index: number }) => (
    <ListItem
      style={{ paddingVertical: 16 }}
      title={`${item.balance} €`}
      description={new Date(item.date).toLocaleDateString('fr-FR')}
    />
  );

  return (
    <>
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <Tab title="OPÉRATIONS" icon={TransactionsIcons}>
          <List
            ItemSeparatorComponent={Divider}
            data={datas.movements}
            renderItem={renderTransactions}
            ListFooterComponent={() => (
              <Button
                onPress={openAddModal}
                status="info"
                style={{ marginHorizontal: 64, marginVertical: 8 }}
                appearance="outline">
                Ajouter une transaction
              </Button>
            )}
          />
        </Tab>
        <Tab title="POINTS DE CONTRÔLE" icon={CheckpointIcons}>
          <List
            ItemSeparatorComponent={Divider}
            data={datas.balances}
            renderItem={renderBalances}
          />
        </Tab>
      </TabView>
      <TransactionModalView
        visible={modalVisible}
        transaction={currentTransaction}
        onClose={closeModal}
        onDelete={onDeleteItem}
        onUpdate={onUpdateItem}
      />
    </>
  );
};

export default TransactionsTabView;
