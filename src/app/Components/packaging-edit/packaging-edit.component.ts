import {Component, OnInit, ViewChild} from '@angular/core';
import {PackagingService} from "../../Services/packaging.service";
import {NgForm} from "@angular/forms";
import {IDelivery} from "../../Models/idelivery.model";
import {IPackaging} from "../../Models/ipackaging.model";
import { ITruck } from 'src/app/Models/itruck.model';
import { TruckService } from 'src/app/Services/truck.service';

@Component({
  selector: 'app-packaging-edit',
  templateUrl: './packaging-edit.component.html',
  styleUrls: ['./packaging-edit.component.css']
})
export class PackagingEditComponent implements OnInit {
  public successMessage = '';
  public errorMessage = '';
  public packagingEdit: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  packagings: IPackaging[] = [];
  @ViewChild('packagingForm') form: NgForm | undefined;
  editMode: boolean = false;
  // @ts-ignore
  currentPackagingId: string;
  public truckTemp : any;
  trucksList: ITruck[] = [];
  truck: any;

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

  editPackaging(form: NgForm) {
    this.packagingService.editPackaging({
      packagingId: this.currentPackagingId,
      packagingX: form.value.packagingX,
      packagingY: form.value.packagingY,
      packagingZ: form.value.packagingZ,
      packagingTruck: form.value.packagingTruck
    }).subscribe((data: any) => {
      this.packagingEdit = true
      this.successMessage = "Packaging edited successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.packagingEdit = false;
      this.errorMessage = "Packaging not found.";
    })
  }

  getRegistrationByTruckId(truckId: string) {
    for (let i=0; i < this.trucksList.length; i++) {
      if(truckId === this.trucksList[i].truckId) {
        this.truck = this.trucksList[i].registration;
      }
    }
    return this.truck;
  }

  onEditClicked(packagingId: string) {
    this.currentPackagingId = packagingId;

    //get the delivery ID
    let currentPackaging = this.packagings?.find((packaging) => {
      return packaging.packagingId === packagingId
    })
    //console.log(currentPackaging);

    //populate the form with the delivery details
    this.form?.setValue({
      // @ts-ignore
      packagingX: currentPackaging.packagingX,
      // @ts-ignore
      packagingY: currentPackaging.packagingY,
      // @ts-ignore
      packagingZ: currentPackaging.packagingZ,
      // @ts-ignore
      packagingTruck: currentPackaging.packagingTruck
    });

    //Button value to be able to click
    this.editMode = true;
  }

  refresh(): void {
    window.location.reload();
  }

}
