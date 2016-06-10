/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.roles', rolesAPI);

  rolesAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  /**
   * @ngdoc service
   * @name neutronAPI
   * @param {Object} apiService
   * @param {Object} toastService
   * @description Provides access to Neutron APIs.
   * @returns {Object} The service
   */
  function rolesAPI(apiService, toastService) {
    var roles = {};
    var service = {
      getRoles : getRoles,
      hasRole : hasRole,
      updateRoles : updateRoles,
      getRoleList : getRoleList
    };
    return service;

    /////////////////
    function getRoleList(){
      return roles;
    }

    function getRoles() {
      return apiService.get('/api/user/roles')
        .error(function () {
          toastService.add('error', 'Unable to retrieve the current1211 account');
        });
    }

    function hasRole(role){
      return roles[role];
    }

    function listRoles(){
      return getRoles().then(function(data){
        data.data.forEach(function(role){
          roles[role.name] = true;
        });
      });
    }

    function updateRoles(new_roles){
      roles = new_roles;
    }
  }

}());
