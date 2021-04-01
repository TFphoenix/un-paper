import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-canvas-command-bar',
  templateUrl: './canvas-command-bar.component.html',
  styleUrls: ['./canvas-command-bar.component.scss']
})
export class CanvasCommandBarComponent implements OnInit {
  layers = new FormControl();
  layersList: string[] = ['Text', 'Tables', 'Selection marks', 'Labels'];

  constructor() {}

  ngOnInit(): void {}
}
