import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { environment } from 'src/environments/environment';
import { PrebuiltPredictPage } from './prebuiltPredictPage';

const containerElementName = 'fottPrebuiltPredictPageContainer';

@Component({
  selector: 'fott-prebuilt-predict-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './prebuiltPredictPage.scss',
    './predictPage.scss',
    '../../../fott.scss',
    '../../../common/scss/canvas.scss',
    '../../../common/scss/condensedList.scss',
    '../../common/documentFilePicker/documentFilePicker.scss',
    '../../common/predictionFilePicker/predictionFilePicker.scss',
    '../../common/imageMap/imageMap.scss',
    '../../common/pageRange/pageRange.scss',
    '../../common/canvasCommandBar/canvasCommandBar.scss',
    '../../common/tableView/tableView.scss',
    '../../common/predictResult/predictResult.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PrebuiltPredictPageAngular implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    ReactDOM.render(
      <div className={'fott-prebuilt-predict-page'}>
        <PrebuiltPredictPage
          prebuiltSettings={environment.formRecognizer}
          appTitleActions={{
            setTitle: (title: string): void => {}
          }}
          actions={{
            update: (setting: { serviceURI: string; apiKey: string }): void => {}
          }}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
