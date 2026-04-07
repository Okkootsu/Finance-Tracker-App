import { BrowserRouter } from "react-router";
import { AppRouter } from "./routes";
import { useInitializeApp } from "./hooks/useInitializeApp";

function App() {
  useInitializeApp();

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
