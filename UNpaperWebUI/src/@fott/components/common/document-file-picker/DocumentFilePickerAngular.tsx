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
  ViewEncapsulation,
} from "@angular/core";
import { DocumentFilePicker } from "./DocumentFilePicker";
import * as React from "react";

import * as ReactDOM from "react-dom";

const containerElementName = "documentFilePickerContainer";

@Component({
  selector: "app-test-component",
  template: `<span #${containerElementName}></span>`,
  styleUrls: ["./DocumentFilePicker.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentFilePickerAngular
  implements OnChanges, OnDestroy, AfterViewInit {
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
      <div className={"test-component"}>
        <DocumentFilePicker
          disabled={false}
          onFileChange={(data) => this.onFileChange(data)}
          onError={(err) => this.onError(err)}
          onSelectSourceChange={() => this.onSelectSourceChange()}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }

  private onError(err: any): void {
    console.log("ERROR");
    console.log(err);
  }

  private onSelectSourceChange(): void {
    console.log("SELECTED SOURCE CHANGED");
  }

  private onFileChange(data: any): void {
    console.log("FILE CHANGED");
    console.log(data);
  }
}
