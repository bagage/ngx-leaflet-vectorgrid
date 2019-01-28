import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '../../../leaflet/leaflet.module';

import { LeafletDemoComponent } from './leaflet-demo.component';
import { LeafletCoreDemoComponent } from './core/core-demo.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LeafletModule.forRoot()
	],
	declarations: [
		LeafletDemoComponent,
		LeafletCoreDemoComponent,
	],
	exports: [
		LeafletDemoComponent
	],
	bootstrap: [ LeafletDemoComponent ],
	providers: [ ]
})
export class LeafletDemoModule { }
