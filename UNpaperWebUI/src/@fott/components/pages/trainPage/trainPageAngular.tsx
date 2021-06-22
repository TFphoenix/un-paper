import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IProject, IAppSettings } from 'src/@fott/models/applicationState';
import IProjectActions from 'src/@fott/redux/actions/projectActions';
import TrainPage, { ITrainPageProps } from './trainPage';

const containerElementName = 'fottTrainPageContainer';

@Component({
  selector: 'fott-train-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './trainPage.scss',
    '../../../fott.scss',
    '../../../common/scss/condensedList.scss',
    '../../common/tableView/tableView.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TrainPagePageAngular implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;
  @Input() project: IProject;

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

    const trainProperties: ITrainPageProps = {
      connections: [this.project.sourceConnection], //REMEMBER: Don't know if it works correctly
      appSettings: {
        securityTokens: [
          {
            name: this.project.securityToken, //REMEMBER: Don't know if it works correctly
            key: ''
          }
        ]
      } as IAppSettings,
      project: this.project,
      actions: {} as IProjectActions,
      applicationActions: null,
      recentProjects: [],
      appTitleActions: null,
      history: null,
      location: null,
      match: JSON.parse(`{
      "params": {
          "projectId": "${this.project.id}"
      }}`)
    };

    ReactDOM.render(
      <div className={'fott-train-page'}>
        <TrainPage
          connections={trainProperties.connections}
          project={trainProperties.project}
          recentProjects={trainProperties.recentProjects}
          appSettings={trainProperties.appSettings}
          actions={trainProperties.actions}
          applicationActions={trainProperties.applicationActions}
          appTitleActions={trainProperties.appTitleActions}
          history={trainProperties.history}
          location={trainProperties.location}
          match={trainProperties.match}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
