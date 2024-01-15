// 1-hbnb.js

$(document).ready(function() {

    var selectedAmenities = [];

    function updateAmenities() {
        $('.amenities h4').text(selectedAmenities.join(', '));
    }

    $('input[type="checkbox"]').change(function() {
        var amenityID = $(this).data('amenity-id');


        if ($(this).prop('checked')) {

            selectedAmenities.push(amenityID);
        } else {

            selectedAmenities = selectedAmenities.filter(function(id) {
                return id !== amenityID;
            });
        }


        updateAmenities();
    });

});
