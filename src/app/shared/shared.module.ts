import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const components = [
  HeaderComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ...components
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class SharedModule { }
