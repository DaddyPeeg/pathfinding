import { useRef } from "react";

const useDataRef = (initialValue) => {
  const dataRef = useRef(initialValue);

  return dataRef;
};

export default useDataRef;
