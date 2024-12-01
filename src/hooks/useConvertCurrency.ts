import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const convertCurrency = async ({
  amount,
  from,
  to,
}: {
  amount: number;
  from: string;
  to: string;
}) => {
  const res = await fetch(
    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
  );
  if (!res.ok) throw new Error("Failed to convert currency");
  return res.json();
};

export const useConvertCurrency = () => {
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: convertCurrency,
    onSuccess: (data, variables) => {
      setConvertedAmount(`${data.rates[variables.to]} ${variables.to}`);
    },
    onError: () => {
      toast.error("Conversion failed.");
    },
  });

  return {
    convert: mutateAsync,
    isLoading: isPending,
    convertedAmount,
  };
};
