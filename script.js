var myLatLang = {lat : 51.5, lng : -0.1};
var mapOptions = {
    center : myLatLang,
    zoom : 7,
    mapTypeId : google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById('googlemap'),mapOptions);

var directionsServce = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);

function calcRoute() {
    var request = {
        origin : document.getElementById("form").value,
        destination : document.getElementById("to").value,
        travelMode : google.maps.TravelMode.DRIVING,
        unitSystem : google.maps.UnitSystem.METRIC
    }

    directionsServce.route(request, function(results, status) {
        if(status == google.maps.DirectionsStatus.OK){
            // console.log(results);
            $('#output').html("<div class='alert-info'>From : "+document.getElementById("form").value+".<br>TO: "+document.getElementById("to").value+"<br>Driving Distance: "+results.routes[0].legs[0].distance.text+"<br>Duration:"+results.routes[0].legs[0].duration.text+"</div>");
//             window.alert("The travelling distance is" +results.routes[0].legs[0].distance.text +".<br>The travelling Duration is: " +results.routes[0].legs[0].duration.text+".");

            directionsDisplay.setDirections(results);
        }
        else{
            directionsDisplay.setDirections({
                routes : []
            });
            map.setCenter(myLatLang);
            $("#output").html("<div class='alert-danger'>Could not retrieve Driving Distance</div>");
        }
    });
}

var options = {
    types : ['(cities)']
}

var input1 =document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 =document.getElementById("to");
var autocomplete1 = new google.maps.places.Autocomplete(input2, options);
