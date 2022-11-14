import { CircularProgress, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";
import { setTableBySize } from "../../utils/set-table-by-size";
import Block from "./block";
import LineHeader from "./line-header";

const Table = () => {
  const { tableSize, isLoading, width, height, table, setTable } = useContext(Context) as ContextType;
  useEffect(() => {
    setTable(setTableBySize(tableSize));
  }, [tableSize]);

  const onChange = (x: number, y: number, value: boolean) => {
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
            width={33 * tableSize + height + 5}
            height={height + 5}
            style={{ margin: "0 auto" }}
          >
            <div style={{ width: width + 5, height: height }}></div>
            {table.map((row, columnIndex) => {
              return <LineHeader direction="column" index={columnIndex} />;
            })}
          </Grid>
          <Grid
            container
            flexDirection="column"
            justifyContent="space-between"
            width={33 * tableSize + height + 5}
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
                  <LineHeader direction="row" index={rowIndex}/>
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
