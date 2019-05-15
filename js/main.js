;(function() {
	"use strict";

	let hotSlider = $('.ba-hot-slider');

	let hotSliderImages = $('.ba-hot-slider-images');
	
	hotSlider.slick({
		infinite: false,
		prevArrow: $('[data-hot-prev]'),
		nextArrow: $('[data-hot-next]'),
		asNavFor: hotSliderImages
	});
	
	hotSliderImages.slick({
		infinite: false,
		arrows: false,
		asNavFor: hotSlider,
		fade:true
	});

	let bestSlider = $('#best'); 

	bestSlider.slick({
		slide: '.ba-offer',
		infinite: false,
		prevArrow: bestSlider.find('[data-prev]'),
		nextArrow: bestSlider.find('[data-next]')
	});
	
	//Change number of slides
	let curentSlideEl = $('[data-current-offer]');
	let totalSlideEl = $('[data-total-offer]');
	
	let slidesCount = $('.ba-offer').length;

	slidesCount = slidesCount < 10 ? '0' + slidesCount : slidesCount;

	totalSlideEl.text(slidesCount); //Set total slides

	bestSlider.on('beforeChange', (event, slick, currentSlide, nextSlide) =>{
		nextSlide++;
		nextSlide = nextSlide < 10 ? '0' + nextSlide : nextSlide;
		curentSlideEl.text(nextSlide);
	});
	//Mob nav toggle
	const menuToggleBtn = $('.ba-menu-toggle, .ba-overlay');
	const mobNav = $('.ba-mob-nav');

	menuToggleBtn.on('click', () => mobNav.toggleClass('ba-open'));


	//Add map

	function baMap() {
		//Creat map and asign to ths baMap var 

		let mapCenter = {
			lat: 41.902782, 
			lng: 12.496365
		};

		let baMap = new google.maps.Map(document.getElementById('ba-map'), {
			center: mapCenter,
			zoom: 6,
			styles: [
				{
					 "featureType": "water",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#e9e9e9"
						  },
						  {
								"lightness": 17
						  }
					 ]
				},
				{
					 "featureType": "landscape",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#f5f5f5"
						  },
						  {
								"lightness": 20
						  }
					 ]
				},
				{
					 "featureType": "road.highway",
					 "elementType": "geometry.fill",
					 "stylers": [
						  {
								"color": "#ffffff"
						  },
						  {
								"lightness": 17
						  }
					 ]
				},
				{
					 "featureType": "road.highway",
					 "elementType": "geometry.stroke",
					 "stylers": [
						  {
								"color": "#ffffff"
						  },
						  {
								"lightness": 29
						  },
						  {
								"weight": 0.2
						  }
					 ]
				},
				{
					 "featureType": "road.arterial",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#ffffff"
						  },
						  {
								"lightness": 18
						  }
					 ]
				},
				{
					 "featureType": "road.local",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#ffffff"
						  },
						  {
								"lightness": 16
						  }
					 ]
				},
				{
					 "featureType": "poi",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#f5f5f5"
						  },
						  {
								"lightness": 21
						  }
					 ]
				},
				{
					 "featureType": "poi.park",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#dedede"
						  },
						  {
								"lightness": 21
						  }
					 ]
				},
				{
					 "elementType": "labels.text.stroke",
					 "stylers": [
						  {
								"visibility": "on"
						  },
						  {
								"color": "#ffffff"
						  },
						  {
								"lightness": 16
						  }
					 ]
				},
				{
					 "elementType": "labels.text.fill",
					 "stylers": [
						  {
								"saturation": 36
						  },
						  {
								"color": "#333333"
						  },
						  {
								"lightness": 40
						  }
					 ]
				},
				{
					 "elementType": "labels.icon",
					 "stylers": [
						  {
								"visibility": "off"
						  }
					 ]
				},
				{
					 "featureType": "transit",
					 "elementType": "geometry",
					 "stylers": [
						  {
								"color": "#f2f2f2"
						  },
						  {
								"lightness": 19
						  }
					 ]
				},
				{
					 "featureType": "administrative",
					 "elementType": "geometry.fill",
					 "stylers": [
						  {
								"color": "#fefefe"
						  },
						  {
								"lightness": 20
						  }
					 ]
				},
				{
					 "featureType": "administrative",
					 "elementType": "geometry.stroke",
					 "stylers": [
						  {
								"color": "#fefefe"
						  },
						  {
								"lightness": 17
						  },
						  {
								"weight": 1.2
						  }
					 ]
				}
		  ]

		});
		
		// The marker, positioned at Uluru
		let cities = {
			rome: {lat: 41.902782, lng: 12.496365},
			leon: {lat:43.874566, lng:-1.242448},
			cuenca: {lat:40.091381, lng:-2.012919},
			kiev: {lat:50.450100, lng:30.523399}
		}
		let mapMarkers = {};

		for(let key in cities){

			let marker = new google.maps.Marker(
				{
					position: cities[key], 
					map: baMap,
					icon: 'img/marker.svg',
					animation: google.maps.Animation.DROP
				}
			);

			let infowindow = new google.maps.InfoWindow({
				content: '<b>' + key + '</b>'
			});
			infowindow.open(baMap, marker);

			mapMarkers[key] = marker; //Save markers in object
		}		
		
		baMap.setCenter(mapCenter);

		//On select city
		$('#city-select').on('change', function (e) {
			// console.log(this.value);

			baMap.panTo(cities[this.value]);
		});

	} //Function baMap

	$(document).ready(function (e) {
		console.log('Doc ready');

		baMap();
	});


})();