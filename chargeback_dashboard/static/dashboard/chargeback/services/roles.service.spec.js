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
(function(){
  'use strict';

  describe('Service: rolesAPI', function () {
    beforeEach(module('horizon.dashboard.chargeback'));

    // instantiate service
    var rolesAPI;
    var accounts;
    var apiService;
    var toastService;
    var $q;
    var messages;
    var current_path;
    var accountId = 4;
    var projectId = 3;
    var cycleId = 2;
    var roles = {
      "user" : true,
      "admin" : false
    };

    var tests = [{
      "func": "getRoles",
      "method": "get",
      "path": '/api/user/roles',
      "error": 'Unable to retrieve the role of the account.'
    }];
    beforeEach(module(function($provide){
      apiService = {
        get : function(value){
          current_path = value; // this is used to check the path
          return {
            error : function(fn){
              fn();
            }
          };
        }
      };
      toastService = {
        add : function(type, message){
          messages =  message; // used to check the error message
        }
      };
      $provide.value('horizon.framework.util.http.service', apiService);
      $provide.value('horizon.framework.widgets.toast.service', toastService);
    }));

    beforeEach(inject(function ($rootScope, $injector) {
      rolesAPI = $injector.get('horizon.app.core.openstack-service-api.roles');
    }));

    // Iterate through the defined tests and apply as Jasmine specs.
    angular.forEach(tests, function(params) {
      it('defines the ' + params.func + ' call properly', function() {
        // var callParams = [apiService, service, toastService, params];
        rolesAPI[params.func].apply(this, params.testInput);
        expect(messages).toEqual(params.error);
        expect(current_path).toEqual(params.path);
      });
    });

    it("should start with empty roles", function(){
      expect(rolesAPI.getRoleList()).toEqual({});
    });
    it("should update the roles correctly", function(){
      rolesAPI.updateRoles(roles);
      expect(rolesAPI.getRoleList()).toEqual(roles);
    });
    it("should get the role correctly", function(){
      rolesAPI.updateRoles(roles);
      expect(rolesAPI.hasRole('admin')).toBe(false);
      expect(rolesAPI.hasRole('user')).toBe(true);
    });


  });
}());
