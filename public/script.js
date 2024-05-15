document.addEventListener("DOMContentLoaded", function () {
  // START ------ Materialize JS for loading the dropdown selects
  var elems = document.querySelectorAll("select");
  const options = [1, 2, 3];
  M.FormSelect.init(elems, options); 
  // END ------ Materialize JS for loading the dropdown selects
});
