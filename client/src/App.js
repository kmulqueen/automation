import React from "react";
// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import SimpleTable from "./components/Table";
import Form from "./components/Form";

function App() {
  return (
    <Provider store={store}>
      <Form />
      <SimpleTable />
    </Provider>
  );
}

export default App;
