'use strict';

/**
 * @ngdoc directive
 * @name GO.Core.CustomFields.goCustomFieldsEdit
 * 
 * @description
 * Prints custom fields form fieldsets.
 * 
 * 
 * @param {string} ngModel The customfields model property of the model the customfields belong to
 * @param {string} serverModel The custom fields server model.
 * 
 * @example
 * <go-custom-fields-edit ng-model="contact.customfields" server-model="GO\Modules\GroupOffice\Contacts\Model\ContactCustomFields"></go-custom-fields-edit>				
 */
angular.module('GO.Core')
		.directive('goCustomFieldsEdit', ['$templateCache', '$compile','GO.Core.Directives.CustomFields', function($templateCache, $compile, CustomFields) {


				var buildTemplate = function(customFieldSetStore){
					var tpl = '';
					for(var i = 0, l = customFieldSetStore.items.length; i < l; i++){
						
						var fieldSet = customFieldSetStore.items[i];
						
						tpl +=  '<fieldset><legend>'+fieldSet.name+'</legend>';
				
						for(var n = 0, cl = fieldSet.fields.length; n < cl; n++){
							var field = fieldSet.fields[n];
							tpl += buildFunctions[field.type](field);
						}

						tpl += '</fieldset>';
						
					}
					
					return tpl;
							
							
				};
				
				var buildFunctions = {
					formName: null,
					text: function(field){
						return '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>'+field.name+'</label>\
							<input id="'+field.databaseName+'" name="'+field.databaseName+'" type="text" maxlength="'+field.data.maxLength+'" ng-model="goModel[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng-required="'+(field.required ? 'true' : 'false')+'" />\
							<div ng-messages="formController.'+field.databaseName+'.$error" role="alert">\
								<div ng-message="required">\
								{{::"This field is required" | goT}}\
								</div>\
							</div>\
						</md-input-container>';
					},
					
					textarea: function(field){
						return '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>'+field.name+'</label>\
							<textarea id="'+field.databaseName+'" name="'+field.databaseName+'" maxlength="'+field.data.maxLength+'" ng-model="goModel[\''+field.databaseName+'\']" placeholder="'+field.placeholder+'" ng-required="'+(field.required ? 'true' : 'false')+'"></textarea>\
							<div ng-messages="formController.'+field.databaseName+'.$error" role="alert">\
								<div ng-message="required">\
								{{::"This field is required" | goT}}\
								</div>\
							</div>\
						</md-input-container>';
					},
					
					select: function(field){
						var tpl = '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>'+field.name+'</label>\
								<md-select id="'+field.databaseName+'" name="'+field.databaseName+'" ng-model="goModel[\''+field.databaseName+'\']">';
						
							for(var i = 0, l = field.data.options.length; i < l; i++) {
								tpl += '<md-option value="'+field.data.options[i]+'">'+field.data.options[i]+'</md-option>';
							}
							
								tpl += '</md-select>\
							<div ng-messages="formController.'+field.databaseName+'.$error" role="alert">\
								<div ng-message="required">\
								{{::"This field is required" | goT}}\
								</div>\
							</div>';
						
							tpl += '</md-input-container>';
						
						return tpl;
					},
					
					checkbox: function(field){
						return '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>\
								<input id="cf_{{field.id}}" type="checkbox" ng-model="goModel[\''+field.databaseName+'\']" /> '+field.name+'\
							</label>\
						</md-input-container>';
					},
					
					date: function(field){
						return '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>'+field.name+'</label>\
							<div class="input-group" style="width:300px">\
								<input name="'+field.databaseName+'" id="cf_{{field.id}}" type="text" class="form-control"  ng-model="goModel[\''+field.databaseName+'\']" datepicker-popup />\
						</md-input-container>';
					},
					number: function(field){
						return '<md-input-container class="md-block">\
							<md-icon>star</md-icon>\
							<label>'+field.name+'</label>\
								<input go-number id="cf_{{field.id}}" name="'+field.databaseName+'" type="text" ng-model="goModel[\''+field.databaseName+'\']" placeholder="{{field.placeholder}}" ng-required="field.required" class="form-control" />\
							<div ng-messages="formController.'+field.databaseName+'.$error" role="alert">\
								<div ng-message="required">\
								{{::"This field is required" | goT}}\
								</div>\
							</div>\
						</md-input-container>';
					}
				};

				return {
					restrict: 'E',
					scope: {
						goModel: '=ngModel',
						serverModel: '@',
						formController: '='
					},
					link: function(scope, element, attrs){						
						var customFieldSetStore = CustomFields.getFieldSetStore(attrs.serverModel);
						//TODO load is called twice now
						customFieldSetStore.promise.then(function(){							
							var tpl  = buildTemplate(customFieldSetStore);
							element.html(tpl);
							$compile(element.contents())(scope);
						});
					}					
				};		
			}]);