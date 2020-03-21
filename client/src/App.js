import React from "react";
// Redux
import { Provider } from "react-redux";
import store from "./store";

// Components
import Form from "./components/Form";
import Posts from "./components/Posts";

function App() {
  return (
    <Provider store={store}>
      <Form />
      <Posts />
    </Provider>
  );
}

export default App;
