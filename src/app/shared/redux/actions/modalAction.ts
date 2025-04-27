import {
  CLOSE_MODAL,
  OPEN_MODAL,
} from '@shared/redux/actions/type/modalActionTypes';

export interface OpenModalAction {
  type: typeof OPEN_MODAL;
  payload: {
    modalType: 'CONFIRM' | 'TASK_FORM';
    modalProps?: any;
  };
}

export interface CloseModalAction {
  type: typeof CLOSE_MODAL;
}

export const openModal = (
  payload: OpenModalAction['payload']
): OpenModalAction => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = (): CloseModalAction => ({
  type: CLOSE_MODAL,
});
