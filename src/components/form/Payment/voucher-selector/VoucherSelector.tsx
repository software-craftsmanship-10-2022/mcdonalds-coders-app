import {useState} from 'react';
import type {Voucher} from 'src/Payment/models/Voucher/Voucher';
import './VoucherSelector.css';

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
    <button type="button" className="McButton" onClick={onClear}>
      Descuento: {selectedVoucher.code}(-{selectedVoucher.getDiscountString()})
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
        <label htmlFor="voucher" className="voucher-selector__label">
          Código descuento:
        </label>
        <div className="voucher-selector__input-group">
          <input
            id="voucher"
            value={voucherCode}
            onChange={(e) => {
              setVoucherCode(e.target.value);
            }}
            className="voucher-selector__code-textbox"
          />
          <button
            type="button"
            className="McButton"
            onClick={() => {
              onClick(voucherCode);
            }}
          >
            Usar
          </button>
        </div>
      </div>
      <span className="voucher-selector__code-error">{errorMessage}</span>
    </div>
  );
};
