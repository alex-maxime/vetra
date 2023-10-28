import { Button, Datepicker, Input, Layout, Text } from '@ui-kitten/components';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CheckIcon } from './CheckIcon';
import { DeleteIcon } from './DeleteItemBtn';
import { SaveIcon } from './SaveIcon';
import { TrashIcon } from './TrashIcon';
import { MovementInterface } from '../interfaces';

interface TransactionModalViewProps {
  visible: boolean;
  transaction: MovementInterface;
  onClose?: () => void;
  onDelete?: (item: MovementInterface) => void;
  onUpdate?: (item: MovementInterface) => void;
}

const TransactionModalView = ({
  visible,
  transaction,
  onClose,
  onDelete,
  onUpdate
}: TransactionModalViewProps) => {
  const insets = useSafeAreaInsets();
  const [currentTransaction, setCurrentTansaction] = useState<MovementInterface>({
    id: null,
    date: '',
    label: '',
    amount: 0
  });

  const updateState = (key: string, value: any) => {
    setCurrentTansaction({
      ...currentTransaction,
      [key]: value
    });
  };

  const closeModal = () => {
    setCurrentTansaction({
      id: null,
      date: '',
      label: '',
      amount: 0
    });
    if (onClose) {
      onClose();
    }
  };

  const requestDelete = () => {
    if (onDelete) {
      onDelete(currentTransaction);
    }
  };

  const requestUpdate = () => {
    if (onUpdate) {
      onUpdate(currentTransaction);
    }
  };

  useEffect(() => {
    if (!visible) {
      setCurrentTansaction({
        id: null,
        date: '',
        label: '',
        amount: 0
      });
    } else {
      setCurrentTansaction(transaction);
    }
  }, [visible]);

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={closeModal}>
      <View style={[styles.flex, { paddingTop: insets.top + 32 }]}>
        <View style={styles.modalView}>
          <Button
            style={{ alignSelf: 'flex-end', marginTop: -24, marginRight: -24 }}
            appearance="ghost"
            status="danger"
            accessoryLeft={DeleteIcon}
            onPress={closeModal}
          />
          <Input
            value={currentTransaction.label}
            label="Description"
            onChangeText={(nextValue) => updateState('label', nextValue)}
          />
          <Datepicker
            style={{ marginTop: 8 }}
            label="Date"
            date={currentTransaction.date}
            onSelect={(nextDate) => updateState('date', nextDate)}
          />
          <Input
            style={{ marginTop: 8 }}
            inputMode="decimal"
            keyboardType="default"
            value={`${currentTransaction.amount || ''}`}
            label="Montant"
            onChangeText={(nextValue) => updateState('amount', nextValue)}
          />
          <Layout
            style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingTop: 16 }}
            level="1">
            {currentTransaction.id ? (
              <Button
                disabled={currentTransaction.amount === 0}
                status="danger"
                appearance="outline"
                accessoryLeft={TrashIcon}
                onPress={requestDelete}>
                Supprimer
              </Button>
            ) : null}

            <Button
              disabled={currentTransaction.amount === 0}
              status="success"
              accessoryRight={SaveIcon}
              onPress={requestUpdate}>
              Enregistrer
            </Button>
          </Layout>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionModalView;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});
