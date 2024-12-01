import React from "react";
import Loading from "./loading";

interface Props {
  handleConvert: () => void;
  converting: boolean;
}

const ConvertButton: React.FC<Props> = ({ handleConvert, converting }) => {
  return (
    <button
      disabled={converting}
      onClick={handleConvert}
      className="px-5 py-2 rounded-md bg-white border border-blue-200 hover:bg-blue-300 hover:text-white transition-all"
    >
      {converting ? <Loading /> : "Convert"}
    </button>
  );
};

export default ConvertButton;
