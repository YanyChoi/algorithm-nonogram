import { useContext } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";

const Table = () => {

  const { tableSize } = useContext(Context) as ContextType
  return <>
  {tableSize}
  </>;
};

export default Table;
