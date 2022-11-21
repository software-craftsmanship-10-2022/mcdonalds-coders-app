import {useState} from 'react';
import type {UserType} from '../../@types/user';
import {STORAGE} from '../../config';
import useLocalStorage from '../../hooks/useLocalStorage';
import McButton from '../buttons/McButton';
import McInput from '../input/McInput';
import InfoModal from '../modal/InfoModal';
import './UserForm.css';

type UserFormProps = {
  setIsValidated: (isValid: boolean) => void;
};

const UserForm = ({setIsValidated}: UserFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    dni: '',
    phone: '',
  } as UserType);
  const {setStorageItem} = useLocalStorage();

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const toggleModal = (message?: string) => {
    setModalMessage(message ?? '');
    setShowModal(!showModal);
  };

  const handleValidation = () => {
    setStorageItem(STORAGE.users, formData);
    setIsValidated(true);

    if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(formData.email)) {
      toggleModal('Correo inválido');
      return;
    }

    if (!/^([a-zA-Z ]){2,30}$/.test(formData.name)) {
      toggleModal('Nombre inválido');
      return;
    }

    if (!/^\d+$/.test(formData.dni)) {
      toggleModal('DNI inválido');
      return;
    }

    if (!/^(\d{10})+$/.test(formData.phone)) {
      toggleModal('Teléfono inválido');
      return;
    }

    setStorageItem(STORAGE.users, formData);
    setIsValidated(true);
  };

  return (
    <div className="UserForm">
      <div className="UserFormContainer">
        <h1>
          <strong>Datos</strong>
        </h1>
        <McInput
          id={'input-name'}
          type={'text'}
          label={'Nombre y apellido'}
          width={'100%'}
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({...formData, name: e.target.value});
          }}
        />
        <McInput
          id={'input-email'}
          type={'email'}
          label={'Correo'}
          width={'100%'}
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({...formData, email: e.target.value});
          }}
        />
        <McInput
          id={'input-country'}
          type={'text'}
          label={'País'}
          width={'100%'}
          value={'Argentina'}
          disabled
        />
        <div className="composite-input">
          <McInput
            id={'input-dni-type'}
            type={'text'}
            label={'Tipo'}
            width={'25%'}
            value={'DNI'}
            disabled
          />
          <McInput
            id={'input-dni'}
            type={'text'}
            label={'Documento'}
            width={'70%'}
            value={formData.dni}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, dni: e.target.value});
            }}
          />
        </div>
        <div className="composite-input">
          <McInput
            id={'input-phone-prefix'}
            type={'text'}
            label={'Prefijo'}
            width={'25%'}
            value={'+54'}
            disabled
          />
          <McInput
            id={'input-phone'}
            type={'tel'}
            placeholder={'00-0000-0000'}
            label={'Teléfono'}
            width={'70%'}
            value={formData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, phone: e.target.value});
            }}
          />
        </div>
      </div>
      <InfoModal
        toggle={() => {
          toggleModal();
        }}
        isOpen={showModal}
        title="Atención"
        message={modalMessage}
      />
      <McButton
        text={'Aceptar'}
        onClick={() => {
          handleValidation();
        }}
        fixed
      />
    </div>
  );
};

export default UserForm;
