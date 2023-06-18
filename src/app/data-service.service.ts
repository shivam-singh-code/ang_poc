import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataKey = 'app_data';

  constructor() {}

  saveData(data: any): void {
    const storedData = this.getData();
    storedData.push(data);
    localStorage.setItem(this.dataKey, JSON.stringify(storedData));
  }

  getData(): any[] {
    const storedData = localStorage.getItem(this.dataKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  updateData(index: number, newData: any): void {
    console.log('passed new data', newData);
    console.log(index, 'index in service');
    const storedData = this.getData();
    console.log(storedData, 'stored in service');
    if (index >= 0 && index < storedData.length) {
      console.log(storedData[index], 'index of stord');
      storedData[index] = newData;
      localStorage.setItem(this.dataKey, JSON.stringify(storedData));
    }
  }

  deleteData(index: number): void {
    const storedData = this.getData();
    if (index >= 0 && index < storedData.length) {
      storedData.splice(index, 1);
      localStorage.setItem(this.dataKey, JSON.stringify(storedData));
    }
  }
}
