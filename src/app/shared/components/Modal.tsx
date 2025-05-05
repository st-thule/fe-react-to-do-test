import React from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '@app/store/actions/modalAction';
import { AppDispatch, RootState } from '@app/store';
import { Status } from '@shared/utils/status';
import { FormTask } from '@shared/components/FormTask';
import Button from '@shared/components/partials/Button';
import { ModalTypes } from '@shared/utils/modal-type';

export const ModalComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      contentLabel="Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {modalType === ModalTypes.CONFIRM && (
        <div className="modal-content">
          <h3 className="modal-title">{modalProps.title}</h3>
          <p className="modal-message">{modalProps.message}</p>
          <div className="modal-action">
            <Button
              className="btn btn-primary btn-agree"
              label="Yes"
              onClick={() => {
                if (modalProps?.onConfirm) {
                  modalProps.onConfirm();
                }
                dispatch(closeModal());
              }}
            />
            <Button
              className="btn btn-primary"
              label="No"
              onClick={() => dispatch(closeModal())}
            />
          </div>
        </div>
      )}

      {modalType === ModalTypes.TASK_FORM && (
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">
              {modalProps?.isEdit ? 'Edit task' : 'Add new task'}
            </h3>
            <p onClick={() => dispatch(closeModal())} className="modal-back">
              Go back
            </p>
          </div>
          <FormTask
            defaultValues={
              modalProps?.defaultValues || {
                title: '',
                dueDate: '',
                description: '',
                status: Status.NEW,
              }
            }
            onSubmit={(data: any) => {
              if (modalProps?.onSubmit) {
                modalProps.onSubmit(data);
              }

              dispatch(closeModal());
            }}
            onCancel={() => dispatch(closeModal())}
            isEdit={modalProps?.isEdit || false}
          />
        </div>
      )}
    </Modal>
  );
};
