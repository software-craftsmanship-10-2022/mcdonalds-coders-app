import {useState} from 'react';
import type {VoucherApiType} from 'src/@types/payments';
import {searchVoucherByCode} from '../services/voucherApi';

export const useVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState<VoucherApiType | undefined>(undefined);
  const [searchedVoucherError, setSearchedVoucherError] = useState<undefined | string>(undefined);

  const searchVoucher = async (voucherCode: string) => {
    try {
      const voucher = await searchVoucherByCode(voucherCode);
      setSelectedVoucher(voucher);
    } catch (error) {
      setSearchedVoucherError((error as Error).message);
    }
  };

  return {selectedVoucher, searchVoucher, searchedVoucherError};
};
