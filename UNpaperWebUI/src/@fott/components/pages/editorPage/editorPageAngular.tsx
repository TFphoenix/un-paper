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
import { Provider } from 'react-redux';
import { IAppSettings, IProject } from 'src/@fott/models/applicationState';
// import IProjectActions, { loadAssets, loadProject } from 'src/@fott/redux/actions/projectActions';
import IProjectActions from 'src/@fott/redux/actions/projectActions';
import { StoreProviderService } from 'src/app/core/services/store-provider/store-provider.service';
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

  constructor(private readonly _storeProviderService: StoreProviderService) {}

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
      recentProjects: [this.project],
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
        <Provider store={this._storeProviderService.getStore()}>
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
        </Provider>
      </div>,
      this.containerRef.nativeElement
    );
  }
}
