import { useReducer, useState } from 'react';

import { getApiURL } from '../constants/ApiEndpoint';
import MovementsSampleData, { MovementsSampleDatasTitle } from '../constants/MovementsSampleData';
import { ReasonStatus, TransactionStatus } from '../enums/status';
import { MovementInterface } from '../interfaces';
import { MovementReducerAction, MovementReducerInitialState, MovementState } from '../types';

function getRandomInt() {
  return Math.floor(Math.random() * 999);
}

export enum BankReducerActions {
  DUPLICATE_TRANSACTION_ENTRY = 'DUPLICATE_TRANSACTION_ENTRY',
  MISSING_TRANSACTION_ENTRY = 'MISSING_TRANSACTION_ENTRY',
  MISSMATCH_TRANSACTION_AND_CHECK_POINT = 'MISSMATCH_TRANSACTION_AND_CHECK_POINT',
  MISSING_CHECK_POINT = 'MISSING_CHECK_POINT',
  SET_VALID = 'SET_VALID',
  DELETE_ENTRY = 'DELETE_ENTRY',
  ADD_ENTRY = 'ADD_ENTRY',
  UPDATE_ENTRY = 'UPDATE_ENTRY',
  RESET = 'RESET'
}

const initialState: MovementReducerInitialState = {
  status: 'UNKNOWN',
  datas: {
    movements: [],
    balances: []
  }
};
// todo déclare and use types 🤔
const bankDatasReducer = (
  state: MovementReducerInitialState,
  action: Partial<MovementReducerAction>
) => {
  const { payload } = action;

  switch (action.type) {
    case BankReducerActions.ADD_ENTRY:
      console.log(BankReducerActions.ADD_ENTRY, payload);
      return {
        ...state,
        datas: {
          ...state.datas,
          movements: [...state.datas.movements, { ...payload, id: getRandomInt() }]
        }
      };
    case BankReducerActions.DELETE_ENTRY:
      return {
        ...state,
        datas: {
          ...state.datas,
          movements: [...state.datas.movements.filter((m) => m.id !== payload.id)]
        }
      };
    case BankReducerActions.DUPLICATE_TRANSACTION_ENTRY:
      return {
        ...state,
        status: ReasonStatus.DUPLICATE_TRANSACTION_ENTRY,
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            if (payload.find((d: MovementInterface) => d.id === m.id)) {
              return {
                ...m,
                status: TransactionStatus.DUPLICATED
              };
            }
            return m;
          })
        }
      };
    case BankReducerActions.MISSING_CHECK_POINT:
      return {
        ...state,
        status: ReasonStatus.MISSING_CHECK_POINT,
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            if (payload.find((d: MovementInterface) => d.id === m.id)) {
              return {
                ...m,
                status: TransactionStatus.NO_CHECK_POINT
              };
            }
            return {
              ...m,
              status: TransactionStatus.VALID
            };
          })
        }
      };
    case BankReducerActions.MISSING_TRANSACTION_ENTRY:
      return {
        ...state,
        status: ReasonStatus.MISSING_TRANSACTION_ENTRY,
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            return {
              ...m,
              status: payload.find((t) => t.id === m.id)
                ? TransactionStatus.INVALID
                : TransactionStatus.VALID
            };
          })
        }
      };
    case BankReducerActions.MISSMATCH_TRANSACTION_AND_CHECK_POINT:
      return {
        ...state,
        status: ReasonStatus.MISSMATCH_TRANSACTION_AND_CHECK_POINT,
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            return {
              ...m,
              status: TransactionStatus.INVALID
            };
          })
        }
      };
    case BankReducerActions.SET_VALID:
      return {
        ...state,
        status: 'VALID',
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            return {
              ...m,
              status: TransactionStatus.VALID
            };
          })
        }
      };
    case BankReducerActions.UPDATE_ENTRY:
      return {
        ...state,
        status: 'UNKNOWN',
        datas: {
          ...state.datas,
          movements: state.datas.movements.map((m) => {
            if (payload.id === m.id) {
              return {
                ...m,
                ...payload,
                status: 'UNKNOWN'
              };
            }
            return m;
          })
        }
      };
    case BankReducerActions.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export function useBankTransaction(key: string) {
  if (!key) {
    throw Error('Aucun type de transaction fournie ');
  }
  const [loading, setLoading] = useState(false);
  const dataTitle = MovementsSampleDatasTitle.find((e) => e.key === key);
  const movements: MovementState = MovementsSampleData[key];

  const hookInitialState: MovementReducerInitialState = {
    ...initialState,
    datas: {
      ...initialState.datas,
      ...movements
    }
  };
  // @ts-ignore ... wtf ?? 😅
  const [state, dispatch] = useReducer(bankDatasReducer, hookInitialState);

  const validateOperations = async () => {
    try {
      setLoading(true);
      const API = getApiURL();
      const response = await fetch(`${API}/api/movements/validation`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state.datas)
      });

      const responseJson = await response.json();

      switch (responseJson.message) {
        case 'Accepted':
          dispatch({ type: BankReducerActions.SET_VALID });
          break;

        case "I'm a teapot":
          // Handle reason here
          dispatch({ type: responseJson.reasons[0].reason, payload: responseJson.reasons[0].data });
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return {
    title: dataTitle?.title,
    state,
    loading,
    dispatch,
    validateOperations
  };
}
