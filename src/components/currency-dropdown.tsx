import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyDropDown = ({
  currencies,
  currentCurrency,
  setCurrency,
  favourites,
  handleFavourite,
  name = "",
  title = "",
}: {
  currencies: string[];
  currentCurrency: string;
  setCurrency: (currency: string) => void;
  favourites: string[];
  handleFavourite: (currency: string) => void;
  name: string;
  title: string;
}) => {
  const isFavourite = (curr: string) => favourites.includes(curr);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-500">
        {title}
      </label>
      <div className="mt-2 relative">
        <select
          value={currentCurrency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {favourites.map((favourite) => {
            return (
              <option className="bg-gray-200" value={favourite} key={favourite}>
                {favourite}
              </option>
            );
          })}
          {favourites.length > 0 && <hr />}
          {currencies
            ?.filter((c) => !favourites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>
        <button
          onClick={() => handleFavourite(currentCurrency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavourite(currentCurrency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropDown;
