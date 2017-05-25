(function() {
    'use strict';

    angular
        .module('app')
        .factory('inqstatsFactory', inqstatsFactory);

    inqstatsFactory.$inject = ['$http', 'inqstatsApiKey', ];

    /* @ngInject */
    function inqstatsFactory($http, inqstatsApiKey) {

        var service = {
            getData: getData
        };

        return service;

        function getData(data) {

            var url = 'http://inqstatsapi.inqubu.com?&countries=us&data=' + data + '&api_key=' + inqstatsApiKey;
            return $http
                .get(url)
                .then(function(response) {
                    return response.data[0];
                });
        }
    }
})();
