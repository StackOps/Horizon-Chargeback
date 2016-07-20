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
(function() {
  'use strict';

  describe("Status Message Directive", function(){
    var $compile,
    $scope,
    controller,
    element,
    $q,
    readFileService;
    beforeEach(module('horizon.dashboard.chargeback'));
    beforeEach(module('templates'));
    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      $compile = $injector.get('$compile');
    }));

    describe('When the warm is active', function () {
      beforeEach(inject(function ($injector) {
        $scope.warn = true;
        $scope.message = "This is the message";
        element = angular.element('<status-message message="message" warn="warn"></status-message>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('statusMessage');
      }));

      it("should has the id cbk-status-message", function(){
        var id = element.find('#cbk-status-message');
        expect(id).toBeDefined();
      });

      it("should have the clas warm active", function(){
        var id = element.find('#cbk-status-message');
        expect(id.hasClass('status-message-warn')).toBe(true);
        expect(id.hasClass('status-message-info')).toBe(false);
      });
      it("should show the message", function(){
        var text = element.find('p');
        expect(text.text()).toEqual('This is the message');
      });
    });

    describe('When the warm is NOT  active', function () {
      beforeEach(inject(function ($injector) {
        $scope.warn = false;
        $scope.message = "This is the message";
        element = angular.element('<status-message message="message" warn="warn"></status-message>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('statusMessage');
      }));

      it("should have the clas warm active", function(){
        var id = element.find('#cbk-status-message');
        expect(id.hasClass('status-message-warn')).toBe(false);
        expect(id.hasClass('status-message-info')).toBe(true);
      });
    });

  });
})();
