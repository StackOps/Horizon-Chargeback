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
(function() {
  'use strict';
  angular
    .module('horizon.dashboard.chargeback.payments', [])
    .config(config);

  config.$inject = [
    '$provide',
    '$windowProvider',
    '$routeProvider',
    '$locationProvider',
   ];

  function config($provide, $windowProvider, $routeProvider, $locationProvider) {

    var path = $windowProvider.$get().STATIC_URL + 'dashboard/chargeback/';
    var href = $windowProvider.$get().WEBROOT + 'chargeback/';

    $provide.constant('horizon.dashboard.chargeback.basePath', path);

    $routeProvider
    .when(href + 'payments/', {
      templateUrl: path + 'payments/payments.html'
    });
  }
})();
