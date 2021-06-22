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
import { IAppSettings, IPrebuiltSettings, IProject } from 'src/@fott/models/applicationState';
// import IProjectActions, { loadAssets, loadProject } from 'src/@fott/redux/actions/projectActions';
import IProjectActions, * as ProjectActions from 'src/@fott/redux/actions/projectActions';
import { environment } from 'src/environments/environment';
import { EditorPage, IEditorPageProps } from './editorPage';

const containerElementName = 'fottEditorPageContainer';

@Component({
  selector: 'fott-editor-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './editorPage.scss',
    '../../../fott.scss',
    '../../../common/scss/canvas.scss',
    '../../../common/scss/condensedList.scss',
    '../../common/imageMap/imageMap.scss',
    '../../common/pageRange/pageRange.scss',
    '../../common/canvasCommandBar/canvasCommandBar.scss',
    '../../common/tableView/tableView.scss',
    '../../common/tagInput/tagInput.scss',
    '../../common/tagInput/tagInputSize.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EditorPagePageAngular implements OnChanges, OnDestroy, AfterViewInit {
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

    const editorProperties: IEditorPageProps = {
      project: this.project,
      recentProjects: [],
      appSettings: {
        securityTokens: [
          {
            name: this.project.securityToken, //REMEMBER: Don't know if it works correctly
            key: ''
          }
        ]
      } as IAppSettings,
      actions: {} as IProjectActions,
      applicationActions: null,
      appTitleActions: null,
      history: null,
      location: null,
      match: JSON.parse(`{
      "params": {
          "projectId": "${this.project.id}"
      }}`)
    };

    ReactDOM.render(
      <div className={'fott-editor-page'}>
        <EditorPage
          project={editorProperties.project}
          recentProjects={editorProperties.recentProjects}
          appSettings={editorProperties.appSettings}
          actions={editorProperties.actions}
          applicationActions={editorProperties.applicationActions}
          appTitleActions={editorProperties.appTitleActions}
          history={editorProperties.history}
          location={editorProperties.location}
          match={editorProperties.match}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
