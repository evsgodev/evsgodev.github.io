$('.js-datatable').dataTable({
  dom: '<"top"><"bottom"><"clear">'
});

$('#tableCategory').dataTable({
  dom: '<"top"><"bottom"><"clear">',
  columnDefs: [
    {
      orderable: false, targets: [5]
    }
  ]
});
