'use strict';

GO.module('GO.Core').component('goEmailTemplates', {
	bindings: {
		goModuleName: '@'
	},
	controller: [
		'$scope',
		'GO.Core.Factories.Models.Templates.Message',
		'GO.Core.Services.Dialog',
		'$state',
		function ($scope, EmailTemplate, Dialog, $state) {

			this.$onInit = function() {
				this.store = (new EmailTemplate(this.goModuleName)).getStore();
				this.store.load();
			};

			this.edit = function (emailTemplate) {

				if (!emailTemplate) {
					emailTemplate = new EmailTemplate(this.goModuleName);
					emailTemplate.addStore(this.store);					
				}


				Dialog.show({
					editModel: emailTemplate,
					templateUrl: 'core/components/emailtemplate/edit.html',
					controller: 'GO.Core.Components.EmailTemplate.EditController'
				}).then(function (dialog) {
					dialog.close.then(function (emailTemplate) {
						if (emailTemplate) {
							$scope.store.reload();
						}
					});
				});
			};

		}],
	templateUrl: 'core/components/emailtemplate/component.html'
});