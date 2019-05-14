function changepic(){
    document.getElementById('abtus').innerHTML = "Auto Mart is an online marketplace for automobiles of diverse makes,model or body type" +
"Here users can sell their cars or buy from trusted dealerships or private sellers.";
}
function vision(){
    document.getElementById('abtus').innerHTML = "To be a leading brand in helping our clients to buy and sell their vehicles";    
}
function values(){
    document.getElementById('abtus').innerHTML = "Our Core Values" ;

 
}
function sortPrice() {
  var table = document.getElementById("myTable");
  var sorting = true;
  while (sorting) {
      sorting = false;
      var rows = table.rows;
      for (var i = 1; i < (rows.length - 1); i++) {
          shouldSort = false;
          
          var a = rows[i].getElementsByTagName("TD")[0];
          var b = rows[i + 1].getElementsByTagName("TD")[0];
          if (Number(a.innerHTML) > Number(b.innerHTML)) {
              shouldSort = true;
              break;
          }
      }
      if (shouldSort) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          sorting = true;
      }
  }
}

