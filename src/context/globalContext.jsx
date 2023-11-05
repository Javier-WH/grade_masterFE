import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const GlobalContext = createContext();

export function GlobalContextProvider(props) {
  const [toast, setToast] = useState(null);

  const values = {
    toast,
    setToast
  };

  return (
    <GlobalContext.Provider value={values}>
      {props.children}
    </GlobalContext.Provider>
  );
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node
};