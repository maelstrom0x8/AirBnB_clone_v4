$(document).ready(function () {
  const amenity = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenity[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenity[$(this).attr('data-name')];
    }
    const names = Object.keys(amenity);
    $('.amenities h4').text(names.sort().join(', '));
  });

  fetchStatus();
});

function fetchStatus() {
  $.get("http://0.0.0.0:5001/api/v1/status/", (res, msg) => {
    const status = msg === 'success' && res.status === 'OK'
    status ? $('#api_status').addClass('available')
      : $('#api_status').removeClass('available');
  });
}
