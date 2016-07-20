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

  describe("product directive", function(){
    var $compile,
      $scope,
      controller,
      element,
      $q,
      index,
      resources;
    beforeEach(module('horizon.dashboard.chargeback'));
    beforeEach(module('templates'));
    beforeEach(inject(function ($injector){
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      $compile = $injector.get('$compile');
      $scope.currency = {
        name : '€'
      };
      resources = [];
      index = resources.length;

    }));

    describe('When we have not to hide the zero values', function () {
      beforeEach(inject(function ($injector) {
        $scope.product = {
          productType : {
            description : "description"
          },
          total : 10,
          baseFee : 5,
          discount : 2,
          resources : resources
        };
        $scope.hide_zero_value = true;
        element = angular.element('<product product="product" currency=currency '+
        'hidezerovalue=hide_zero_value></product>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('product');
      }));

      describe("Title section", function(){
        it('should applied template', function () {
          expect(element.html()).not.toEqual('');
        });
        it('should hide the normal Cycle span', function () {
          var titleElement = element.find('.cycle-title');
          var textElement = titleElement.find('p');
          expect(textElement.text()).toContain('Product: description');
        });
      });

      describe("resources", function(){
        it("it must show the section", function(){
          var el = element.find('.cycle-box').find('div').eq(1);
          expect(el.hasClass('ng-hide')).toBe(false);
        });
      });

      describe("Total section", function(){
        describe("BaseFee", function(){
          it("should contain the baseFee text", function(){
            var baseElement = element.find('.box-el').eq(0+index);
            var ptextEement = baseElement.find('p').eq(0);
            expect(ptextEement.text()).toEqual("BaseFee");
          });
          it("shoul update the baseFee value", function(){
            var baseElement = element.find('.box-el').eq(0+index);
            var pvalueElement = baseElement.find('p').eq(1);
            expect(pvalueElement.text()).toContain("€5.00");
          });
          it("should contain the base fee in correct format", function(){
            var baseElement = element.find('.box-el').eq(0+index);
            expect(baseElement.text()).toContain('BaseFee  €5.00');
          });
        });

        describe("Discount", function(){
          it("should contain the discount text", function(){
            var baseElement = element.find('.box-el').eq(1+index);
            var ptextEement = baseElement.find('p').eq(0);
            expect(ptextEement.text()).toEqual("Discount");
          });
          it("shoul update the discount value", function(){
            var baseElement = element.find('.box-el').eq(1+index);
            var pvalueElement = baseElement.find('p').eq(1);
            expect(pvalueElement.text()).toContain("2%");
          });
          it("should contain the discount in correct format", function(){
            var baseElement = element.find('.box-el').eq(1+index);
            expect(baseElement.text()).toContain('Discount 2%');
          });
        });

        describe("total", function(){
          it("should contain the total text", function(){
            var baseElement = element.find('.box-el').eq(2+index);
            var ptextEement = baseElement.find('p').eq(0);
            expect(ptextEement.text()).toEqual("Total:");
          });
          it("shoul update the discount value", function(){
            var baseElement = element.find('.box-el').eq(2+index);
            var pvalueElement = baseElement.find('p').eq(1);
            expect(pvalueElement.text()).toContain("€10.00");
          });
          it("should contain the discount in correct format", function(){
            var baseElement = element.find('.box-el').eq(2+index);
            expect(baseElement.text()).toContain('Total: €10.00');
          });
        });
      });

    });


    describe('When we have to hide the zero values', function () {
      beforeEach(inject(function ($injector) {
        $scope.product = {
          productType : {
            description : "description"
          },
          total : 0,
          baseFee : 5,
          discount : 2,
          resources : resources
        };
        $scope.hide_zero_value = true;
        element = angular.element('<product product="product" currency=currency '+
        'hidezerovalue=hide_zero_value></product>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('product');
      }));

      describe("resources", function(){
        it("it must hide the section", function(){
          var el = element.find('.cycle-box').find('div').eq(1);
          expect(el.hasClass('ng-hide')).toBe(true);
        });
      });
    });
  });

})();
