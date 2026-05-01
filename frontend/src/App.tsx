import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes";
import "@/utils/i18n";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
