import { EventEmitter } from '@angular/core';

export class TableAction {
  name: string;
  icon: string;
  onClick: EventEmitter<any>;
}
