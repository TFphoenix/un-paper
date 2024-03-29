import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPrebuiltSettings } from 'src/@fott/models/applicationState';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';
import { environment } from 'src/environments/environment';
import { LayoutPredictPage } from './layoutPredictPage';

const containerElementName = 'fottLayoutPredictPageContainer';

@Component({
  selector: 'fott-layout-predict-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './layoutPredictPage.scss',
    '../../../fott.scss',
    '../../../common/scss/canvas.scss',
    '../../../common/scss/condensedList.scss',
    '../../common/documentFilePicker/documentFilePicker.scss',
    '../../common/imageMap/imageMap.scss',
    '../../common/canvasCommandBar/canvasCommandBar.scss',
    '../../common/pageRange/pageRange.scss',
    '../../common/tableView/tableView.scss',
    '../../common/predictResult/predictResult.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class LayoutPredictPageAngular implements OnChanges, OnDestroy, AfterViewInit {
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
      <div className={'fott-layout-predict-page'}>
        <LayoutPredictPage
          prebuiltSettings={this.serviceCredentials}
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
