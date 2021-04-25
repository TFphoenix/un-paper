import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'merlin-confirmation-dialog-delete',
  templateUrl: './confirmation-dialog-delete.component.html',
  styleUrls: ['./confirmation-dialog-delete.component.scss']
})
export class ConfirmationDialogDeleteComponent implements OnInit {
  entry: any;
  form: FormGroup;
  deleteInput: FormControl;
  deleteText: String = 'delete'.toUpperCase();

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.entry = data;
  }

  ngOnInit() {
    this.form = this.fb.group({
      deleteInput: ['', this.validateDelete(this.deleteText)]
    });
  }

  validateDelete(text: String): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== text) {
        return { validDelete: true };
      }
      return null;
    };
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
