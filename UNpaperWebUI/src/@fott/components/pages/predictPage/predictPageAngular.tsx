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
import PredictPage, { IPredictPageProps } from './predictPage';

const containerElementName = 'fottPredictPageContainer';

@Component({
  selector: 'fott-predict-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './predictPage.scss',
    './predictModelInfo.scss',
    './predictResult.scss',
    './uploadToTrainingSetView.scss',
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
export class PredictPagePageAngular implements OnChanges, OnDestroy, AfterViewInit {
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

    const predictProperties: IPredictPageProps = {
      connections: [this.project.sourceConnection], //REMEMBER: Don't know if it works correctly
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
        "path": "/projects/:projectId/predict",
        "url": "/projects/STJncKkfH/predict",
        "isExact": true,
        "params": {
            "projectId": "${this.project.id}"
        }
    }`)
    };

    ReactDOM.render(
      <div className={'fott-predict-page'}>
        <Provider store={this._storeProviderService.getStore()}>
          <PredictPage
            connections={predictProperties.connections}
            project={predictProperties.project}
            recentProjects={predictProperties.recentProjects}
            appSettings={predictProperties.appSettings}
            actions={predictProperties.actions}
            applicationActions={predictProperties.applicationActions}
            appTitleActions={predictProperties.appTitleActions}
            history={predictProperties.history}
            location={predictProperties.location}
            match={predictProperties.match}
          />
        </Provider>
      </div>,
      this.containerRef.nativeElement
    );
  }
}
