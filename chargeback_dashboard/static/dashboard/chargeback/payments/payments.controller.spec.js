describe('horizon .payments', function() {
  beforeEach(module('horizon.dashboard.chargeback.payments'));

  var $controller, controller, chargebackAPI, history, currentAccount, q, rootScope,
  created_account, suspended_account, status, scope, table;

  beforeEach(function(){
    currentAccount = {
      account : {
      "accountBilling": null,
      "accountCreditCard": null,
      "allowCredit": false,
      "balance": 978.8199999999999,
      "braintreeEnvironment": null,
      "braintreeMerchantId": null,
      "braintreePrivateId": null,
      "braintreePublicId": null,
      "currency": {
        "description": "Euro",
        "id": 2,
        "name": "\u20ac"
      },
      "description": "aux tenant",
      "externalId": "aaaaaaaaaaaaaaaaaaaa",
      "id": 3311,
      "isReseller": false,
      "name": "aux",
      "resellerType": "END CUSTOMER",
      "status": "ACTIVE"
    }};
  });

  beforeEach(function(){
    created_account = {account : {
      "accountBilling": null,
      "accountCreditCard": null,
      "allowCredit": false,
      "balance ": 978.8199999999999,
      "braintreeEnvironment": null,
      "braintreeMerchantId": null,
      "braintreePrivateId": null,
      "braintreePublicId": null,
      "currency": {
        "description": "Euro",
        "id": 2,
        "name": "\u20ac"
      },
      "description": "aux tenant",
      "externalId": "aaaaaaaaaaaaaaaaaaaa",
      "id": 3311,
      "isReseller": false,
      "name": "aux",
      "resellerType": "END CUSTOMER",
      "status": "CREATED"
    }};
  });

  beforeEach(function(){
    suspended_account = {
      account : {
        "accountBilling": null,
        "accountCreditCard": null,
        "allowCredit": false,
        "balance ": 978.8199999999999,
        "braintreeEnvironment": null,
        "braintreeMerchantId": null,
        "braintreePrivateId": null,
        "braintreePublicId": null,
        "currency": {
          "description": "Euro",
          "id": 2,
          "name": "\u20ac"
        },
        "description": "aux tenant",
        "externalId": "aaaaaaaaaaaaaaaaaaaa",
        "id": 3311,
        "isReseller": false,
        "name": "aux",
        "resellerType": "END CUSTOMER",
        "status": "SUSPENDED"
      }
    };
  });

  beforeEach(function(){
    status = {
      "bag" :  {
        "currency": {
          "description": "Euro",
          "id": 2,
          "name": "\u20ac"
        },
        "history": [{
          "amount": 10.0,
          "description": "",
          "id": 6401,
          "invoice": null,
          "timestamp": 1459938307,
          "type": "IN",
          "balance_aux": 10.0
        }, {
          "amount": 1000.0,
          "description": "",
          "id": 6419,
          "invoice": "",
          "timestamp": 1460019331,
          "type": "IN",
          "balance_aux": 1010
        }, {
          "amount": 7.46,
          "description": "Invoice number: INFORME DE USO",
          "id": 7052,
          "invoice": "",
          "timestamp": 1462211643,
          "type": "OUT",
          "balance_aux": 1002.54
        }, {
          "amount": 1.5699999999999994,
          "description": "",
          "id": 7055,
          "invoice": "",
          "timestamp": 1462211643,
          "type": "OUT",
          "balance_aux": 1000.97
        }],
        "id": 3314,
        "total": 1000.97,
        "usage": 1.85406
      }
    };
  });

  beforeEach(function () {
    var currency_name = status.bag.currency.name;
    table = {
      selectAll: false,
      expand : false,
      trackId : 'id',
      columns : [{
        id: 'timestamp', title: 'Date', sortDefault : true,
        template: "<span>{$ item.timestamp * 1000| date : 'yyyy-MM-dd' $}</span>"
      },{
        id: 'description', title: 'Description'
      },{
        id: 'amount', title : 'Amount',
        template: "<span class=\"text-danger\" ng-if=item.type==='OUT'> - {$ item.amount |currency : '" +currency_name + "' $}</span>"+
        "<span class=\"text-success\" ng-if=item.type==='IN'>{$ item.amount |currency : '" +currency_name + "' $}</span>"
      },  {
        id: 'balance', title : 'Balance',
        template: "<span>{$ item.balance | currency :  '"+ currency_name+ "'  $}</span>"
      },{
        id: 'invoice', title : 'Invoice',
        template: '<a target="_blank" ng-href="{$ item.invoice $}">{$ item.invoice $}</a>'
      }]
    };
  });

  beforeEach(function () {
    chargebackAPI = {
      getAccounts : function(){return {};},
      getStatus : function(){return {};},
      getCurrentAccount : function(){return {};},
      getCyclesAccount : function(){return {};},
      getProjectsCycle : function(){return {};},
      getProductsProject : function(){return {};},
    };
  });

  beforeEach(inject(function(_$controller_, $q, $rootScope){
    q = $q;
    rootScope = $rootScope;
    scope = $rootScope.$new();
    $controller = _$controller_;
    controller = $controller('horizon.dashboard.chargeback.PaymentsController', {
      'horizon.app.core.openstack-service-api.chargeback' : chargebackAPI,
      'horizon.framework.util.i18n.gettext' : function(aux){return aux;}
    });
  }));

  describe("Initial configuration", function(){
    it("Initial configuration", function(){
      expect(controller.history).toEqual([]);
      expect(controller.config).toEqual({});
      expect(controller.hasCredit).toBe(false);
      expect(controller.showMessage).toBe(false);
      expect(controller.warn).toBe(false);
      expect(controller.message).toBe("");
      expect(controller.show_information).toBe(false);
    });
  });


  // describe("_create_table", function(){
  //
  //   describe("_generateBalanceValues", function(){
  //     it("has to update controller.history with the value of the status call", function(){
  //       controller._create_table(status);
  //       expect(controller.history).toEqual(status.bag.history);
  //     });
  //     it("has to update the balance of each item", function(){
  //       controller._create_table(status);
  //       controller.history.forEach(function(h){
  //         expect(Number(h.balance.toFixed(2))).toEqual(h.balance_aux);
  //       });
  //     });
  //   });
  //
  //   describe("_create_table_config", function(){
  //     it("has to update the ctrl.config with the field with the table to show", function(){
  //       controller._create_table(status);
  //       expect(controller.config).toEqual(table);
  //     });
  //   });
  //
  // });



  describe('load Data', function(){

    it('it has to update hasCredit, currency_name, remaining_balance, consumption, show_information', function(){
      var statusdeferred = q.defer();
      var accountdeferred = q.defer();
      spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
      spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

      controller.loadData();
      statusdeferred.resolve({data : status});
      accountdeferred.resolve({data : currentAccount});
      rootScope.$digest();

      expect(controller.hasCredit).toBe(currentAccount.account.allowCredit);
      expect(controller.currency_name).toBe(currentAccount.account.currency.name);
      expect(Number(controller.remaining_balance)).toBe(Number(currentAccount.account.balance)-Number(status.bag.usage));
      expect(Number(controller.consumption)).toBe(Number(status.bag.usage));
      expect(controller.show_information).toBe(true);
    });


    it('it has messages to show when the status of the account is SUSPENDED', function(){

      var statusdeferred = q.defer();
      var accountdeferred = q.defer();
      spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
      spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

      controller.loadData();
      statusdeferred.resolve({data : status});
      accountdeferred.resolve({data : suspended_account});
      rootScope.$digest();

      expect(chargebackAPI.getStatus).toHaveBeenCalled();
      expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
      expect(controller.showMessage).toBe(true);
      expect(controller.warn).toBe(true);
      expect(controller.message).toEqual('Your account has been temporarily suspended. Please, contact the support team.');

    });

    it('it has messages to show when the status of the account is CREATED', function(){

      var statusdeferred = q.defer();
      var accountdeferred = q.defer();
      spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
      spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

      controller.loadData();
      statusdeferred.resolve({data : status});
      accountdeferred.resolve({data : created_account});
      rootScope.$digest();

      expect(chargebackAPI.getStatus).toHaveBeenCalled();
      expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
      expect(controller.warn).toBe(false);
      expect(controller.showMessage).toBe(true);
      expect(controller.message).toEqual('Make your first payment in order to get your account activated.');
    });


    it('it does not have message to show when the status of the account is CREATED', function(){

      var statusdeferred = q.defer();
      var accountdeferred = q.defer();
      spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
      spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

      controller.loadData();
      statusdeferred.resolve({data : status});
      accountdeferred.resolve({data : currentAccount});
      rootScope.$digest();

      expect(chargebackAPI.getStatus).toHaveBeenCalled();
      expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
      expect(controller.warn).toBe(false);
      expect(controller.showMessage).toBe(false);
      expect(controller.message).toEqual('');
    });


    describe("it has to call _create table", function(){
      describe("_create_table", function(){
        describe("_generateBalanceValues", function(){
          it("has to update controller.history with the value of the status call", function(){
            var statusdeferred = q.defer();
            var accountdeferred = q.defer();
            spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
            spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

            controller.loadData();
            statusdeferred.resolve({data : status});
            accountdeferred.resolve({data : currentAccount});
            rootScope.$digest();


            expect(chargebackAPI.getStatus).toHaveBeenCalled();
            expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
            expect(controller.history).toEqual(status.bag.history);
          });


          it("has to update the balance of each item", function(){
            var statusdeferred = q.defer();
            var accountdeferred = q.defer();
            spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
            spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

            controller.loadData();
            statusdeferred.resolve({data : status});
            accountdeferred.resolve({data : currentAccount});
            rootScope.$digest();

            expect(chargebackAPI.getStatus).toHaveBeenCalled();
            expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
            controller.history.forEach(function(h){
              expect(Number(h.balance.toFixed(2))).toEqual(h.balance_aux);
            });
          });
        });

        describe("_create_table_config", function(){
          it("has to update the ctrl.config with the field with the table to show", function(){
            var statusdeferred = q.defer();
            var accountdeferred = q.defer();
            spyOn(chargebackAPI, 'getStatus').and.returnValue(statusdeferred.promise);
            spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);

            controller.loadData();
            statusdeferred.resolve({data : status});
            accountdeferred.resolve({data : currentAccount});
            rootScope.$digest();

            expect(chargebackAPI.getStatus).toHaveBeenCalled();
            expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
            expect(controller.config).toEqual(table);
          });
        });

      });
    });

  });
});
