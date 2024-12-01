import React from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";

interface Props {
  handleSwap: () => void;
}

const SwapButton: React.FC<Props> = ({ handleSwap }) => (
  <button
    onClick={handleSwap}
    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
  >
    <HiArrowsRightLeft className="text-xl text-gray-700" />
  </button>
);

export default SwapButton;
