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
  describe("productResource Directive", function(){
    var $compile,
      $scope,
      controller,
      element;
    beforeEach(module('horizon.dashboard.chargeback'));
    beforeEach(module('templates'));
    beforeEach(inject(function($injector){
      $scope = $injector.get('$rootScope').$new();
      // $q = $injector.get('$q');
      $compile = $injector.get('$compile');
      $scope.currency =  {
        name : '€'
      };
    }));

    describe('When it has freeUnitsPerCycle', function () {
      beforeEach(inject(function ($injector) {
        $scope.resource = {
          resourceType : {
            description : 'Description'
          },
          freeUnitsPerCycle : 0,
          unitFee : 1,
          accumulatedFee : 3,
          ammount : 20,
          fixedFee : 2
        };
        element = angular.element('<product-resource resource="resource" '+
        'currency=currency></product-resource>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('productResource');
      }));

      it("should show the description correct", function(){
        var descriptionElement = element.find('p.key.long').eq(0);
        expect(descriptionElement.text()).toEqual('Description');
      });


      it("should show the values per unti and the fee", function(){
        var longDescription = element.find('p.key.long.description');
        expect(longDescription.text()).toEqual(' €1.00 per unit + €2.00 fee ');
      });

      it("should show the total value in the correct format", function(){
        var total = element.find('p.value');
        expect(total.text()).toContain('€3.00');
      });

      it('should hide the freeunits text', function(){
        var amountConsumedToHide = element.find('p.key.long').eq(1);
        var amountConsumed = element.find('p.key.long').eq(2);
        expect(amountConsumed.text()).toContain('Units: 20');
        expect(amountConsumed.hasClass('ng-hide')).toBe(false);
        expect(amountConsumedToHide.hasClass('ng-hide')).toBe(true);
      });
    });


    describe('When it has not freeUnitsPerCycle', function () {
      beforeEach(inject(function ($injector) {
        $scope.resource = {
          resourceType : {
            description : 'Description'
          },
          freeUnitsPerCycle : 2,
          unitFee : 1,
          accumulatedFee : 3,
          ammount : 20,
          fixedFee : 2
        };
        element = angular.element('<product-resource resource="resource" '+
        'currency=currency></product-resource>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('productResource');
      }));

      it('should show the freeunits text', function(){
        var amountConsumed = element.find('p.key.long').eq(1);
        var amountConsumedToHide = element.find('p.key.long').eq(2);
        expect(amountConsumed.text()).toContain('Units: 20 - Free units: 2');
        expect(amountConsumed.hasClass('ng-hide')).toBe(false);
        expect(amountConsumedToHide.hasClass('ng-hide')).toBe(true);
      });

    });
  });
})();
