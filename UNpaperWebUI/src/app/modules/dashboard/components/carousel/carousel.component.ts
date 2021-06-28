import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'unp-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChildren('slide') slides: QueryList<ElementRef>;
  @ViewChildren('dot') dots: QueryList<ElementRef>;

  slideIndex = 1;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n) {
    let i: number;
    let slides = this.slides.toArray();
    let dots = this.dots.toArray();

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].nativeElement.style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].nativeElement.className = dots[i].nativeElement.className.replace(' active', '');
    }
    slides[this.slideIndex - 1].nativeElement.style.display = 'block';
    dots[this.slideIndex - 1].nativeElement.className += ' active';
  }
}
