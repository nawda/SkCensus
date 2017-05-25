(function() {
  'use strict';

  angular
    .module('app')
    .controller('ChartsController', ChartsController);

  ChartsController.$inject = ['inqstatsFactory'];

  /* @ngInject */
  function ChartsController(inqstatsFactory) {
    var vm = this;
    vm.charts = [
      { name: 'Big Mac Index', key: 'bigmac_index'},
      { name: 'Birth Rate', key: 'birth_rate'},
      { name: 'CO2 Emissions', key: 'co2_emissions'},
      { name: 'Corruption Index', key: 'corruption_index'},
      { name: 'Density', key: 'density'},
      { name: 'Death Rate', key: 'death_rate'}
    ];
    inqstatsFactory
      .getData(vm.charts.map(function(c){
        return c.key;
      }).join(','))
        .then(function(data){

          vm.charts.forEach(function(chart){

            chart.data = data[chart.key].map(function(sample){
              return {x: sample.year, y: sample.data};
            }).reverse();

            chart.labels = data[chart.key].map(function(sample){
              return sample.year;
            }).reverse();
          });

        })
        .catch(function(error){
          console.log(error);
        })
  }
})();
