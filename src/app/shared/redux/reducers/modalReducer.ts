import {
  CloseModalAction,
  OpenModalAction,
} from '@shared/redux/actions/modalAction';
import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '@shared/redux/actions/type/modalActionTypes';

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
        modalProps: action.payload.modalProps || {},
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
