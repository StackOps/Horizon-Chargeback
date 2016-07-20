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

  describe('cbk-cloud-usage directive', function () {
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
      element = angular.element('<cbk-cloud-usage amount="55" currencyname="€"></cbk-cloud-usage>');
      $compile(element)($scope);
      $scope.$digest();
      controller = element.controller('cbkCloudUsage');
    }));
    it('should applied template', function () {
      expect(element.html()).not.toEqual('');
    });
    //
    it('should have span element', function () {
      var spanElement = element.find('span');
      expect(spanElement).toBeDefined();
      expect(spanElement.text()).toEqual('Consumption');
    });
    it("should expect controller to update its value", function(){
      expect(controller.currency_name).toBe('€');
      expect(controller.amount).toBe(55);
    });
    it('should expect the payments-ammount contain the amoutn and the currency', function() {
      $scope.$digest();
      var textarea = element.find(".payments-amount");
      expect(textarea.text()).toContain('€55.00');
    });

  });
})();
