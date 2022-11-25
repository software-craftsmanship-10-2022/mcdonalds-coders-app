import {useState} from 'react';
import type {Voucher} from 'src/Payment/models/Voucher/Voucher';

type VoucherSelectorProps = {
  selectedVoucher: Voucher | undefined;
  onClick: (voucherCode: string) => void;
  onClear: () => void;
};

const VoucherSelector = ({selectedVoucher, onClick, onClear}: VoucherSelectorProps) => {
  if (selectedVoucher) {
    <SelectedVoucherCode selectedVoucher={selectedVoucher} onClear={onClear} />;
  }

  return <VoucherSelectorInput onClick={onClick} />;
};

export default VoucherSelector;

type SelectedVoucherCodeProps = {
  selectedVoucher: Voucher;
  onClear: () => void;
};

const SelectedVoucherCode = ({selectedVoucher, onClear}: SelectedVoucherCodeProps) => {
  return (
    <div>
      {selectedVoucher.code}
      <button type="button" onClick={onClear}>
        X
      </button>
    </div>
  );
};

type VoucherSelectorInputProps = {
  onClick: (voucherCode: string) => void;
};

const VoucherSelectorInput = ({onClick}: VoucherSelectorInputProps) => {
  const [voucherCode, setVoucherCode] = useState('');

  return (
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
  );
};
