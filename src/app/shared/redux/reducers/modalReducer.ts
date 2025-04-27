import { Action } from 'redux';
import { CLOSE_MODAL, OPEN_MODAL } from '../actions/type/modalActionTypes';
import { CloseModalAction, OpenModalAction } from '../actions/modalAction';
import { ppid } from 'process';

interface ModalState {
  isOpen: boolean;
  modalType: 'CONFIRM' | 'TASK_FORM' | null;
  modalProps: any;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: {},
};

type ModalAction = OpenModalAction | CloseModalAction;

export const modalReducer = (
  state = initialState,
  action: ModalAction
): ModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        modalType: null,
        modalProps: {},
      };

    default:
      return state;
  }
};
