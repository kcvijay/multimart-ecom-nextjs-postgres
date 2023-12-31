import React from 'react';

interface UnitPickerProps {
  removeFromCart: () => void;
  addToCart: () => void;
}

const UnitPicker = ({ removeFromCart, addToCart }: UnitPickerProps) => {
  return (
    <div className='flex gap-1'>
      <div>
        <button
          onClick={removeFromCart}
          className='w-[100px] min-h-[32px] border border-[#903511] bg-[#ffb091b8] text-[#903511] hover:bg-[#f9f9f9] active:bg'
        >
          Delete &times;
        </button>
      </div>
      <div>
        <button
          className='w-[100px] min-h-[32px] border border-slate-400 px-3 bg-white hover:bg-[#f9f9f9] active:bg-[#f9f9f9] transition-all'
          onClick={addToCart}
        >
          Add +
        </button>
      </div>
    </div>
  );
};

export default UnitPicker;
