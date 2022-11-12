import {useState} from 'react';

type UsePaymentWarningModalType = {
  modalWarningMessage: string;
  updateModalWarningMessage: (message: string) => void;
  warningModalIsVisible: boolean;
  toggleWarningModalVisibility: () => void;
};

const usePaymentWarningModal = (): UsePaymentWarningModalType => {
  const [modalWarningMessage, setModalWarningMessage] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);

  const updateModalWarningMessage = (message: string) => {
    setModalWarningMessage(message);
  };

  const toggleWarningModalVisibility = () => {
    setShowWarningModal((prevState) => !prevState);
  };

  return {
    modalWarningMessage,
    updateModalWarningMessage,
    warningModalIsVisible: showWarningModal,
    toggleWarningModalVisibility,
  };
};

export default usePaymentWarningModal;
