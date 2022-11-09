import { CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";
import { setTableBySize } from "../../utils/set-table-by-size";
import Block from "./block";
import LineHeader from "./line-header";

const Table = () => {
  const { tableSize, isLoading } = useContext(Context) as ContextType;
  const [table, setTable] = useState<Array<Array<String>>>([]);
  useEffect(() => {
    setTable(setTableBySize(tableSize));
  }, [tableSize]);

  const onChange = (x: number, y: number, value: String) => {
    let newTable = table;
    newTable[x][y] = value;
    setTable(newTable);
  };
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container flexDirection="column" style={{
        }}>
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            width={33 * tableSize + 150}
            height={155}
            style={{ margin: "0 auto" }}
          >
            <div style={{ width: 150, height: 150 }}></div>
            {table.map((row) => {
              return <LineHeader direction="column" />;
            })}
          </Grid>
          <Grid
            container
            flexDirection="column"
            justifyContent="space-between"
            width={33 * tableSize + 150}
            height={33 * tableSize}
            style={{ margin: "0 auto" }}
          >
            {table.map((row, rowIndex) => {
              return (
                <Grid
                  container
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <LineHeader direction="row" />
                  {row.map((value, columnIndex) => (
                    <Block
                      x={rowIndex}
                      y={columnIndex}
                      onChange={onChange}
                    />
                  ))}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Table;
