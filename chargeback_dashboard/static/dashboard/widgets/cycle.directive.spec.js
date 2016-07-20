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

  describe("Cycle directive", function(){
    var $compile,
      $scope,
      controller,
      element,
      $q;
    beforeEach(module('horizon.dashboard.chargeback'));
    beforeEach(module('templates'));
    beforeEach(inject(function ($injector){
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      $compile = $injector.get('$compile');
      $scope.currency = {
        name : '€'
      };
    }));

    describe('When it is the current cycle', function () {
      beforeEach(inject(function ($injector) {
        $scope.r = {
          current : true,
          start: 1467331200,
          end: 1470009599,
          total: 15
        };
        element = angular.element('<cycle cycle="r" currency="currency"></cycle>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('cycle');
      }));

      describe("Title section", function(){
        it('should applied template', function () {
          expect(element.html()).not.toEqual('');
        });
        it('should hide the normal Cycle span', function () {
          var spanElement = element.find('span').eq(0);
          var hideElement = element.find('span').eq(1);
          expect(spanElement.text()).toEqual('Cycle (Current, in process)');
          expect(spanElement.hasClass('ng-hide')).toBe(false);
          expect(hideElement.hasClass('ng-hide')).toBe(true);
        });
      });

      describe("Date section", function(){
        it('should show the date in the correct format', function(){
          var dateElement = element.find('.box-el').eq(0);
          var nowDate = dateElement.find('.text').eq(0);
          var hideDate = dateElement.find('.text').eq(1);
          expect(nowDate.text()).toEqual('2016/07/01 - now');
          expect(nowDate.hasClass('ng-hide')).toBe(false);
          expect(hideDate.hasClass('ng-hide')).toBe(true);
        });
      });

      describe('Total Section', function(){
        it("should show the total in the correct format", function(){
          var totalElement = element.find('p.value');
          expect(totalElement.text()).toEqual('€15.00');
        });
        it("should has the Total text", function(){
          var totalElement = element.find('p.key');
          expect(totalElement.text()).toEqual('Total:');
        });
        it("should show the Total text and with the correct value", function(){
          var total = element.find('.box-el.total');
          expect(total.text()).toContain("Total:€15.00");
        });
      });


    });


    describe('When it is not the current cycle', function () {
      beforeEach(inject(function ($injector) {
        $scope.r = {
          current : false,
          start: 1467331200,
          end: 1470009599,
          total: 15
        };
        element = angular.element('<cycle cycle="r" currency="currency"></cycle>');
        $compile(element)($scope);
        $scope.$digest();
        controller = element.controller('cycle');
      }));

      describe("Title section", function(){
        it('should applied template', function () {
          expect(element.html()).not.toEqual('');
        });
        it('should hide the Current cycle text', function () {
          var spanElement = element.find('span').eq(1);
          var hideElement = element.find('span').eq(0);
          expect(spanElement.text()).toEqual('Cycle');
          expect(spanElement.hasClass('ng-hide')).toBe(false);
          expect(hideElement.hasClass('ng-hide')).toBe(true);
        });
      });


      describe("Date section", function(){
        it('should show the date in the correct format', function(){
          var dateElement = element.find('.box-el').eq(0);
          var date = dateElement.find('.text').eq(1);
          var hideDate = dateElement.find('.text').eq(0);
          expect(date.text()).toEqual('2016/07/01 - 2016/08/01');
          expect(date.hasClass('ng-hide')).toBe(false);
          expect(hideDate.hasClass('ng-hide')).toBe(true);
        });
      });
    });
  });

})();
