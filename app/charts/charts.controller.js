(function() {
    'use strict';
    angular
        .module('app')
        .controller('ChartsController', ChartsController);
    ChartsController.$inject = ['inqstatsFactory'];
    function ChartsController(inqstatsFactory) {
        var vm = this;
        // Load chart names and key we will be using the API to look up
        vm.charts = [{
            name: 'Big Mac Index',
            key: 'bigmac_index'
        }, {
            name: 'Birth Rate',
            key: 'birth_rate'
        }, {
            name: 'CO2 Emissions',
            key: 'co2_emissions'
        }, {
            name: 'Death Rate',
            key: 'death_rate'
        }, {
            name: 'Corruption Index',
            key: 'corruption_index'
        }, {
            name: 'Population Density',
            key: 'density'
        }, ];

        // Search by joining all the keys together and getting all the info from all the keys
        inqstatsFactory
            .getData(vm.charts.map(function(c) {
                return c.key;
            }).join(','))
            .then(function(data) {
              vm
              .charts
              .forEach(function(chart) {
                debugger;
                // Inserting the data into the right property in the charts object
                chart.data = data[chart.key].map(function(d) {
                  return {x: d.year, y: d.data}
                }).reverse();
                // Inserting the labels into the right property in the charts object
                chart.labels = data[chart.key].map(function(d) {
                  return d.year;
                }).reverse();
              })
            })
            .catch(function(error) {
                console.log(error);
            });
    }
})();
