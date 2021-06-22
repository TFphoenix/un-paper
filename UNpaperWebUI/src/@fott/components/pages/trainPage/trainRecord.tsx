// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import { FontIcon } from '@fluentui/react';

export interface ITrainRecordProps {
  accuracies?: object;
  averageAccuracy?: number;
  modelInfo: {
    isComposed?: boolean;
    modelId: string;
    createdDateTime: string;
    modelName: string;
  };
}

export interface ITrainRecordState {}

export default class TrainRecord extends React.Component<ITrainRecordProps, ITrainRecordState> {
  public render() {
    return (
      <aside className="mt-3">
        <h3 className="bold unp-primary">Model information</h3>
        <div>
          <h4 className="bold m-0">Model ID:</h4>
          <p className="unp-primary">{this.props.modelInfo.modelId}</p>
          {this.props.modelInfo.modelName && (
            <>
              <h4 className="bold m-0">Model Name:</h4>
              <p className="unp-primary">{this.props.modelInfo.modelName}</p>
            </>
          )}
          <h4 className="bold m-0">Created date and time:</h4>
          <p className="unp-primary">
            {new Date(this.props.modelInfo.createdDateTime).toLocaleString()}
          </p>
          <h4 className="bold m-0">Average accuracy:</h4>
          <p className="unp-primary">{(this.props.averageAccuracy * 100).toFixed(2) + '%'}</p>
          {/* REMEMBER */}
          {/* <div className="accuracy-info">
            <a
              href="https://aka.ms/form-recognizer/docs/train"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontIcon iconName="Info" />
              <span>Learn more about improving model accuracy.</span>
            </a>
          </div> */}
        </div>
      </aside>
    );
  }
}
