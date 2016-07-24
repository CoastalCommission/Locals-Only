'use strict';

var LocalsOnly = (function() {
    var _locals_only = {};

    // Todd Moto's forEach method
    _locals_only.forEach = function (array, callback, scope) {
		for (var i = 0; i < array.length; i++) {
			callback.call(scope, i, array[i]); // passes back stuff we need
		}
	};

    _locals_only.localize = function (fromLanguage, toLanguage) {
        if(fromLanguage && toLanguage) {
			var fromLanguageElementSelector = "[data-" + fromLanguage + "]",
				allFromLanguageElements     = document.querySelectorAll(fromLanguageElementSelector),
				toLanguageElementSelector   = "[data-" + toLanguage + "]",
				allToLanguageElements       = document.querySelectorAll(toLanguageElementSelector);

			_locals_only.forEach(allToLanguageElements, function(index, value) {
				var fromLanguageValue    = jQuery(value).data(fromLanguage),
					toLanguageValue	     = jQuery(value).data(toLanguage),
					originalElementValue = jQuery(value).html();

				// swap the content with the value of the to language attribute
				jQuery(value).html(toLanguageValue)
							 .removeClass(fromLanguage)
							 .addClass(toLanguage);

				// create data-english attribute & populate it on the fly
				if(fromLanguageValue === undefined) {
					jQuery(value).attr('data-' + fromLanguage, originalElementValue);
				}

				// call stickem because element heights change when translated
				// Coastal.stickem();
			});
		} else if(!fromLanguage || !toLanguage) {
			console.log("Please provide a from Language as the first argument and a to language as the second argument of the localize() method.");
		}
    };

    return _locals_only;
})();
