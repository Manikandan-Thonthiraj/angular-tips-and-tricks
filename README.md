# angular-tips-and-tricks

# Service 

Upload File Aws Using Angular.
<br>
aws upload file service
<br>

Reactive Form Configurations as a service.
<br>

```
exportCSVFromTable(tableId : string, fileName: string) {
      let element : any = document.getElementById(tableId); 
      let csvString = '';
      for(var i=0; i < element.rows.length; i++) {
          let rowData = element.rows[i].cells;
          for(var j=0; j<rowData.length;j++){
              csvString = csvString + rowData[j].innerHTML.replace(/<[^>]*>/g, "") + ",";
          }
          csvString = csvString.substring(0, csvString.length - 1);
          csvString = csvString + "\n";
      }
      csvString = csvString.substring(0, csvString.length - 1);
      let hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
      hiddenElement.target = '_blank';
      hiddenElement.download = fileName;
      hiddenElement.click();
      hiddenElement.remove();
  }
  ```
