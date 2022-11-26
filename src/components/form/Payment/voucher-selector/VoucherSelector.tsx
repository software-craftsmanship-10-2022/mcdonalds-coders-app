import {useState} from 'react';
import type {Voucher} from 'src/Payment/models/Voucher/Voucher';

type VoucherSelectorProps = {
  selectedVoucher: Voucher | undefined;
  searchedVoucherError: string | undefined;
  onClick: (voucherCode: string) => void;
  onClear: () => void;
};

const VoucherSelector = ({
  selectedVoucher,
  searchedVoucherError,
  onClick,
  onClear,
}: VoucherSelectorProps) => {
  if (selectedVoucher) {
    return <SelectedVoucherCode selectedVoucher={selectedVoucher} onClear={onClear} />;
  }

  return <VoucherSelectorInput errorMessage={searchedVoucherError} onClick={onClick} />;
};

export default VoucherSelector;

type SelectedVoucherCodeProps = {
  selectedVoucher: Voucher;
  onClear: () => void;
};

const SelectedVoucherCode = ({selectedVoucher, onClear}: SelectedVoucherCodeProps) => {
  return (
    <button type="button" onClick={onClear}>
      Discount: {selectedVoucher.code}
    </button>
  );
};

type VoucherSelectorInputProps = {
  errorMessage: string | undefined;
  onClick: (voucherCode: string) => void;
};

const VoucherSelectorInput = ({errorMessage, onClick}: VoucherSelectorInputProps) => {
  const [voucherCode, setVoucherCode] = useState('');

  return (
    <div>
      <div>
        <label htmlFor="voucher">Discount code</label>
        <input
          id="voucher"
          value={voucherCode}
          onChange={(e) => {
            setVoucherCode(e.target.value);
          }}
        />
        <button
          type="button"
          onClick={() => {
            onClick(voucherCode);
          }}
        >
          Usar
        </button>
      </div>
      <span>{errorMessage}</span>
    </div>
  );
};
