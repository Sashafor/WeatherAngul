
var app = angular.module('weather', []);

app.controller('WeatherController', function ($scope, API) {
    API.getWeather().then(function (data) {
        $scope.pogoda = {
            updated: data.current.last_updated,
            sity: data.location.name,
            country: data.location.country,
            icon: data.current.condition.icon,
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            humidity: data.current.humidity,
            ms: data.current.wind_mph*0.44704,
            dir: data.current.wind_dir
        };
    });
});


app.service('API', function ($http, $q) {
    return {
        getWeather: function () {
            var key = "f1b687934143483eab8114757162011";
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'https://api.apixu.com/v1/current.json',
                params: {
                    key: key,
                    q: 'Odessa Ukraine'
                }
            }).then(function (weather) {
                var pogoda = weather.data;

                d.resolve(pogoda);
                console.log(pogoda);
            });
            return d.promise;
        }
    }
});
