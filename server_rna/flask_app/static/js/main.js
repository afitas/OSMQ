function showSuccessAlert(content) {
  $("#success-alert-content").html(content);
  $("#success-alert")
    .fadeTo(20000, 500)
    .slideUp(500, function () {
      $("#success-alert").slideUp(500);
    });
}

function showDangerAlert(content) {
  $("#danger-alert-content").html(content);
  $("#danger-alert")
    .fadeTo(20000, 500)
    .slideUp(500, function () {
      $("#danger-alert").slideUp(500);
    });
}
