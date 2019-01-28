import { Component, NgZone } from '@angular/core';

import { latLng, LatLng, tileLayer } from 'leaflet';

import * as L from 'leaflet';
import "leaflet.vectorgrid";

@Component({
	selector: 'leafletCoreDemo',
	templateUrl: './core-demo.component.html'
})
export class LeafletCoreDemoComponent {

	optionsSpec: any = {
		layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
		zoom: 8,
		center: [44.8383, 5.5028]
	};

	// Leaflet bindings
	zoom = this.optionsSpec.zoom;
	center = latLng(this.optionsSpec.center);
	options = {
		layers: [ tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution }) ],
		zoom: this.optionsSpec.zoom,
		center: latLng(this.optionsSpec.center)
	};

	// Form bindings
	formZoom = this.zoom;
	zoomLevels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ];
	lat = this.center.lat;
	lng = this.center.lng;

constructor(private zone: NgZone) { }

  stylingFunction(p: any): any {
  	if (p.insee.indexOf('100') === -1) {
  		// return { weight: 0, fill: false};
  	}
    return {
      weight: 2,
      color: 'red',
      opacity: 1,
      fill: true,
      radius: 1,
      fillOpacity: 0.8
    };
  }

  onMapReady(map: any) {
    // noinspection JSUnusedGlobalSymbols
    const vectorTileOptions = {
      vectorTileLayerStyles: {
        "cities-point": (p: any) =>
          this.stylingFunction(p),
      },
      interactive: false // Make sure that this VectorGrid fires mouse/pointer events
    };

    this.zone.runOutsideAngular(() => {
	    L.vectorGrid.protobuf(
	      "http://localhost:9999/maps/batimap/{z}/{x}/{y}.vector.pbf",
	      // "https://cadastre.damsy.net/tiles/maps/batimap/{z}/{x}/{y}.vector.pbf",
	      vectorTileOptions
	    ).addTo(map);
	});
  }

	// Output binding for center
	onCenterChange(center: LatLng) {
		setTimeout(() => {
			this.lat = center.lat;
			this.lng = center.lng;
		});
	}

	onZoomChange(zoom: number) {
		setTimeout(() => {
			this.formZoom = zoom;
		});
	}

	doApply() {
		this.center = latLng(this.lat, this.lng);
		this.zoom = this.formZoom;
	}
}
