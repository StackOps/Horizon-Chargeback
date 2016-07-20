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

  describe('cbk-balance directive', function () {
    var $compile,
      $scope,
      $q,
      controller,
      element,
      mockGetText;

    beforeEach(module('horizon.dashboard.chargeback'));
    beforeEach(module('templates'));
    beforeEach(function() {
        module(function($provide) {
            $provide.value('horizon.framework.util.i18n.gettext', mockGetText);
        });

        mockGetText = function(value) {
            return value;
        };
    });

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      $compile = $injector.get('$compile');
      $scope.currency_name = '€';
    }));

    describe("When remaining_balance is less thant zero", function(){
      beforeEach(inject(function ($injector) {
        $scope.remaining_balance = 10;
        element = angular.element('<cbk-balance currencyname="currency_name" '+
        'amount="remaining_balance"></cbk-balance>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('cbkBalance');
      }));

      it('should applied template', function () {
        expect(element.html()).not.toEqual('');
      });
      it("should define the id balance-box", function(){
        var id = element.find('#balance-box');
        expect(id).toBeDefined();
      });

      it("should update tooltip", function(){
        expect(controller.tooltip).toEqual("The remaining balance is the result of substraiting the monthly consumption from the balance.");
      });

      it("shoul update the title of the id element to the tooltip value", function(){
        var id = element.find('#balance-box');
        expect(id.attr('title')).toEqual(controller.tooltip);
      });

      it("shoul container Remaining Balance", function(){
        var spanElement = element.find('span');
        expect(spanElement.text()).toEqual('Remaining Balance');
      });

      it("should update the remainig balance correctly", function(){
        var balanceElement = element.find('.payments-amount');
        expect(balanceElement.text()).toContain('€10.00');
      });

      it("should set less_than_zero to false", function(){
        expect(controller.less_than_zero).toBe(false);
      });

      it("should not have the class negative", function(){
        var id = element.find('#balance-box');
        expect(id.hasClass('negative')).toBe(false);
      });
    });


    describe("When remaining_balance is greater than zero", function(){
      beforeEach(inject(function ($injector) {
        $scope.remaining_balance = -10;
        element = angular.element('<cbk-balance currencyname="currency_name" '+
        'amount="remaining_balance"></cbk-balance>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('cbkBalance');
      }));


      it("should set less_than_zero to true", function(){
        expect(controller.less_than_zero).toBe(true);
      });

      it("should have the class negative", function(){
        var id = element.find('#balance-box');
        expect(id.hasClass('negative')).toBe(true);
      });
    });

  });
})();
