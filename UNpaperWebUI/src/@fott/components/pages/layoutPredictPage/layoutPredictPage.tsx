// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// package imports
import {
  FontIcon,
  IconButton,
  ITooltipHostStyles,
  PrimaryButton,
  Separator,
  Spinner,
  SpinnerSize,
  TooltipHost,
  ContextualMenu,
  IContextualMenuProps
} from '@fluentui/react';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as url from 'url';
import _ from 'lodash';

// common imports
import { downloadFile, zipData, downloadZipFile, poll } from 'src/@fott/common/utils';
import { getPrimaryGreenTheme, getPrimaryWhiteTheme } from 'src/@fott/common/themes';
import { IPrebuiltSettings, ErrorCode } from 'src/@fott/models/applicationState';
import IAppTitleActions, * as appTitleActions from '../../../redux/actions/appTitleActions';
import IAppPrebuiltSettingsActions, * as appPrebuiltSettingsActions from '../../../redux/actions/prebuiltSettingsActions';
import ServiceHelper from '../../../services/serviceHelper';
import { ILoadFileHelper, LoadFileHelper } from 'src/@fott/common/LoadFileHelper';
import { ITableHelper, ITableState, TableHelper } from 'src/@fott/common/tableHelper';
import { ILayoutHelper, LayoutHelper } from 'src/@fott/common/layoutHelper';
import { interpolate, strings } from 'src/@fott/common/strings';
import { constants } from 'src/@fott/common/constants';

// component imports
import Alert from '../../common/alert/alert';
import { DocumentFilePicker } from '../../common/documentFilePicker/documentFilePicker';
import { PageRange } from '../../common/pageRange/pageRange';
// REMEMBER: Not using PrebuiltSetting because apiKey and endpoint are fixed
// import { PrebuiltSetting } from "../../common/prebuiltSetting/prebuiltSetting";
// REMEMBER: Not using PreventLeaving because it generates ERROR: Can't use outside Router
// TODO: Find another way to alert user on leaving during analyzation process
// import PreventLeaving from '../../common/preventLeaving/preventLeaving';
import { CanvasCommandBar } from '../../common/canvasCommandBar/canvasCommandBar';
import { TableView } from '../../common/tableView/tableView';
import { ImageMap } from '../../common/imageMap/imageMap';

interface ILayoutPredictPageProps extends RouteComponentProps {
  prebuiltSettings: IPrebuiltSettings;
  appTitleActions: IAppTitleActions;
  actions: IAppPrebuiltSettingsActions;
}

interface ILayoutPredictPageState extends ITableState {
  layers: any;

  imageUri: string;
  imageWidth: number;
  imageHeight: number;
  currentPage: number;
  numPages: number;

  shouldShowAlert: boolean;
  alertTitle: string;
  alertMessage: string;
  invalidFileFormat?: boolean;

  fileLabel: string;
  file?: File;
  isFetching?: boolean;
  fileLoaded?: boolean;

  isAnalyzing: boolean;
  analyzationLoaded: boolean;
  fetchedFileURL: string;
  layoutData: any;
  imageAngle: number;

  withPageRange: boolean;
  pageRange: string;
  pageRangeIsValid?: boolean;
}

// function mapStateToProps(state: IApplicationState) {
//   return {
//     prebuiltSettings: state.prebuiltSettings,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     appTitleActions: bindActionCreators(appTitleActions, dispatch),
//     actions: bindActionCreators(appPrebuiltSettingsActions, dispatch),
//   };
// }

// @connect(mapStateToProps, mapDispatchToProps)
export class LayoutPredictPage extends React.Component<Partial<ILayoutPredictPageProps>, ILayoutPredictPageState> {
  private layoutHelper: ILayoutHelper = new LayoutHelper();
  private tableHelper: ITableHelper = new TableHelper(this);

  state: ILayoutPredictPageState = {
    imageUri: null,
    imageWidth: 0,
    imageHeight: 0,
    currentPage: 1,
    numPages: 1,

    shouldShowAlert: false,
    alertTitle: '',
    alertMessage: '',

    fileLabel: '',

    isAnalyzing: false,
    analyzationLoaded: false,
    fetchedFileURL: '',
    layoutData: null,
    imageAngle: 0,

    layers: { text: true, tables: true, checkboxes: true, label: true, drawnRegions: true },

    tableIconTooltip: { display: 'none', width: 0, height: 0, top: 0, left: 0 },
    hoveringFeature: null,
    tableToView: null,
    tableToViewId: null,

    withPageRange: false,
    pageRange: ''
  };

