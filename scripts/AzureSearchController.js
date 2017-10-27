var app = angular.module('app', ['ui.bootstrap', 'angucomplete-alt', 'ui.toggle', 'nzToggle']);

angular.module('app').controller("SearchController", function ($scope, $http) {
	var vm = this;
    vm.keywords = "";
    
	vm.apiVersion = "2016-09-01";
	
	// proxy call:
	//vm.proxyHostName = "https://arch-search-proxy.azurepaas-internal.dev.axa-ch.intraxa";
	//vm.apiHostname = vm.proxyHostName + "/v1/get-search?search=";
    
    // direct call: 
    vm.azureHostName = "https://xxx";
    vm.apiHostname =  vm.azureHostName + "/indexes/arch-search/docs" + "?api-version=" + vm.apiVersion + '&$count=true' + '&searchMode=all' + "&search=";
	
	vm.url = vm.apiHostname;
    
    vm.preparedURL = "";
    vm.showSearchResults = false;
    vm.title = "Azure Search Example";
    vm.type = "All";
    vm.results = [];
    vm.dataObject = {};
    vm.count = 0;
    
    vm.PAGINATION_STRING = "&$skip=";
    vm.moreThanOnePage = false;
    vm.nextPage = "";
    vm.showNextPage = false;
    vm.pageCounter = "";
    vm.lastPageItem = 0;
    
    
    // Beginn Preload Filter:
	vm.IsInterface = true;
	vm.Domain = true;
	vm.Application = true;
    vm.ApprovedElement = true;
    vm.SolutionBlueprint = true;
	vm.Terminology = true;
	vm.Event = true;
				
    vm.allTypes = "true";
    
    
    vm.Planned = true;
    vm.Active = true;
    vm.Retired = true;
    
    vm.profile = "IT";
	// ENDE Preload Filter


	// Aufteilung des Filterstrings
	var suchTypString = "artefactType eq 'nix'";
	var lcStatusString = "lifecycle eq 'nix'";
	var profileString = vm.profile;

	var filterString = '';
	// ----------------------------
	
    vm.test = "";
    
    var config = {
        headers: {
            'api-key': 'xxx',
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
	

	$scope.remoteUrlRequestFn = function(str) {
		return {q: str};
	};
	    
    $scope.facets = [
    { id:1,name:'AccessService'},
    { id:2,name:'Applikation'}, 
    { id:3,name:'BulkInterface'},
    { id:4,name:'Fachbegriff'},
    { id:5,name:'PresentationService'},
    //{ id:6,name:'Projekt'},
    { id:7,name:'SoaService'},
    { id:8,name:'undefined'}
    ];
  

    vm.submit = function (item, event) {
    	
    	console.log("allTypes: "+vm.allTypes);
    	
    	// check tristate button for "all On <-> all OFF":
    	if (item != null) {
	    	if (vm.allTypes == "true") {
	    		
	    		vm.IsInterface = true;
	    		vm.Domain = true;
	    		vm.Application = true;
			    vm.ApprovedElement = true;
			    vm.SolutionBlueprint = true;
				vm.Terminology = true;
				vm.Event = true;
			 }
	    	if (vm.allTypes == "false") {
	    		
	    		vm.IsInterface = false;
	    		vm.Domain = false;
	    		vm.Application = false;
			    vm.ApprovedElement = false;
			    vm.SolutionBlueprint = false;
				vm.Terminology = false;
				vm.Event = false;
	    	}
    	
    		
    	} else {
    		if (vm.Application == false && vm.ApprovedElement == false && vm.Domain == false && vm.Event == false && 
	    					vm.Terminology == false && vm.IsInterface == false && vm.SolutionBlueprint == false) {
	    		vm.allTypes = "false";
	    	
	    	} else if (vm.Application == true && vm.ApprovedElement == true && vm.Domain == true && vm.Event == true && 
	    					vm.Terminology == true && vm.IsInterface == true && vm.SolutionBlueprint == true) {
	    		vm.allTypes = "true";
	    	
	    	} else {
	    		vm.allTypes = "0";
	    	}
    	}
    	// END check tristate button for "all On <-> all OFF"
		
    	
    	var suche = "";
    	
    	suchTypString = "artefactType eq 'nix'";
		lcStatusString = "lifecycle eq 'nix'";
    	
    	if (angular.isObject(vm.test)) {
    		suche = vm.test.title;
		} else {
    		suche = vm.test;
    	}
    
	
		//artefactType:
		if (vm.Application == true) {
			suchTypString = suchTypString + " or artefactType eq 'Application'";
		}
		if (vm.ApprovedElement == true) {
			suchTypString = suchTypString + " or artefactType eq 'ApprovedElement'";
		}
		if (vm.Domain == true) {
			suchTypString = suchTypString + " or artefactType eq 'Domain'";
		}
		if (vm.Event == true) {
			suchTypString = suchTypString + " or artefactType eq 'Event'";
		}
		if (vm.Terminology == true) {
			suchTypString = suchTypString + " or artefactType eq 'Terminology'";
		}
		if (vm.IsInterface == true) {
			suchTypString = suchTypString + " or artefactType eq 'IsInterface'";
		}
		if (vm.SolutionBlueprint == true) {
			suchTypString = suchTypString + " or artefactType eq 'SolutionBlueprint'";
		}		
  
	
		//lifecycle:
		if (vm.Planned == true) {
			lcStatusString = lcStatusString + " or lifecycle eq 'planned'";
		}
		if (vm.Active == true) {
			lcStatusString = lcStatusString + " or lifecycle eq 'active'";
		}
		if (vm.Retired == true) {
			lcStatusString = lcStatusString + " or lifecycle eq 'retired'";
		}
		
	
		//profileString:
		// if (vm.profile == 'Business') {
		// 	profileString = "&scoringProfile=biz-score";
		  
		// } else if (vm.profile == 'IT') {
		// 	profileString = "&scoringProfile=arch-score";
		// }
	
	
		// filterString zusammenbauen
		// lifecycle muss mit einem AND mit artefactType verbunden werden:
		filterString = '&$filter=(' + suchTypString + ') and (' + lcStatusString + ')' ; //+ profileString ;
	
	
		// API GET zusammenbauen:		  
		vm.url = vm.apiHostname + suche + filterString;
    	console.log(vm.url);
			
		if (!isEmpty(suche)) {
			var responsePromise = $http.get(vm.url, config, {});
	    
	    	responsePromise.success(function (dataFromServer, status, headers, config) {
	    		var stringified = JSON.stringify(dataFromServer);
	  	  		stringified = stringified.replace(/@odata.count/g, 'responsecounter'); 
	  	  		stringified = stringified.replace(/@odata.nextLink/g, 'nextlink'); 
	  	  		dataFromServer = JSON.parse(stringified);
	    	
	    		vm.results = dataFromServer.value;
	        	vm.count = dataFromServer.responsecounter;
	        	vm.nextPage = dataFromServer.nextlink;
	        	vm.showSearchResults = true;
	        	
	        	if (!isEmpty(vm.nextPage)) {
	        		vm.showNextPage = true;
	        		vm.moreThanOnePage = true;
	        		vm.lastPageItem = vm.nextPage.substr(vm.nextPage.indexOf(vm.PAGINATION_STRING) + vm.PAGINATION_STRING.length);
    				vm.pageCounter = (vm.lastPageItem - 49) + " - " + vm.lastPageItem;
    				console.log("next page link exists:" + vm.nextPage);
	        	
	        	} else {
	        		vm.showNextPage = false;
	        		vm.moreThanOnePage = false;
	        	}
	    	});
	    
	    	responsePromise.error(function (data, status, headers, config) {
	        	alert("Submitting form failed!");
	    	});
		
			
		} else {
	    	vm.showSearchResults = false;
	    	vm.results = [];
		}
	    
	};


	vm.nextpage = function (item, event) {
    	if (vm.nextPage.indexOf(vm.PAGINATION_STRING) > 0) {
    		
    		if (vm.url.indexOf(vm.PAGINATION_STRING) > 0) {
    			vm.url = vm.url.substr(0, vm.url.indexOf(vm.PAGINATION_STRING));
    		}
    		
    		vm.url = vm.url + vm.nextPage.substr(vm.nextPage.indexOf(vm.PAGINATION_STRING));
    	
	    	var responsePromise = $http.get(vm.url, config, {});
		    
	    	responsePromise.success(function (dataFromServer, status, headers, config) {
	    		var stringified = JSON.stringify(dataFromServer);
	  	  		stringified = stringified.replace(/@odata.count/g, 'responsecounter'); 
	  	  		stringified = stringified.replace(/@odata.nextLink/g, 'nextlink'); 
	  	  		dataFromServer = JSON.parse(stringified);
	    	
	    		vm.results = dataFromServer.value;
	        	vm.count = dataFromServer.responsecounter;
	        	vm.nextPage = dataFromServer.nextlink;
	        	vm.showSearchResults = true;
	        	
	        	if (!isEmpty(vm.nextPage)) {
	        		vm.showNextPage = true;
	        		vm.lastPageItem = vm.nextPage.substr(vm.nextPage.indexOf(vm.PAGINATION_STRING) + vm.PAGINATION_STRING.length);
    				vm.pageCounter = (vm.lastPageItem - 49) + " - " + vm.lastPageItem;
	        		console.log(vm.nextPage);
	        	
	        		
	        	} else {
	        		vm.showNextPage = false;
	        		vm.pageCounter = (parseInt(vm.lastPageItem) + 1) + " - " + vm.count;
	        	}
	    	});
    
	    	responsePromise.error(function (data, status, headers, config) {
	        	alert("Submitting form failed!");
	    	});
    	}
    }
	
});



angular.module('app').filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});


function isEmpty(str) {
    var isEmpty = false;
    if (!str) {
        isEmpty = true;
    
    	
    } else {
        if (str.length == 0) {
            isEmpty = true;
        } else if (str.trim().length == 0) {
            isEmpty = true;
        }   
    }
    return isEmpty;
}

