import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';

import {DragDropModule} from '@angular/cdk/drag-drop';
const MaterialComponents = 
[MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressBarModule,
  MatSelectModule,
  MatInputModule,
  MatTooltipModule,
  MatChipsModule,
  MatTreeModule,
  DragDropModule
];

@NgModule({
  
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
