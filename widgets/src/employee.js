import React from "react";
function generate_table() {
  var userTable = document.createElement('table');
    userTable.setAttribute('id', 'userTable');
    document.body.appendChild(userTable);
    var tableHeadRow = userTable.insertRow(0);
  
    var tableHeadArray = new Array();
    tableHeadArray = ['Employee Id', 'Employee Name', 'Employee Salary'];
    console.log("tableheader",tableHeadArray);
    userTable.setAttribute('border', '1');
    userTable.setAttribute('cellpadding', '10px');
  
    for (var i = 0; i < tableHeadArray.length; i++) {
      
      var th = document.createElement('th');
      th.innerHTML = tableHeadArray[i];
      tableHeadRow.appendChild(th);
  
     
  }
  return(
    <div>
      {userTable}
    </div>
  )
  
}
export default generate_table;
