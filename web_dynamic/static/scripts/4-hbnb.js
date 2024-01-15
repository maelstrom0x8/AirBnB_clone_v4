$(document).ready(init);


const amenity = {};

$(document).ready(function () {
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
  fetchAmenities();
});

function fetchStatus() {
  $.get("http://0.0.0.0:5001/api/v1/status/", (res, msg) => {
    const status = msg === 'success' && res.status === 'OK'
    status ? $('#api_status').addClass('available')
      : $('#api_status').removeClass('available');
  });
}

function fetchAmenities () {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/place_search/",
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ amenities: Object.values(amenity) }),
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}
