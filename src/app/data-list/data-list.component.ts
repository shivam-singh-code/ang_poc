import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDataFormComponent } from '../add-data-form/add-data-form.component';
import { DataService } from '../data-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
})
export class DataListComponent {
  public dataList: any[] = []; // Modify the type based on your data structure
  isDialogOpen = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = [
    'name',
    'age',
    'gender',
    'email',
    'contactNumber',
    'address1',
    'address2',
    'country',
    'state',
    'city',
    'pincode',
    'actions',
  ];

  constructor(private dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    // Add code to retrieve data from local storage and assign it to the dataList variable
    const dataList = this.dataService.getData();
    this.dataSource = new MatTableDataSource(dataList);
  }

  addNew(): void {
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(AddDataFormComponent, {
      width: 'auto',
      height: '700px',
      data: {
        mode: 'add',
      },
      // position: {
      //   top: '5%',
      //   left: '10%',
      //   // transform: 'translate(-50%, -50%)',
      // },
    });

    dialogRef.afterClosed().subscribe(() => {
      const dataList = this.dataService.getData();
      this.dataSource = new MatTableDataSource(dataList);
      this.isDialogOpen = false;
    });
  }

  editData(data: any): void {
    console.log(data);
    this.isDialogOpen = true;
    const index = this.dataSource.data.indexOf(data);
    if (index > -1) {
      const dialogRef = this.dialog.open(AddDataFormComponent, {
        width: 'auto',
        height: '700px',
        data: {
          mode: 'edit',
          index: index,
          data: data,
        },
        // position: {
        //   top: '5%',
        //   left: '10%',
        //   // transform: 'translate(-50%, -50%)',
        // },
      });

      dialogRef.afterClosed().subscribe(() => {
        const dataList = this.dataService.getData();
        this.dataSource = new MatTableDataSource(dataList);
        this.isDialogOpen = false;
      });
    }
  }

  deleteData(data: any): void {
    const index = this.dataSource.data.indexOf(data);
    if (index > -1) {
      this.dataService.deleteData(index);
      this.dataSource.data = this.dataService.getData();
    }
  }
}
