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
import { IAppSettings, IPrebuiltSettings } from 'src/@fott/models/applicationState';
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
  // @Input() serviceCredentials: IEditorSettings;

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
    // if (!this.containerRef) {
    //   return;
    // }

    const editorProperties: IEditorPageProps = {
      project: JSON.parse(`{
		"sourceConnection": {
			"providerOptions": {
				"sas": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D"
			},
			"id": "",
			"name": "UNpaper - blob container",
			"providerType": "azureBlobStorage"
		},
		"apiKey": "04c151ae65344c4fb1df1c59e1d22f47",
		"name": "Digi Invoices",
		"folderPath": "Digi Invoices PDF 1pag",
		"apiUriBase": "https://unpaper-form-recognizer.cognitiveservices.azure.com/",
		"securityToken": "Digi Invoices Token",
		"version": "2.1.3",
		"id": "wesjZ6mC7",
		"tags": [
			{
				"name": "Costumer Name",
				"color": "#CC543A",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			},
			{
				"name": "Transaction Date",
				"color": "#7BA23F",
				"type": "date",
				"format": "dmy",
				"documentCount": 5
			},
			{
				"name": "Costumer Code",
				"color": "#58B2DC",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			},
			{
				"name": "Invoice Number",
				"color": "#FFB11B",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			}
		]
	}`),
      recentProjects: [],
      appSettings: {
        securityTokens: [
          {
            name: 'Digi Invoices Token', //REMEMBER: value of project.securityToken
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
          "projectId": ""
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
