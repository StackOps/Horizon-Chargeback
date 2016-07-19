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
  describe('Project directive when it is the current cycle', function () {
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
      $scope.p = {
        tenant : {
          account : {
            name : 'Tenant name'
          }
        },
        total: 15
      };
      $scope.currency =  {
        name : '€'
      };
      element = angular.element('<project project="p" currency=currency></project>');
      $compile(element)($scope);
      $scope.$digest();
      controller = element.controller('project');
    }));

    describe("Title section", function(){
      it('should applied template', function () {
        expect(element.html()).not.toEqual('');
      });
      it('should hide the normal Cycle span', function () {
        var titleElement = element.find('.cycle-title');
        var textElement = titleElement.find('.title-text');
        expect(textElement.text()).toContain('Project: Tenant name');
      });
    });

    describe("Total section", function(){
      it('should show the totla in the correct formar', function(){
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

})();