  private imageMap: ImageMap;
  private fileHelper: ILoadFileHelper = new LoadFileHelper();

  componentDidMount() {
    document.title = strings.layoutPredict.title + ' - ' + strings.appName;
    this.props.appTitleActions.setTitle(strings.layoutPredict.title);
  }
  componentDidUpdate(_prevProps: ILayoutPredictPageProps, prevState: ILayoutPredictPageState) {
    if (this.state.file) {
      if (!this.state.fileLoaded && !this.state.isFetching) {
        this.loadFile(this.state.file);
      } else if (this.state.fileLoaded && prevState.currentPage !== this.state.currentPage) {
        this.fileHelper.loadPage(this.state.currentPage).then((res: any) => {
          if (res) {
            this.setState({ ...res });
          }
        });
      }
    }
  }

  private loadFile = (file: File) => {
    this.setState({ isFetching: true });
    this.fileHelper.loadFile(file).then((res: any) => {
      if (res) {
        this.setState({
          ...res,
          isFetching: false,
          fileLoaded: true
        });
      }
    });
  };

  getAnalyzeDisabled = () => {
    return (
      this.state.isFetching ||
      !this.state.file ||
      this.state.invalidFileFormat ||
      !this.state.fileLoaded ||
      this.state.isAnalyzing ||
      !this.props.prebuiltSettings?.apiKey ||
      !this.props.prebuiltSettings?.serviceURI ||
      (this.state.withPageRange && !this.state.pageRangeIsValid)
    );
  };

