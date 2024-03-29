import { Dropdown, IDropdownOption, PrimaryButton, TextField } from '@fluentui/react';
import * as React from 'react';
import { getGreenWithWhiteBackgroundTheme, getPrimaryGreenTheme } from 'src/@fott/common/themes';

import './documentFilePicker.scss';

interface IDocumentFilePickerProps {
  disabled: boolean;
  onFileChange?: (data: { file: File; fileLabel: string; fetchedFileURL: string }) => void;
  onError?: (err: { alertTitle: string; alertMessage: string }) => void;
  onSelectSourceChange?: () => void;
}

interface IDocumentFilePickerState {
  sourceOption: string;
  invalidFileFormat: boolean;
  inputedLocalFile: string;
  inputedFileURL: string;
  isFetching: boolean;
}

export class DocumentFilePicker extends React.Component<IDocumentFilePickerProps, IDocumentFilePickerState> {
  state = {
    sourceOption: 'localFile',
    invalidFileFormat: false,
    isFetching: false,
    inputedFileURL: '',
    inputedLocalFile: 'Browse for a file...'
  };

  private fileInput: React.RefObject<HTMLInputElement> = React.createRef();

  render() {
    const sourceOptions: IDropdownOption[] = [
      { key: 'localFile', text: 'Local file' },
      { key: 'url', text: 'URL' }
    ];

    let { disabled } = this.props;
    disabled = !!disabled;
    const urlInputDisabled = disabled || this.state.isFetching;
    const fetchDisabled: boolean =
      disabled || this.state.isFetching || this.state.inputedFileURL.length === 0 || this.state.inputedFileURL === 'Paste or type URL...';

    return (
      <>
        <div className="document-file-picker">
          <div className="title mr-2">Source:</div>
          <div className="container-space-between">
            <Dropdown
              className="sourceDropdown"
              selectedKey={this.state.sourceOption}
              options={sourceOptions}
              disabled={disabled}
              onChange={this.onSelectSourceChange}
            />
            {this.state.sourceOption === 'localFile' && (
              <>
                <input
                  aria-hidden="true"
                  type="file"
                  accept="application/pdf, image/jpeg, image/png, image/tiff"
                  id="hiddenInputFile"
                  ref={this.fileInput}
                  onChange={this.handleFileChange}
                  disabled={disabled}
                />
                <TextField
                  className="ml-2 local-file"
                  theme={getGreenWithWhiteBackgroundTheme()}
                  style={{
                    cursor: disabled ? 'default' : 'pointer'
                  }}
                  onClick={this.handleDummyInputClick}
                  readOnly={true}
                  aria-label="Choose an image to analyze with"
                  value={this.state.inputedLocalFile}
                  placeholder="Choose an image to analyze with"
                  disabled={disabled}
                />
              </>
            )}
            {this.state.sourceOption === 'url' && (
              <>
                <TextField
                  className="mr-2 ml-2"
                  theme={getGreenWithWhiteBackgroundTheme()}
                  onFocus={this.removeDefaultInputedFileURL}
                  onChange={this.setInputedFileURL}
                  aria-label="Choose an image to analyze with"
                  value={this.state.inputedFileURL}
                  disabled={urlInputDisabled}
                  placeholder="Paste or type URL..."
                />
                <PrimaryButton
                  theme={getPrimaryGreenTheme()}
                  className="keep-button-80px"
                  text="Fetch"
                  allowDisabledFocus
                  disabled={fetchDisabled}
                  autoFocus={true}
                  onClick={this.getFileFromURL}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  private onSelectSourceChange = (event, option) => {
    if (option.key !== this.state.sourceOption) {
      this.setState(
        {
          sourceOption: option.key,
          inputedFileURL: ''
        },
        () => {
          if (this.props.onSelectSourceChange) {
            this.props.onSelectSourceChange();
          }
        }
      );
    }
  };

  private handleFileChange = () => {
    if (this.fileInput.current.value !== '') {
      this.setState({ invalidFileFormat: false });
      const fileName = this.fileInput.current.value.split('\\').pop();
      if (fileName !== '') {
        this.setState(
          {
            inputedLocalFile: fileName
          },
          () => {
            if (this.props.onFileChange) {
              this.props.onFileChange({
                file: this.fileInput.current.files[0],
                fileLabel: fileName,
                fetchedFileURL: ''
              });
            }
          }
        );
      }
    }
  };
  private handleDummyInputClick = () => {
    document.getElementById('hiddenInputFile').click();
  };

  private removeDefaultInputedFileURL = () => {
    if (this.state.inputedFileURL === 'Paste or type URL...') {
      this.setState({ inputedFileURL: '' });
    }
  };

  private setInputedFileURL = event => {
    this.setState({ inputedFileURL: event.target.value });
    if (this.props.onFileChange) {
      this.props.onFileChange({
        file: null,
        fileLabel: '',
        fetchedFileURL: event.target.value
      });
    }
  };

  private getFileFromURL = () => {
    this.setState({ isFetching: true });
    fetch(this.state.inputedFileURL, {
      headers: {
        Accept: 'application/pdf, image/jpeg, image/png, image/tiff'
      }
    })
      .then(async response => {
        if (!response.ok) {
          this.setState({
            isFetching: false
          });
          if (this.props.onError) {
            this.props.onError({
              alertTitle: 'Failed to fetch',
              alertMessage: response.status.toString() + ' ' + response.statusText
            });
          }
          return;
        }
        const contentType = response.headers.get('Content-Type');
        if (!['application/pdf', 'image/jpeg', 'image/png', 'image/tiff'].includes(contentType)) {
          this.setState({
            isFetching: false
          });
          if (this.props.onError) {
            this.props.onError({
              alertTitle: 'Content-Type not supported',
              alertMessage: 'Content-Type ' + contentType + ' not supported'
            });
          }
          return;
        }
        response
          .blob()
          .then(blob => {
            const fileAsURL = new URL(this.state.inputedFileURL);
            const fileName = fileAsURL.pathname.split('/').pop();
            const file = new File([blob], fileName, {
              type: contentType
            });
            this.setState(
              {
                isFetching: false
              },
              () => {
                if (this.props.onFileChange) {
                  this.props.onFileChange({
                    file,
                    fileLabel: fileName,
                    fetchedFileURL: ''
                  });
                }
              }
            );
          })
          .catch(error => {
            this.setState({
              isFetching: false
            });
            if (this.props.onError) {
              this.props.onError({
                alertTitle: 'Invalid data',
                alertMessage: error
              });
            }
            return;
          });
      })
      .catch(() => {
        this.setState({
          isFetching: false
        });
        if (this.props.onError) {
          this.props.onError({
            alertTitle: 'Fetch failed',
            alertMessage: 'Can’t access the document URL. Please try downloading the file from URL, and use it as local file.'
          });
        }
        return;
      });
  };
}
