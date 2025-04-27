import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@shared/redux/store';
import Modal from 'react-modal';
import Button from './Button';
import { Form } from './Form';
import { closeModal } from '@shared/redux/actions/modalAction';
import { Status } from '@shared/constants/status';
import { useForm, Controller } from 'react-hook-form';
import { FormTask } from '@app/pages/components/FormTask';
export const ModalComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  const handleConfirmModal = () => {
    if (modalProps?.onConfirm) {
      modalProps.onConfirm();
    }
    dispatch(closeModal());
  };

  const handleTaskFormSubmit = (data: any) => {
    if (modalProps?.onSubmit) {
      modalProps.onSubmit(data);
    }

    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => dispatch(closeModal())}
      contentLabel="Modal"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {modalType === 'CONFIRM' && (
        <div className="modal-content">
          <h3 className="modal-title">{modalProps.title}</h3>
          <p className="modal-message">{modalProps.message}</p>
          <div className="modal-action">
            <Button
              className="btn btn-primary btn-agree"
              label="Yes"
              onClick={handleConfirmModal}
            />
            <Button
              className="btn btn-primary"
              label="No"
              onClick={() => dispatch(closeModal())}
            />
          </div>
        </div>
      )}

      {modalType === 'TASK_FORM' && (
        <div className="modal-content">
          <h3 className="modal-title">
            {modalProps?.isEdit ? 'Edit task' : 'Add new task'}
          </h3>
          <FormTask
            defaultValues={
              modalProps?.defaultValues || {
                title: '',
                dueDate: '',
                description: '',
                status: Status.NO_STARTED,
              }
            }
            onSubmit={handleTaskFormSubmit}
            onCancel={() => dispatch(closeModal())}
            isEdit={modalProps?.isEdit || false}
          />
        </div>
      )}
    </Modal>
  );
};