  render() {
    const analyzeDisabled: boolean = this.getAnalyzeDisabled();
    const menuProps: IContextualMenuProps = {
      className: 'keep-button-120px',
      items: [
        {
          key: 'JSON',
          text: 'JSON',
          onClick: () => this.onJsonDownloadClick()
        },
        {
          key: 'Table',
          text: 'Table',
          onClick: () => this.onCSVDownloadClick()
        }
      ]
    };
    console.log(this.state); // TEST
    return (
      <>
        <div className="predict skipToMainContent" id="pagePredict" style={{ display: 'flex' }}>
          <div className="predict-main">
            {this.state.file && this.state.imageUri && this.renderImageMap()}
            {this.renderPrevPageButton()}
            {this.renderNextPageButton()}
            {this.renderPageIndicator()}
          </div>
          <div className="predict-sidebar bg-lighter-1">
            <div className="condensed-list">
              <h6 className="condensed-list-header bg-darker-2 p-2 flex-center" style={{ marginBottom: '1rem' }}>
                <FontIcon className="mr-1" iconName="KeyPhraseExtraction" />
                <span>{strings.layoutPredict.layout}</span>
              </h6>
              {/* <PrebuiltSetting prebuiltSettings={this.props.prebuiltSettings}
                                disabled={this.state.isFetching || this.state.isAnalyzing}
                                actions={this.props.actions}
                            /> */}
              <div className="p-3">
                <h5>{strings.layoutPredict.selectFileAndRunLayout}</h5>
                <DocumentFilePicker
                  disabled={this.state.isFetching || this.state.isAnalyzing}
                  onFileChange={data => this.onFileChange(data)}
                  onSelectSourceChange={() => this.onSelectSourceChange()}
                  onError={err => this.onFileLoadError(err)}
                />
                <div className="page-range-section">
                  <PageRange
                    disabled={this.state.isFetching || this.state.isAnalyzing}
                    withPageRange={this.state.withPageRange}
                    pageRange={this.state.pageRange}
                    onPageRangeChange={this.onPageRangeChange}
                  />
                </div>
              </div>
              <Separator className="separator-right-pane-main">{strings.layoutPredict.analysis}</Separator>
              <div className="p-3" style={{ marginTop: '8px' }}>
                <div className="container-items-end predict-button">
                  <PrimaryButton
                    theme={getPrimaryWhiteTheme()}
                    iconProps={{ iconName: 'KeyPhraseExtraction' }}
                    text={strings.layoutPredict.runLayout}
                    aria-label={!this.state.analyzationLoaded ? strings.layoutPredict.inProgress : ''}
                    allowDisabledFocus
                    disabled={analyzeDisabled}
                    onClick={this.handleClick}
                  />
                </div>
                {this.state.isFetching && (
                  <div className="loading-container">
                    <Spinner label="Fetching..." ariaLive="assertive" labelPosition="right" size={SpinnerSize.large} />
                  </div>
                )}
                {this.state.isAnalyzing && (
                  <div className="loading-container">
                    <Spinner label={strings.layoutPredict.inProgress} ariaLive="assertive" labelPosition="right" size={SpinnerSize.large} />
                  </div>
                )}
                {this.state.layoutData && !this.state.isAnalyzing && (
                  <div className="container-items-center container-space-between results-container">
                    <h5 className="results-header">{strings.layoutPredict.layoutResults}</h5>
                    <PrimaryButton
                      className="align-self-end keep-button-120px"
                      theme={getPrimaryGreenTheme()}
                      text={strings.layoutPredict.download}
                      allowDisabledFocus
                      autoFocus={true}
                      onClick={this.onJsonDownloadClick}
                      menuProps={menuProps}
                      menuAs={this.getMenu}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Alert
            show={this.state.shouldShowAlert}
            title={this.state.alertTitle}
            message={this.state.alertMessage}
            onClose={() =>
              this.setState({
                shouldShowAlert: false,
                alertTitle: '',
                alertMessage: '',
                analyzationLoaded: true
              })
            }
          />
          {/* <PreventLeaving
                        when={this.state.isAnalyzing}
                        message={"A prediction operation is currently in progress, are you sure you want to leave?"}
                    /> */}
        </div>
      </>
    );
  }

  onPageRangeChange = (withPageRange: boolean, pageRange: string, pageRangeIsValid: boolean) => {
    this.setState({ withPageRange, pageRange, pageRangeIsValid });
  };

  onJsonDownloadClick = () => {
    const { layoutData } = this.state;
    if (layoutData) {
      downloadFile(JSON.stringify(layoutData), this.state.fileLabel + '.json', 'Layout-');
    }
  };
  onCSVDownloadClick = () => {
    const { layoutData } = this.state;
    if (layoutData) {
      const analyzeResult = layoutData.analyzeResult;
      const ocrPageResults = analyzeResult['pageResults'];
      const data: zipData[] = [];
      for (let i = 0; i < ocrPageResults.length; i++) {
        const currentPageResult = ocrPageResults[i];
        if (currentPageResult?.tables) {
          currentPageResult.tables.forEach((table, index) => {
            if (table.cells && table.columns && table.rows) {
              let tableContent = '';
              let rowIndex = 0;
              table.cells.forEach(cell => {
                if (cell.rowIndex === rowIndex) {
                  tableContent += `"${cell.text}"${cell.columnSpan ? _.repeat(',', cell.columnSpan) : ','}`;
                } else {
                  tableContent += '\n';
                  tableContent += `"${cell.text}"${cell.columnSpan ? _.repeat(',', cell.columnSpan) : ','}`;
                  rowIndex = cell.rowIndex;
                }
              });
              if (tableContent.length > 0) {
                data.push({
                  fileName: `Layout-page-${i + 1}-table-${index + 1}.csv`,
                  data: tableContent
                });
              }
            }
          });
        }
      }
      if (data.length > 0) {
        downloadZipFile(data, this.state.fileLabel + 'tables');
      }
    }
  };

  onFileChange(data: { file: File; fileLabel: string; fetchedFileURL: string }): void {
    this.setState(
      {
        currentPage: 1,
        layoutData: null,
        ...data,
        analyzationLoaded: false,
        fileLoaded: false
      },
      () => {
        this.layoutHelper?.reset();
      }
    );
  }

  onSelectSourceChange(): void {
    this.setState(
      {
        file: undefined,
        layoutData: null,
        analyzationLoaded: false
      },
      () => {
        this.layoutHelper.reset();
      }
    );
  }

  onFileLoadError(err: { alertTitle: string; alertMessage: string }): void {
    this.setState({
      ...err,
      shouldShowAlert: true,
      analyzationLoaded: false
    });
  }

  private renderImageMap = () => {
    const hostStyles: Partial<ITooltipHostStyles> = {
      root: {
        position: 'absolute',
        top: this.state.tableIconTooltip.top,
        left: this.state.tableIconTooltip.left,
        width: this.state.tableIconTooltip.width,
        height: this.state.tableIconTooltip.height,
        display: this.state.tableIconTooltip.display
      }
    };

    console.log(this.handleTableIconFeatureSelect);

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <CanvasCommandBar
          handleZoomIn={this.handleCanvasZoomIn}
          handleZoomOut={this.handleCanvasZoomOut}
          handleRotateImage={this.handleRotateCanvas}
          handleLayerChange={this.handleLayerChange}
          showLayerMenu={true}
          layers={this.state.layers}
        />
        <ImageMap
          ref={ref => {
            this.imageMap = ref;
            this.layoutHelper.setImageMap(ref);
            this.tableHelper.setImageMap(ref);
          }}
          imageUri={this.state.imageUri || ''}
          imageWidth={this.state.imageWidth}
          imageHeight={this.state.imageHeight}
          imageAngle={this.state.imageAngle}
          initLayoutMap={true}
          hoveringFeature={this.state.hoveringFeature}
          onMapReady={this.noOp}
          featureStyler={this.featureStyler}
          tableBorderFeatureStyler={this.tableHelper.tableBorderFeatureStyler}
          tableIconFeatureStyler={this.tableHelper.tableIconFeatureStyler}
          tableIconBorderFeatureStyler={this.tableHelper.tableIconBorderFeatureStyler}
          handleTableToolTipChange={this.tableHelper.handleTableToolTipChange}
        />
        <TooltipHost
          content={'rows: ' + this.state.tableIconTooltip.rows + ' columns: ' + this.state.tableIconTooltip.columns}
          // content={
          //   <>
          //     <div aria-describedby="tableInfo" className="tooltip-container" onClick={this.handleTableIconFeatureSelect} />
          //   </>
          // }
          id="tableInfo"
          styles={hostStyles}
        >
          <div aria-describedby="tableInfo" className="tooltip-container" onClick={this.handleTableIconFeatureSelect} />
        </TooltipHost>
        {this.state.tableToView !== null && (
          // BUG: Fix TableView click event
          <TableView handleTableViewClose={this.handleTableViewClose} tableToView={this.state.tableToView} />
        )}
      </div>
    );
  };

  private handleCanvasZoomIn = () => {
    this.imageMap.zoomIn();
  };

  private handleCanvasZoomOut = () => {
    this.imageMap.zoomOut();
  };

  private handleRotateCanvas = (degrees: number) => {
    this.setState({ imageAngle: this.state.imageAngle + degrees });
  };

  private handleLayerChange = (layer: string) => {
    switch (layer) {
      case 'text':
        this.imageMap.toggleTextFeatureVisibility();
        break;
      case 'tables':
        this.imageMap.toggleTableFeatureVisibility();
        break;
      case 'checkboxes':
        this.imageMap.toggleCheckboxFeatureVisibility();
        break;
      case 'label':
        this.imageMap.toggleLabelFeatureVisibility();
        break;
      case 'drawnRegions':
        this.imageMap.toggleDrawnRegionsFeatureVisibility();
        break;
    }
    const newLayers = Object.assign({}, this.state.layers);
    newLayers[layer] = !newLayers[layer];
    this.setState({
      layers: newLayers
    });
  };

  private handleTableIconFeatureSelect = () => {
    if (this.state.hoveringFeature != null) {
      const tableState = this.imageMap.getTableBorderFeatureByID(this.state.hoveringFeature).get('state');
      if (tableState === 'hovering' || tableState === 'rest') {
        this.tableHelper.setTableToView(
          this.tableHelper.getTable(this.state.currentPage, this.state.hoveringFeature),
          this.state.hoveringFeature
        );
      } else {
        this.closeTableView('hovering');
      }
    }
  };

  private handleTableViewClose = () => {
    this.closeTableView('rest');
  };

  private closeTableView = (state: string) => {
    if (this.state.tableToView) {
      this.tableHelper.setTableState(this.state.tableToViewId, state);
      this.setState({
        tableToView: null,
        tableToViewId: null
      });
    }
  };

  private noOp = () => {
    // no operation
  };

  private featureStyler = feature => {
    // Unselected
    return new Style({
      stroke: new Stroke({
        color: '#fffc7f',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255, 252, 127, 0.2)'
      })
    });
  };

