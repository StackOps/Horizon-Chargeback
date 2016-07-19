/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
describe('horizon .payments', function() {
  beforeEach(module('horizon.dashboard.chargeback.billingcycles'));

  var controller, q, rootScope, chargebackAPI, rolesAPI, roles_with_admin, roles,
  currentAccount, cycles, getRolesPromisesInjection, getRolesAdminPromisesInjection,
  accounts, loadAccountInjection, loadProjectInjection, projects, loadProductInjection,
  products;

  beforeEach(function(){
    accounts = {
      accounts :  [{
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
      }
    };
  });


  beforeEach(function () {
    var roles = {};
    rolesAPI = {
      getRoles : function(){return {};},
      hasRole : function (role){return roles[role];},
      updateRoles : function (new_roles){roles = new_roles;},
      getRoleList : function(){return {};},
    };
  });

  beforeEach(function(){
    cycles = [
      {
        "current": true,
        "discount": 0,
        "end": 1470009599,
        "id": 43687997,
        "projects": [],
        "projectsTotal": 2.54383,
        "promotion": 0,
        "start": 1467331200,
        "total": 2.54383
      }, {
        "current": false,
        "discount": 0,
        "end": 1467331199,
        "id": 43197827,
        "projects": [],
        "projectsTotal": 2.54383,
        "promotion": 0,
        "start": 1464739200,
        "total": 9.506350000000001
      }, {
        "current": false,
        "discount": 0,
        "end": 1464739199,
        "id": 39912263,
        "projects": [],
        "projectsTotal": 2.54383,
        "promotion": 0,
        "start": 1462060800,
        "total": 8.801369999999999
      }
    ];
  });
  beforeEach(function(){
    projects = [{
      discount : 0,
      id : 44302628,
      products : [],
      productsTotal : 3.06677,
      promotion : 0,
      tenant : "aux",
      account : {},
      total : 5
    }];
  });

  beforeEach(function(){
    produts = [{
      baseFee : 0,
      discount : 0,
      id : 44302628,
      resources : [],
      productType : {},
      resourcesTotal : 3.06677,
      total : 5
    }];
  });

  beforeEach(function(){
    roles_with_admin = [{
      name : "ROLE_PORTAL_USER"
    }, {
      name : "admin"
    }];
    roles = [{
      name : "ROLE_PORTAL_USER"
    }];
  });

  beforeEach(inject(function(_$controller_, $q, $rootScope){
    q = $q;
    rootScope = $rootScope;
    scope = $rootScope.$new();
    controller = _$controller_('horizon.dashboard.chargeback.myPluginController', {
      'horizon.framework.widgets.toast.service' : { add : {}},
      'horizon.app.core.openstack-service-api.chargeback' : chargebackAPI,
      'horizon.app.core.openstack-service-api.roles' : rolesAPI
    });
  }));

  beforeEach(function(){
    getRolesPromisesInjection = function(){
      var deferred = q.defer();
      var accountdeferred = q.defer();
      var cyclesdeferred = q.defer();

      spyOn(rolesAPI, 'getRoles').and.returnValue(deferred.promise);
      spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);
      spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(cyclesdeferred.promise);

      controller.getRoles();


      deferred.resolve({data : roles});
      accountdeferred.resolve({data : currentAccount});
      cyclesdeferred.resolve({data : cycles});
      rootScope.$digest();
      expect(rolesAPI.getRoles).toHaveBeenCalled();
      expect(chargebackAPI.getCurrentAccount).toHaveBeenCalled();
      expect(chargebackAPI.getCyclesAccount).toHaveBeenCalled();
    };
  });

  beforeEach(function(){
    getRolesAdminPromisesInjection = function(){
      var deferred = q.defer();
      var accountsdeferred = q.defer();
      spyOn(rolesAPI, 'getRoles').and.returnValue(deferred.promise);
      spyOn(chargebackAPI, 'getAccounts').and.returnValue(accountsdeferred.promise);
      controller.getRoles();
      deferred.resolve({data : roles_with_admin});
      accountsdeferred.resolve({data : accounts});
      rootScope.$digest();
      expect(rolesAPI.getRoles).toHaveBeenCalled();
      expect(chargebackAPI.getAccounts).toHaveBeenCalled();
    };
  });

  beforeEach(function(){
    loadAccountInjection = function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(deferred.promise);
      controller.loadAccount("cycle_id");

      deferred.resolve({data : cycles});
      rootScope.$digest();
      expect(chargebackAPI.getCyclesAccount).toHaveBeenCalled();
    };
  });

  beforeEach(function(){
    loadProjectInjection = function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProjectsCycle').and.returnValue(deferred.promise);
      controller.loadProject("cycle");

      deferred.resolve({data :  projects});
      rootScope.$digest();
      expect(chargebackAPI.getProjectsCycle).toHaveBeenCalled();
    };
  });

  beforeEach(function(){
    loadProductInjection = function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProductsProject').and.returnValue(deferred.promise);
      controller.loadProduct("project");
      deferred.resolve({data :  products});
      rootScope.$digest();
      expect(chargebackAPI.getProductsProject).toHaveBeenCalled();
    };
  });

  describe("Initial configuration", function(){
    it("Initial configuration", function(){
      expect(controller.account).toEqual({});
      expect(controller.accounts).toEqual([]);
      expect(controller.cycle_selected).toBe(null);
      expect(controller.cycles).toEqual([]);
      expect(controller.products).toEqual([]);
      expect(controller.projects).toEqual([]);
      expect(controller.hide_zero_value).toBe(true);
      expect(controller.project_selected).toBe(null);
      expect(controller.role_admin).toBe(false);
      expect(controller.show_information).toBe(false);
      expect(controller.has_cycles_to_load).toBe(false);
      expect(controller.has_projects_to_load).toBe(false);
      expect(controller.has_products_to_load).toBe(false);
    });
  });

  describe("getRoles", function() {
    describe("NOT an admin user", function() {
      it("should has role_admin to false", function(){
        getRolesPromisesInjection();
        expect(controller.role_admin).toBe(false);
      });
      it("should set has_cycles_to_load to true before " +
      "_loadCurrentAccount had been called", function(){
        var deferred = q.defer();
        var accountdeferred = q.defer();
        var cyclesdeferred = q.defer();

        spyOn(rolesAPI, 'getRoles').and.returnValue(deferred.promise);
        spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);
        spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(cyclesdeferred.promise);

        controller.getRoles();
        deferred.resolve({data : roles});
        rootScope.$digest();
        expect(controller.has_cycles_to_load).toBe(true);

      });

      describe("_loadCurrentAccount", function(){
        it("should set account", function(){
          getRolesPromisesInjection();
          expect(controller.account).toEqual(currentAccount.account);
        });
        it("should set currency", function(){
          getRolesPromisesInjection();
          expect(controller.currency).toEqual(currentAccount.account.currency);
        });
      });

      describe("_loadCycles", function(){
        it("should set cycles, projects and product to empty arrays before "+
        "getCyclesAccount has been loaded", function(){

          var deferred = q.defer();
          var accountdeferred = q.defer();
          var cyclesdeferred = q.defer();
          spyOn(rolesAPI, 'getRoles').and.returnValue(deferred.promise);
          spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);
          spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(cyclesdeferred.promise);

          controller.getRoles();
          deferred.resolve({data : roles});
          accountdeferred.resolve({data : currentAccount});
          rootScope.$digest();

          expect(controller.projects).toEqual([]);
          expect(controller.products).toEqual([]);
          expect(controller.cycles).toEqual([]);

          cyclesdeferred.resolve({data : cycles});
        });

        it("should set has_cycles_to_load to true before "+
        "getCyclesAccount has been loaded", function(){
          var deferred = q.defer();
          var accountdeferred = q.defer();
          var cyclesdeferred = q.defer();
          spyOn(rolesAPI, 'getRoles').and.returnValue(deferred.promise);
          spyOn(chargebackAPI, 'getCurrentAccount').and.returnValue(accountdeferred.promise);
          spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(cyclesdeferred.promise);

          controller.getRoles();

          deferred.resolve({data : roles});
          accountdeferred.resolve({data : currentAccount});
          rootScope.$digest();
          expect(controller.has_cycles_to_load).toBe(true);
          cyclesdeferred.resolve({data : cycles});

        });

        it("should set cycles", function(){
          getRolesPromisesInjection();
          expect(controller.cycles).toEqual(cycles);
        });
        it("should change has_select_cycles to false", function(){
          getRolesPromisesInjection();
          expect(controller.has_cycles_to_load).toBe(false);
        });
        it("should reset the selected products and project to empty arrays", function(){
          getRolesPromisesInjection();
          expect(controller.projects).toEqual([]);
          expect(controller.products).toEqual([]);
        });
        it("should set show_information to true", function(){
          getRolesPromisesInjection();
          expect(controller.show_information).toBe(true);
        });
      });

    });

    describe("It is an admin user", function(){
      it("should set role_admin to true", function(){
        getRolesAdminPromisesInjection();
        expect(controller.role_admin).toBe(true);
      });
      describe("_loadAccounts", function(){
        it("should set accounts", function(){
          getRolesAdminPromisesInjection();
          expect(controller.accounts).toEqual(accounts.accounts);
        });
        it("should set show_information to true", function(){
          getRolesAdminPromisesInjection();
          expect(controller.show_information).toBe(true);
        });
      });
    });

  });

  describe("loadAccount", function(){
    describe("_loadCycles", function(){
      it("should set cycles, projects and product to empty arrays before "+
      "getCyclesAccount has been loaded", function(){
        var deferred = q.defer();
        spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(deferred.promise);
        controller.loadAccount("cycle_id");
        expect(controller.projects).toEqual([]);
        expect(controller.products).toEqual([]);
        expect(controller.cycles).toEqual([]);
        deferred.resolve({data : cycles});
        rootScope.$digest();
      });

      it("should set has_cycles_to_load to true before "+
      "getCyclesAccount has been loaded", function(){
        var deferred = q.defer();
        spyOn(chargebackAPI, 'getCyclesAccount').and.returnValue(deferred.promise);
        controller.loadAccount("cycle_id");
        expect(controller.has_cycles_to_load).toBe(true);
        deferred.resolve({data : cycles});
        rootScope.$digest();
      });


      it("should set cycles", function(){
        loadAccountInjection();
        expect(controller.cycles).toEqual(cycles);
      });
      it("should change has_select_cycles to false", function(){
        loadAccountInjection();
        expect(controller.has_cycles_to_load).toBe(false);
      });
      it("should reset the selected products and project to empty arrays", function(){
        loadAccountInjection();
        expect(controller.projects).toEqual([]);
        expect(controller.products).toEqual([]);
      });
      it("should set show_information to true", function(){
        loadAccountInjection();
        expect(controller.show_information).toBe(true);
      });


    });
  });

  describe("loadProject", function(){
    it("should set projects and products to empty array before the "+
    "getProjectsCycle had been resolve", function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProjectsCycle').and.returnValue(deferred.promise);
      controller.loadProject("cycle");
      expect(controller.projects).toEqual([]);
      expect(controller.products).toEqual([]);
      deferred.resolve({data :  projects});
      rootScope.$digest();
    });
    it("should set has_projects_to_load to true before getProjectsCycle has been resolve", function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProjectsCycle').and.returnValue(deferred.promise);
      controller.loadProject("cycle");
      expect(controller.has_projects_to_load).toBe(true);
      deferred.resolve({data :  projects});
      rootScope.$digest();
    });
    it("should set cycle_selected before getProjectsCycle had been resolve", function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProjectsCycle').and.returnValue(deferred.promise);
      controller.loadProject("cycle");
      expect(controller.cycle_selected).toEqual("cycle");
      deferred.resolve({data :  projects});
      rootScope.$digest();
    });

    it("shoul set product to empty array", function(){
      loadProjectInjection();
      expect(controller.products).toEqual([]);
    });
    it("shouls set projects", function(){
      loadProjectInjection();
      expect(controller.projects).toEqual(projects);
    });
    it("should set projects_to_load to false", function(){
      loadProjectInjection();
      expect(controller.has_projects_to_load).toBe(false);
    });
    it("should set cycle_selected to cycle", function(){
      loadProjectInjection();
      expect(controller.cycle_selected).toEqual("cycle");
    });

  });

  describe("loadProducts", function(){

    it("should set has_products_to_load to true before the getProductsProject" +
    " had been resolved", function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProductsProject').and.returnValue(deferred.promise);
      controller.loadProduct("project");
      expect(controller.has_products_to_load).toBe(true);
      deferred.resolve({data :  products});
      rootScope.$digest();
    });

    it("should set project_selected to the project loaded before the getProductsProject" +
    " had been resolved", function(){
      var deferred = q.defer();
      spyOn(chargebackAPI, 'getProductsProject').and.returnValue(deferred.promise);
      controller.loadProduct("project");
      expect(controller.project_selected).toEqual("project");
      deferred.resolve({data :  products});
      rootScope.$digest();
    });

    it("should set project_selected to the project loaded", function(){
      loadProductInjection();
      expect(controller.project_selected).toEqual("project");
    });
    it("should set has_products_to_load to false", function(){
      loadProductInjection();
      expect(controller.has_products_to_load).toBe(false);
    });
    it("should set products to the products loaded", function(){
      loadProductInjection();
      expect(controller.products).toEqual(products);
    });
  });
});
