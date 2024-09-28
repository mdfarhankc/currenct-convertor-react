import { Toaster } from "sonner";
import CurrencyConvertor from "./components/currency-convertor";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <Toaster position="bottom-right" />
      <div className="container">
        <CurrencyConvertor />
      </div>
    </div>
  );
}

export default App;
