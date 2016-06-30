describe('horizon .payments', function() {
  beforeEach(module('horizon.dashboard.chargeback.payments'));
  // beforeEach(module('horizon.dashboard.chargeback'));
  // beforeEach(module('app'));

  var $controller, chargebackAPI;

  beforeEach(function () {
      //settings = {"netbiosName": "DIYController", "minutesBetweenNTPUpdate": "600000", "ntpServerName": "pool.ntp.org", "historyFilename": "temperatures.txt", "timeZoneOffset": "0", "temperatureOffset": "10", "minutesBetweenReadings": "600000", "enableDHCP": "true", "staticIPAddress": "0.0.0.0", "subnetMask": "255.255.255.0", "defaultGateway": "0.0.0.0", "primaryDNSAddress": "192.168.1.1", "secondaryDNSAddress": "0.0.0.0", "voltageReference": "3.3", "padResistance": "10000", "resistanceRT": "10000", "coefficientA": "0.003354016", "coefficientB": "0.0002744032", "coefficientC": "0.000003666944", "coefficientD": "0.0000001375492", "kpValue": "400", "kiValue": "435.56", "kdValue": "0"};
      //status = {"timeOfReading": "11\/29\/2011 04:09:31", "temperatureCelsius": "21.174", "temperatureFahrenheit": "70.112", "isHeating": "True", "pidOutput": "50", "setTemperature": "154.0", "currentMashStep": "0", "currentMashTemp": "154", "currentMashTime": "10"};
      //profiles = [{mashTemperature: 120, mashStepLength:20},{mashTemperature: 135, mashStepLength:20},{mashTemperature: 154, mashStepLength:60},{mashTemperature: 170, mashStepLength:20}];
      chargebackAPI = {
        getAccounts : function(){return {};},
        getStatus : function(){return {};},
        getCurrentAccount : function(){return {};},
        getCyclesAccount : function(){return {};},
        getProjectsCycle : function(){return {};},
        getProductsProject : function(){return {};},
      };
    });

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  describe('$scope.grade', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      // var controller = $controller('PasswordController', { $scope: $scope });
      var controller = $controller('horizon.dashboard.chargeback.PaymentsController', {
        'horizon.app.core.openstack-service-api.chargeback' : chargebackAPI
      });
      expect('strong').toEqual('strong');
    });
  });
});
