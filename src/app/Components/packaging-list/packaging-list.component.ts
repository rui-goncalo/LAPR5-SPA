import { Component, OnInit } from '@angular/core';
import {PackagingService} from "../../Services/packaging.service";
import { IPackaging } from 'src/app/Models/ipackaging.model';
import { ITruck } from 'src/app/Models/itruck.model';
import { TruckService } from 'src/app/Services/truck.service';

@Component({
  selector: 'app-packaging-list',
  templateUrl: './packaging-list.component.html',
  styleUrls: ['./packaging-list.component.css']
})
export class PackagingListComponent implements OnInit {
  packagings: IPackaging[] = [];
  trucksList: ITruck[] = [];
  public truckTemp : any;
  truck: any;
  pag: number = 1;
  itemsPerPage: number = 5;

  constructor(private packagingService: PackagingService, private truckService: TruckService) { }

  ngOnInit(): void {
    this.packagingService.getAllPackagings().subscribe((data: any) => {
      this.packagings = data
      for(let i = 0; i < this.packagings.length; i++){
        let tr = this.packagings[i].packagingTruck;
        this.truckTemp = this.truckService.getTruckById(tr).subscribe((data:any) => {
          this.truckTemp = data;
        
        if(this.truckTemp.isActive === 'false'){
          let index = this.packagings.findIndex(obj => obj.packagingTruck === tr);
          if(index != undefined)
          this.packagings?.splice(index, 1);
        }
      });
    }
    
    this.packagingService.getAllTrucks().subscribe((data: any) => {
      this.trucksList = data;
      for(let i = 0; i < this.trucksList.length; i++){
        let tr = this.trucksList[i].truckId;
        this.truckTemp = this.truckService.getTruckById(tr).subscribe((data:any) => {
          this.truckTemp = data;
        
          if(this.truckTemp.isActive === 'false'){
          let index = this.trucksList.findIndex(obj => obj.truckId === tr);
          if(index != undefined)
          this.trucksList?.splice(index, 1);
        }
      });
    }
    })
  });
  }

  getRegistrationByTruckId(truckId: string) {
    for (let i=0; i < this.trucksList.length; i++) {
      if(truckId === this.trucksList[i].truckId) {
        this.truck = this.trucksList[i].registration;
      }
    }
    return this.truck;
  }

  /*private async getAllPackagings() {
    const packagingList = await this.packagingService.getAllPackagings();
    this.packagings = packagingList;
  }*/

}
