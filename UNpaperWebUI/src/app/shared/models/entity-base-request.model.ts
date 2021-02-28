export class EntityBaseRequest {
  id?: string;
  createdOn?: Date;
  createdBy?: string;
  updatedOn?: Date;
  updatedBy?: string;
  isDeleted?: boolean = false;
}
