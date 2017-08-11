
var app = {}

var userAnswers = {}
var userDistance;
var userCost;
var userActivity;

var fullResults;
var distanceRelevantResults;
var activityRelevantResults;
var costRelevantResults;
var finalFiveResults;

app.registerEventHandlers = function() {
  $('a#here').on('click', function(e) {
    e.preventDefault();
    $('.hidden').removeClass('hidden');
    app.displayLocation();
  });
  $('div#section3 ul a').on('click', function(evt) {
    userDistance = evt.target.id;
    console.log(userDistance);
  });
  $('div#section4 ul a').on('click', function(evt) {
    userCost = evt.target.id;
    console.log(userCost);
  });
  $('div#section5 ul a').on('click', function(evt) {
    userActivity = evt.target.id;
    console.log(userActivity);
    app.combineAnswers();
  });
  $('div#section6 ul a').on('click', function() {
    app.filterByDistance();
    app.restart();
  });
}

app.scrollHorizontally = function() {
  $('ul.nav a').on('click', function(e) {
    e.preventDefault();
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollLeft: $($anchor.attr('href')).offset().left
    }, 300);
  });
}

app.restart = function() {
  $('#section7 a').on('click', function() {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollLeft: $($anchor.attr('href')).offset().left
    }, 700);
    app.displayFilteredResults([]);
  });
}

app.displayLocation = function() {
  $('.map').show();
  navigator.geolocation.getCurrentPosition(
    function(position) {
      app.makeMap(position.coords);
      app.makeMarker(position.coords, 'You are here');
      app.userPosition = position.coords;
      app.getDistanceResults(position.coords);
    },
    function(err) {
      console.log(err.message, 'oh no!');
      $('#section1').text('✨ Please click refresh and enable location services on your browser if you want to check out this super rad site! ✨');
    }
  );
}

app.makeMap = function(coords) {
  var map_element = $('.map')[0];
  var map_options = {
    center: {lat: coords.latitude, lng: coords.longitude},
    zoom: 2,
    styles: snazzy,
    scrollwheel: false
  }

  app.map = new google.maps.Map(map_element, map_options);

}

app.makeMarker = function(coords, info_text) {
  var map_marker = new google.maps.Marker({
    position: {lat: coords.latitude, lng: coords.longitude},
    map: app.map
  })

  var info_window = new google.maps.InfoWindow();

  google.maps.event.addListener(map_marker, 'click', function() {
    info_window.setContent(info_text);
    info_window.setPosition({lat: coords.latitude, lng: coords.longitude});
    info_window.open(app.map, map_marker);
  })
}

// filter by distance, then activity, then cost

app.getDistanceResults = function(coords) {
  fullResults = data.map(function(res){
    var my_distance = distance(coords.longitude, coords.latitude, res.latlng[1], res.latlng[0]);
    res['distance'] = my_distance;
    return res;
  })
  console.log(fullResults);
}

function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

// Converts numeric degrees to radians
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

// makes an object of the user's results

app.combineAnswers = function() {
  userAnswers['distance'] = userDistance;
  userAnswers['cost'] = userCost;
  userAnswers['activity'] = userActivity;
  console.log(userAnswers);
}

app.filterByDistance = function() {
    if (userDistance === 'short') {
      distanceRelevantResults = fullResults.filter(function(item) {
        return item.distance < 2500;
      });
    } else if (userDistance === 'medium') {
      distanceRelevantResults = fullResults.filter(function(item) {
        return item.distance < 5000;
      });
    } else if (userDistance === 'long') {
      distanceRelevantResults = fullResults.filter(function(item) {
        return item.distance < 10000;
      });
    } else if (userDistance === 'veryLong') {
      distanceRelevantResults = fullResults.filter(function(item) {
        return item.distance;
      });
    }
    console.log(distanceRelevantResults);
    app.filterByActivity();
  }

app.filterByActivity = function() {
  if (userActivity === 'beach') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('beach');
    });
  } else if (userActivity === 'cruise') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('cruise');
    });
  } else if (userActivity === 'history') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('history');
    });
  } else if (userActivity === 'hiking') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('hiking');
    });
  } else if (userActivity === 'wildlife') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('wildlife');
    });
  } else if (userActivity === 'thrills') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('thrills');
    });
  } else if (userActivity === 'offroad') {
    activityRelevantResults = distanceRelevantResults.filter(function(item) {
      return item.activity.includes('offroad');
    });
  }
  console.log(activityRelevantResults);
  app.filterByCost();
}

app.filterByCost = function() {
  if (userCost === 'cheaper') {
    costRelevantResults = activityRelevantResults.filter(function(item) {
      return item.cost.includes('$');
    });
  } else if (userCost === 'average') {
    costRelevantResults = activityRelevantResults.filter(function(item) {
      return item.cost.includes('$$');
    });
  } else if (userCost === 'expensive') {
    costRelevantResults = activityRelevantResults.filter(function(item) {
      return item.cost.includes('$$$');
    });
  }
  console.log(costRelevantResults);
  app.finalFiveResults();
}

app.finalFiveResults = function() {
  finalFiveResults = costRelevantResults.slice(0,5);
  console.log(finalFiveResults);
  app.displayFilteredResults(finalFiveResults);
}

app.displayFilteredResults = function(data) {
  data.forEach(function(searchResult) {
    var country = $('<h2>').text(searchResult.country_name);
    var blurb = $('<p>').text(searchResult.blurb);
    var resultContainer = $('<div>').addClass('searchResult').append(country, blurb);
    $('#section7 .data').replaceWith(resultContainer);
  });
}

app.init = function() {
  app.registerEventHandlers();
  app.scrollHorizontally();
}

$(function() {
  app.init();
});

// ***** NEXT STEPS *****
// expand the database
// add a clear/search again function at the end
// style the first entry to be larger than the remaining entries
