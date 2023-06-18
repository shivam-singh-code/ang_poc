import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-add-data-form',
  templateUrl: './add-data-form.component.html',
  styleUrls: ['./add-data-form.component.css'],
})
export class AddDataFormComponent implements OnInit {
  dataForm: FormGroup = new FormGroup({});

  // @Input() data: any; // Input property to receive the data for editing

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddDataFormComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data && this.data.mode === 'edit') {
      this.populateForm();
    } else {
      this.initializeForm();
    }
  }

  initializeForm(): void {
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  populateForm(): void {
    console.log(this.data.data, 'n p');
    this.dataForm.patchValue(this.data.data); // Populate the form with the received data
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveData(): void {
    // if (this.data.mode === 'add') {
    //   // Add new data
    //   this.dataService.saveData(this.dataForm.value);
    // } else if (this.data.mode === 'edit') {
    //   console.log("in editmode")
    //   // Edit existing data
    //   const updatedData = {
    //     ...this.data.data,
    //     ...this.dataForm.value,
    //   };
    //   this.dataService.updateData(updatedData);
    // }
    // this.dialogRef.close();
    if (this.data.mode === 'add') {
      // Add new data
      this.dataService.saveData(this.dataForm.value);
    } else if (this.data.mode === 'edit') {
      // const index = this.dataService.getData().indexOf(this.data.data);
      // Edit existing data
      const updatedData = {
        ...this.data.data,
        ...this.dataForm.value,
      };
      console.log(updatedData, 'updated data');
      this.dataService.updateData(this.data.index, updatedData); // Pass the index along with the updated data
    }
    this.dialogRef.close();
  }
}
