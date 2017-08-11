const countryApp = {};

countryApp.getData = function() {
  // $.ajax({
  //   url: 'http://countryapi.gear.host/v1/Country/getCountries',
  //   type: 'GET',
  //   dataType: 'json',
  //   crossDomain: true,
  //   success: function() { alert("Success"); },
  //   error: function() { alert('Failed!'); },
  // // }).then(function(res) {
  // //   console.log(res);
  // });
}

countryApp.displayData = function(data) {

}

countryApp.init = function() {
  countryApp.getData();
}

$(function() {
  countryApp.init();
});
