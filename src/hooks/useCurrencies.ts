import { useQuery } from "@tanstack/react-query";

const fetchCurrencies = async () => {
  const res = await fetch("https://api.frankfurter.app/currencies");
  if (!res.ok) throw new Error("Failed to fetch currencies");
  return Object.keys(await res.json());
};

export const useCurrencies = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["currencies"],
    queryFn: fetchCurrencies,
  });
  return { currencies: data || [], loading: isLoading };
};