  private renderPrevPageButton = () => {
    const prevPage = () => {
      this.goToPage(Math.max(1, this.state.currentPage - 1));
    };

    return this.state.currentPage > 1 ? (
      <IconButton className="toolbar-btn prev" title="Previous" iconProps={{ iconName: 'ChevronLeft' }} onClick={prevPage} />
    ) : (
      <div></div>
    );
  };

  private renderNextPageButton = () => {
    const { numPages } = this.state;
    const nextPage = () => {
      this.goToPage(Math.min(this.state.currentPage + 1, numPages));
    };

    return this.state.currentPage < numPages ? (
      <IconButton className="toolbar-btn next" title="Next" onClick={nextPage} iconProps={{ iconName: 'ChevronRight' }} />
    ) : (
      <div></div>
    );
  };

  private renderPageIndicator = () => {
    const { numPages } = this.state;
    return numPages > 1 ? (
      <p className="page-number">
        Page {this.state.currentPage} of {numPages}
      </p>
    ) : (
      <div></div>
    );
  };

  private goToPage = async (targetPage: number) => {
    if (targetPage <= 0 || targetPage > this.state.numPages) {
      return;
    }
    this.setState(
      {
        currentPage: targetPage
      },
      () => {
        this.layoutHelper.drawLayout(targetPage);
        this.tableHelper.drawTables(targetPage);
      }
    );
  };

