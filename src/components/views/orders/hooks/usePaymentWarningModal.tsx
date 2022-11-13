import {useState} from 'react';

type UsePaymentWarningModalType = {
  modalWarningMessage: string;
  updateCardWarning: (message: string) => void;
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

  const updateCardWarning = (message: string) => {
    updateModalWarningMessage(message);
    toggleWarningModalVisibility();
  };

  return {
    modalWarningMessage,
    updateCardWarning,
    warningModalIsVisible: showWarningModal,
    toggleWarningModalVisibility,
  };
};

export default usePaymentWarningModal;
