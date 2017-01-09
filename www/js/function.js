var app = angular.module("app", ['onsen']);

app.controller("AppController", function($scope,$http){


	$scope.name="http://192.168.0.10:8084/";
	//$scope.name="http://localhost:8084/";
	$scope.urlProsumer ={listHotel: $scope.name+"TripPlanner.Prosumer.Web/app/list-hotel",
						listFlight: $scope.name+"TripPlanner.Prosumer.Web/app/list-flight",
						listCar: $scope.name+"TripPlanner.Prosumer.Web/app/list-car"};
	
	$scope.data = null;
	$scope.data2Header = null;
	$scope.data2 = null;
	$scope.data3 = null;
	$scope.data3extra = null;
	
	$scope.hotel = null;
	$scope.flight = null;
	$scope.car = null;
	
	$scope.searchCars = function () {
		/*validation*/
		var sPickup_place = document.getElementById("pickup_place").value;
		var sDropoff_place = document.getElementById("dropoff_place").value;
		var sPickup_date_time = document.getElementById("pickup_date_time").value;
		var sDrop_off_date_time = document.getElementById("drop_off_date_time").value;
		
		if(sPickup_place.trim()==""){
			alert("Error! Field Pickup place is empty...");
			return;
		}
		
		if(sDropoff_place.trim()==""){
			alert("Error! Field Dropoff place is empty...");
			return;
		}
		
		if(sPickup_date_time.trim()==""){
			alert("Error! Field Pickup date time is empty...");
			return;
		}
		
		if(sDrop_off_date_time.trim()==""){
			alert("Error! Field Drop off date time is empty...");
			return;
		}
	
		/*sPickup_place="FCO";
		sDropoff_place="FCO";*/
		sPickup_date_time=sPickup_date_time+"T10:00";
		sDrop_off_date_time=sDrop_off_date_time+"T10:05";
		
		document.getElementById("myImgLoading").style.visibility = "visible";
		
		$http.get($scope.urlProsumer.listCar+"?pickup_place="+sPickup_place+"&dropoff_place="+sDropoff_place+"&pickup_date_time="+sPickup_date_time+"&drop_off_date_time="+sDrop_off_date_time)
            .success(
            function(response){
				$scope.data3 = response;	
				if($scope.data3.data.carhire == null){
					document.getElementById("myImgLoading").style.visibility = "hidden";
					alert("Error in data...");
					return;
				}
				
				if($scope.data3.data.carhire.cars.length==0){
					document.getElementById("myImgLoading").style.visibility = "hidden";
					alert("NO RESULTS FOUND");
					return;
				}
				
				for(var i = 0; i < $scope.data3.data.carhire.cars.length; i++){
					for(var x =0; x < $scope.data3.data.carhire.images.length; x++){
						if($scope.data3.data.carhire.cars[i].imageId == $scope.data3.data.carhire.images[x].id){
							$scope.data3.data.carhire.cars[i].img_url = $scope.data3.data.carhire.images[x].url;
							break;
						}
					}
					for(var x = 0; x < $scope.data3.data.carhire.carClasses.length; x++){
						if($scope.data3.data.carhire.cars[i].carClassId == $scope.data3.data.carhire.carClasses[x].id){
							$scope.data3.data.carhire.cars[i].car_class_ty = $scope.data3.data.carhire.carClasses[x].name;
							break;
						}
					}
					
				}	
				document.getElementById("myImgLoading").style.visibility = "hidden";   
            })
            .error(
            function(error){
				document.getElementById("myImgLoading").style.visibility = "hidden";
                alert("Revise su conexión a internet... "+error);				
            });
	}
	
	$scope.searchFlights = function () {
		/*validation*/
		var sOrigin = document.getElementById("origin").value;
		var sDetination = document.getElementById("destination").value;
		var sDate = document.getElementById("date").value;
		
		if(sOrigin.trim()==""){
			alert("Error! Field origin is empty...");
			return;
		}
		
		if(sDetination.trim()==""){
			alert("Error! Field destination is empty...");
			return;
		}
		
		if(sDate.trim()==""){
			alert("Error! Field date is empty...");
			return;
		}
		
		var pORIGIN = null;
		var pDESTINATION = null;
		var pDATE = null;
		
		pORIGIN=sOrigin;
		pDESTINATION=sDetination;
		pDATE=sDate;
		
		document.getElementById("myImgLoading").style.visibility = "visible";
		
		$http.get($scope.urlProsumer.listFlight+"?ORIGIN="+pORIGIN+"&DESTINATION="+pDESTINATION+"&DATE="+pDATE)
            .success(
            function(response){
				document.getElementById("myImgLoading").style.visibility = "hidden";
				if(response.data.amount>0){
					$scope.data2Header = response;
					$scope.data2 = $scope.data2Header;
					
					for(ind = 0; ind < $scope.data2.data.flightOption.length; ind++){
						var timeArr = $scope.data2.data.flightOption[ind].timeArr;
						var timeDep = $scope.data2.data.flightOption[ind].timeDep;
						
						$scope.data2.data.flightOption[ind].timeArr = timeArr.substring(0,10)+" "+timeArr.substring(11,16);
						$scope.data2.data.flightOption[ind].timeDep = timeDep.substring(0,10)+" "+timeDep.substring(11,16);				
					}					
				}else{
					alert("There is no data...");
					data2=null;				
				}
            })
            .error(
            function(error){
				document.getElementById("myImgLoading").style.visibility = "hidden";
                alert("Revise su conexión a internet... "+error);
            });
	}
	
	
	$scope.searchHotels = function () {
	
		/*validation*/
		var sCity = document.getElementById("city").value;
		if(sCity.trim()==""){
			alert("Error! Field city is empty...");
			return;
		}
		
		var ID_CITY = null;
		var COUNTRY = null;
		
		if(sCity.trim()=="Rome" || sCity.trim()=="rome" || sCity.trim()=="ROME"){
			COUNTRY= "Italy";
			ID_CITY="RO";
		}if(sCity.trim()=="Amsterdam" || sCity.trim()=="amsterdam" || sCity.trim()=="AMSTERDAM"){
			COUNTRY= "Netherland";
			ID_CITY="AMS";
		}
		
		document.getElementById("myImgLoading").style.visibility = "visible";
	
        $http.get($scope.urlProsumer.listHotel+"?COUNTRY="+COUNTRY+"&ID_CITY="+ID_CITY)
            .success(
            function(response){
				document.getElementById("myImgLoading").style.visibility = "hidden";
				if(response.data.amount>0){
					$scope.data = response.data.listhotels;					
				}else{
					$scope.data = null;
					alert("There is no hotels");
				}
            })
            .error(
            function(error){
				document.getElementById("myImgLoading").style.visibility = "hidden";
                alert("Revise su conexión a internet... "+error);
            });
    }
	
	$scope.registerHotel = function (sHotel) {
		$scope.hotel = sHotel;
		myNavigator.pushPage('register_hotel.html', { animation : 'lift' });
	}
	
	$scope.init = function (myNavigator){
		$scope.data = null;
		myNavigator.pushPage('menu.html', { animation : 'lift' });
	}
	
	$scope.add_coment = function (){
		alert("Comment Added");
		$scope.hotel = null;
		$scope.flight = null;
		$scope.car = null;
		myNavigator.pushPage('menu.html', { animation : 'lift' });
	}
	
});
