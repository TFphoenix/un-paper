import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMapComponent } from './components/image-map/image-map.component';

@NgModule({
  declarations: [ImageMapComponent],
  imports: [CommonModule],
  exports: [ImageMapComponent]
})
export class SharedModule {}
