const googleMap = window.google.maps;

const map = function() {
  const cords = {
    lat: -34.86,
    lng: 138.51
  };

  const map = new googleMap.Map(document.getElementById('map'), {
    zoom: 12,
    center: cords,
    scrollwheel: false
  });

  const addMarker = function(location, map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    const marker = new googleMap.Marker({
      icon: '/assets/img/marker.png',
      map: map,
      animation: googleMap.Animation.DROP,
      position: location
    });

    return marker;
  };

  addMarker(cords, map);
};

if ($('#map').length > 0) {
  window.google.maps.event.addDomListener(window, 'load', map);
}
