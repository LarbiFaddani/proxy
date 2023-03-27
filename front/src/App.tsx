import LayoutPage from "./pages/features/BO/layout";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <LayoutPage />
    </Provider>
  )
};
export default App
