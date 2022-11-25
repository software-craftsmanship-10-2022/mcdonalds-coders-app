import {useState} from 'react';
import type {Voucher} from 'src/Payment/models/Voucher/Voucher';
import {searchVoucherByCode} from '../services/voucherApi';

export const useVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | undefined>(undefined);
  const [searchedVoucherError, setSearchedVoucherError] = useState<undefined | string>(undefined);

  const searchVoucher = async (voucherCode: string) => {
    try {
      const voucher = await searchVoucherByCode(voucherCode);
      setSelectedVoucher(voucher);
    } catch (error) {
      setSearchedVoucherError((error as Error).message);
    }
  };

  const clearVoucher = () => {
    setSelectedVoucher(undefined);
  };

  return {selectedVoucher, searchVoucher, clearVoucher, searchedVoucherError};
};
