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
import { registerIcons } from './registerIcons';
import * as React from 'react';

// import { Provider } from 'react-redux';
// import createReduxStore from './redux/store/store';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IApplicationState } from './models/applicationState';
import initialState from './redux/store/initialState';
import registerMixins from './registerMixins';
import registerProviders from './registerProviders';
import * as serviceWorker from './serviceWorker';

const containerElementName = 'fottReactAppContainer';

@Component({
  selector: 'app-my-component',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: ['./App.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppAngularWrapper implements OnChanges, OnDestroy, AfterViewInit {
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

  private async render() {
    // Set-up React component dependencies
    registerIcons();
    registerMixins();
    registerProviders();
    const defaultState: IApplicationState = initialState;
    // const store = await createReduxStore(defaultState, true);

    let noFocusOutline = true;
    document.body.classList.add('no-focus-outline');

    document.body.addEventListener('mousedown', () => {
      if (!noFocusOutline) {
        noFocusOutline = true;
        document.body.classList.add('no-focus-outline');
      }
    });

    document.body.addEventListener('keydown', event => {
      if (event.keyCode === 9 && noFocusOutline) {
        noFocusOutline = false;
        document.body.classList.remove('no-focus-outline');
      }
    });

    // Renders React component
    ReactDOM.render(
      <div className={'fott-react'}>
        <App currentProject={null} appError={null} actions={null} />
      </div>,
      this.containerRef.nativeElement
    );

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
  }
}
