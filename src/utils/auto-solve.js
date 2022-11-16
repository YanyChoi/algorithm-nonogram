const autoSolve = ({ row, column, table }) => {
  if(checkResult(row, column, table)) {
    alert("SUCCESS");
  } else {
    alert("FAIL");
  }
};

function checkResult(row, column, table) {
  var SIZE = row.length;
  var table_row = [];
  var buffer = [];
  var h = 0, w = 0;


  // 가로줄 체크
  for (w = 0 ; w < 1 ; w++) {
    buffer = []; // 버퍼 초기화
    for(h = 0 ; h < SIZE ; h++) {
      if(table[h][w] == true) {
        table_row[h].push(1);
      } else {
        table_row[h].push(0);
      }
    }
  }

  table_row.append()

  console.log("table_row", table_row);

  return 1;
}


export default autoSolve;
