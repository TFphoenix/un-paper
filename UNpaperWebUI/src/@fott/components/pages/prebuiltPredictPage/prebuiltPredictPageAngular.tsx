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
import { IPrebuiltSettings } from 'src/@fott/models/applicationState';
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
  @Input() serviceCredentials: IPrebuiltSettings;

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
    // REMEMBER: Necessary because of @Input()
    if (!this.containerRef) {
      return;
    }
    ReactDOM.render(
      <div className={'fott-prebuilt-predict-page'}>
        <PrebuiltPredictPage
          prebuiltSettings={this.serviceCredentials}
          appTitleActions={{
            setTitle: (title: string): void => {}
          }}
          actions={{
            update: (setting: { serviceURI: string; apiKey: string }): void => {}
          }}
          history={null}
          location={null}
          match={null}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
