'use strict';

/* Controllers */
angular.module('GO.Modules.GroupOffice.Calendar').factory('GO.Modules.GroupOffice.Calendar.Attendee', [
	'GO.Core.Factories.Data.Model',
	'GO.Core.Services.ServerAPI',
	function (Model, ServerAPI) {

		var Attendee = GO.extend(Model, function () {
			this.$parent.constructor.call(this, arguments);
		});

		Attendee.prototype.$returnProperties = "*,alarms,calendarId,event[*,attendees,recurrenceRule,attachments]";
		Attendee.prototype.$keys = ['eventId','userId'];

		Attendee.prototype.getStoreRoute = function () {
			return 'event';
		};

		Attendee.prototype.isOrganizer = function() {
			this.event.attendees < 2;
		};

		Attendee.prototype.hasMoreAttendees = function() {
			var attendees = 0;
			if(!this.event) {
				return false;
			}
			this.event.attendees.forEach(function(r) {
				if(!r.markDeleted) {
					attendees++;
				}
			});
			return attendees > 1;
		};
		Attendee.prototype.download = function() {
			window.open(ServerAPI.url('event/download/'+this.event.id));
		};
//
		return Attendee;
	}]);
