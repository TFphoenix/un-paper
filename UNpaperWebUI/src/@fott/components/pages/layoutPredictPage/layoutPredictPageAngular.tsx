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
import { LayoutPredictPage } from './LayoutPredictPage';

const containerElementName = 'fottLayoutPredictPageContainer';

@Component({
  selector: 'fott-layout-predict-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: ['./LayoutPredictPage.scss', '../../../fott.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutPredictPageAngular implements OnChanges, OnDestroy, AfterViewInit {
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
      <div className={'fott-layout-predict-page'}>
        <LayoutPredictPage
          // history= {
          //     {
          //         length: 5,
          //         action: "PUSH",
          //         location: {
          //             pathname: "/layout-analyze",
          //             search: "",
          //             hash: "",
          //             state: null,
          //             key: "jvxoju"
          //         }
          //     }
          // }
          // location= {
          //     pathname: "/layout-analyze",
          //     search: "",
          //     hash: "",
          //     state: null,
          //     key: "jvxoju"
          // }
          // match= {
          //     path: "/layout-analyze",
          //     url: "/layout-analyze",
          //     isExact: true,
          //     params: {}
          // }
          prebuiltSettings={{
            serviceURI: 'https://unpaper-form-recognizer.cognitiveservices.azure.com/',
            apiKey: '04c151ae65344c4fb1df1c59e1d22f47'
          }}
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