  private handleClick = () => {
    this.setState({ analyzationLoaded: false, isAnalyzing: true });
    this.getAnalzation()
      .then(result => {
        this.tableHelper.setAnalyzeResult(result?.analyzeResult);
        this.setState(
          {
            isAnalyzing: false,
            analyzationLoaded: true,
            layoutData: result
          },
          () => {
            this.layoutHelper.setLayoutData(result);
            this.layoutHelper.drawLayout(this.state.currentPage);
            this.tableHelper.drawTables(this.state.currentPage);
          }
        );
      })
      .catch(error => {
        let alertMessage = '';
        if (error?.errorCode === ErrorCode.PredictWithoutTrainForbidden) {
          alertMessage = strings.errors.predictWithoutTrainForbidden.message;
        } else if (error?.errorCode === ErrorCode.ModelNotFound) {
          alertMessage = error.message;
        } else if (error?.errorCode === ErrorCode.HttpStatusUnauthorized) {
          alertMessage = error.message;
        } else if (error?.message) {
          alertMessage = error.message;
        } else if (error?.response) {
          alertMessage = error.response.data;
        } else {
          alertMessage = interpolate(strings.errors.endpointConnectionError.message, { endpoint: 'form recognizer backend URL' });
        }
        this.setState({
          shouldShowAlert: true,
          alertTitle: 'Analyze Failed',
          alertMessage,
          isAnalyzing: false
        });
      });
  };

  private async getAnalzation(): Promise<any> {
    let endpointURL = url.resolve(
      this.props.prebuiltSettings.serviceURI,
      `/formrecognizer/${constants.prebuiltServiceVersion}/layout/analyze`
    );
    if (this.state.withPageRange && this.state.pageRangeIsValid) {
      endpointURL += `?${constants.pages}=${this.state.pageRange}`;
    }
    const apiKey = this.props.prebuiltSettings.apiKey;

    const headers = {
      'Content-Type': this.state.file ? this.state.file.type : 'application/json',
      'cache-control': 'no-cache'
    };
    const body = this.state.file ?? { source: this.state.fetchedFileURL };

    // let response;
    try {
      const response = await ServiceHelper.postWithAutoRetry(endpointURL, body, { headers }, apiKey as string);
      const operationLocation = response.headers['operation-location'];

      // Make the second REST API call and get the response.
      return poll(
        () => ServiceHelper.getWithAutoRetry(operationLocation, { headers }, apiKey as string),
        constants.analyzeRequestTimeout,
        constants.analyzeRequestInterval
      );
    } catch (err) {
      ServiceHelper.handleServiceError({ ...err, endpoint: endpointURL });
    }
  }

  private getMenu(props: IContextualMenuProps): JSX.Element {
    return <ContextualMenu {...props} />;
  }
}
