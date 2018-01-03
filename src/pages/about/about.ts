import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

declare var google: any;



/**
 * Generated class for the Inicio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

 map: any; // Manejador del mapa.
 coords : any = { lat: 0, lng: 0 }
 coords2 : any = { lat: 0, lng: 0 }
directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,public  platform: Platform) {
    platform.ready().then(() => {
      // La plataforma esta lista y ya tenemos acceso a los plugins.
        this.obtenerPosicion();

 
        //this.getAddress(this.coords);
     });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Inicio');
  }

  loadMap(){
   let mapContainer = document.getElementById('map');
    this.map = new google.maps.Map(mapContainer, {
      center: this.coords,
      zoom: 15
    });
     let miMarker = new google.maps.Marker({
              icon : 'assets/imgs/tq2.png',
              map: this.map,
              position: this.coords
          }); 
}

 obtenerPosicion():any{
    this.geolocation.getCurrentPosition().then(res => {
      this.coords2.lat = res.coords.latitude;
      this.coords2.lng = res.coords.longitude;

      this.coords.lat=8.617784;
      this.coords.lng=-70.254875;
      this.loadMap();
            let miMarker2 = new google.maps.Marker({
              icon : 'assets/imgs/ico_estoy_aqui.png',
              map: this.map,
              position: this.coords2
          });

this.directionsDisplay.setMap(this.map);
 
this.directionsService.route({
      origin: this.coords2,
      destination: this.coords,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    })
    .catch(
      (error)=>{
        console.log(error);
      }
    );
  }

  getAddress(coords):any {
    var geocoder = new google.maps.Geocoder();

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'location': coords} , function (results, status) { // llamado asincronamente
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
  }
}