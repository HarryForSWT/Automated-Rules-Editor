import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const MaterialComponents = 
[MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatProgressBarModule,
  MatTreeModule];

@NgModule({
  
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
