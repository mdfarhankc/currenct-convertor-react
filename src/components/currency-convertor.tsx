// api.frankfurter.app/currencies
// api.frankfurter.app/latest?amount=1&from=USD&to=INR

import { useEffect, useState } from "react";
import CurrencyDropDown from "./currency-dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { toast } from "sonner";

const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [favourites, setFavourites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favourites") || "[]")
  );
  const [amount, setAmount] = useState<number>(0);
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fromCurr, setFromCurr] = useState<string>("USD");
  const [toCurr, setToCurr] = useState<string>("INR");

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount) {
      toast.error("Please enter some amount!");
    }
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
      );
      const data = await res.json();
      setConvertedAmount(data?.rates[toCurr] + " " + toCurr);
    } catch (error) {
      console.error("Error fetching: ", error);
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };
  const handleFavourite = (currency: string) => {
    let updatedFavourites = [...favourites];

    if (favourites.includes(currency)) {
      updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
    } else {
      updatedFavourites.push(currency);
    }
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

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
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
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
        <button
          disabled={loading}
          onClick={convertCurrency}
          className={`px-5 py-2 rounded-md bg-white border border-blue-200 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 hover:text-white transition-all
            ${loading ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
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
