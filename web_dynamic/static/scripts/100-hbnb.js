const amenity = {};
const state = {};
const city = {};
let obj = {};


function checkCallback(count) {
  if ($(this).is(':checked')) {
    obj[$(this).attr('data-name')] = $(this).attr('data-id');
  } else if ($(this).is(':not(:checked)')) {
    delete obj[$(this).attr('data-name')];
  }
  const names = Object.keys(obj);
  if (count === 1) {
    $('.amenities h4').text(names.sort().join(', '));
  } else if (count === 2) {
    $('.locations h4').text(names.sort().join(', '));
  }
}

$(document).ready(function () {
  $('.amenities .popover input').change(function () { obj = amenity; checkCallback.call(this, 1); });
  $('.state_input').change(function () { obj = state; checkCallback.call(this, 2); });
  $('.city_input').change(function () { obj = city; checkCallback.call(this, 3); });

  fetchStatus();
  fetchPlaces();
});

function fetchStatus() {
  $.get("http://0.0.0.0:5001/api/v1/status/", (res, msg) => {
    const status = msg === 'success' && res.status === 'OK'
    status ? $('#api_status').addClass('available')
      : $('#api_status').removeClass('available');
  });
}

function fetchPlaces() {
  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      amenities: Object.values(amenity),
      states: Object.values(state),
      cities: Object.values(city)
    }),
    success: function (res) {
      $('SECTION.places').empty();
      for (const r of res) {
        const _body = ['<article>',
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
        $('SECTION.places').append(_body.join(''));
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
}
