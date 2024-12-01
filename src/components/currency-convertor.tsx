import { useState } from "react";
import CurrencyDropDown from "./currency-dropdown";
import { toast } from "sonner";
import { useCurrencies } from "../hooks/useCurrencies";
import ConvertButton from "./convert-buttton";
import SwapButton from "./swap-button";
import { useConvertCurrency } from "../hooks/useConvertCurrency";
import Skeleton from "./ui/skeleton";

const CurrencyConvertor = () => {
  const { currencies, loading: loadingCurrencies } = useCurrencies();
  const {
    convert,
    isLoading: converting,
    convertedAmount,
  } = useConvertCurrency();

  const [amount, setAmount] = useState<number>(0);
  const [fromCurr, setFromCurr] = useState<string>("USD");
  const [toCurr, setToCurr] = useState<string>("INR");
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );

  const handleConvert = async () => {
    if (!amount) {
      toast.error("Please enter an amount!");
      return;
    }
    await convert({ amount, from: fromCurr, to: toCurr });
  };

  const handleSwap = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  const handleFavourite = (currency: string) => {
    const updatedFavourites = favourites.includes(currency)
      ? favourites.filter((fav) => fav !== currency)
      : [...favourites, currency];

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  if (loadingCurrencies)
    return (
      <div className="bg-white max-w-xl mx-auto p-5 rounded-xl">
        <h1 className="mb-5 text-2xl font-semibold text-gray-700">
          Currency Convertor
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <Skeleton height="40px" width="150px" className="rounded-md" />
          <Skeleton
            height="40px"
            width="40px"
            className="rounded-full mx-auto"
          />
          <Skeleton height="40px" width="150px" className="rounded-md" />
        </div>
        <Skeleton height="40px" className="mt-4 rounded-md" />
        <Skeleton
          height="50px"
          width="100px"
          className="mt-6 ml-auto rounded-md"
        />
      </div>
    );

  return (
    <div className="bg-white max-w-xl mx-auto p-5 rounded-xl">
      <h1 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Convertor
      </h1>
      <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropDown
          currencies={currencies}
          setCurrency={setFromCurr}
          currentCurrency={fromCurr}
          favourites={favourites}
          handleFavourite={handleFavourite}
          name="from"
          title="From:"
        />

        {/* swap button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <SwapButton handleSwap={handleSwap} />
        </div>

        <CurrencyDropDown
          currencies={currencies}
          setCurrency={setToCurr}
          currentCurrency={toCurr}
          favourites={favourites}
          handleFavourite={handleFavourite}
          name="to"
          title="To:"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-500"
        >
          Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full my-2 p-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-end mt-6">
        <ConvertButton converting={converting} handleConvert={handleConvert} />
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-500">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
