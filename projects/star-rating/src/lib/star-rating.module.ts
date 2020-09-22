import { NgModule } from '@angular/core';
import { StarRatingComponent } from './star-rating.component';
import { StarItemComponent } from './star-item/star-item.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [StarRatingComponent, StarItemComponent],
  imports: [
    BrowserModule,
    MatIconModule
  ],
  exports: [StarRatingComponent]
})
export class StarRatingModule { }
