import { Component } from '@angular/core';
import {PackagingService} from "../../Services/packaging.service";
import {NgForm} from "@angular/forms";
import { ITruck } from 'src/app/Models/itruck.model';
import { TruckService } from 'src/app/Services/truck.service';

@Component({
  selector: 'app-packaging-create',
  templateUrl: './packaging-create.component.html',
  styleUrls: ['./packaging-create.component.css']
})
export class PackagingCreateComponent {
  public successMessage = '';
  public errorMessage = '';
  public packagingCreated: boolean | undefined;
  public arr: any;
  public lengthArr: any;
  truck: any;
  public truckTemp : any;
  trucksList: ITruck[] = [];

  constructor(private packagingService: PackagingService, private truckService: TruckService) { }

  ngOnInit(): void {
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
  }

  addPackaging(form: NgForm) {
    //increment packagingID
    let finalId;
    let finalId2;
    let aux = 0;
    let finalIdPackaging = '';

    this.arr = this.packagingService.getAllPackagings().subscribe((data: any) => {
      this.arr = data;
      this.lengthArr = this.arr.length;
      // finalId = this.arr.at(-1).packagingId;
      // finalId2 = (parseInt(finalId) + 1).toString();

      if (this.arr.length === 0) {
        finalId2 = 1;
      } else {
        for (let i=0; i<this.arr.length; i++) {
          if (parseInt(this.arr.at(i).packagingId) > aux) {
            aux = parseInt(this.arr.at(i).packagingId);
          }
        }
        finalId = aux;
        // @ts-ignore
        finalId2 = (parseInt(finalId) + 1).toString();
      }
      // finalIdPackaging = JSON.stringify(finalId2);

      this.packagingService.addPackaging({
        packagingId: finalId2.toString(),
        packagingX: form.value.packagingX,
        packagingY: form.value.packagingY,
        packagingZ: form.value.packagingZ,
        packagingTruck: this.truck
      }
      ).subscribe((data: any) => {
        this.packagingCreated = true
        this.successMessage = "Packaging created successfully!"
        this.refresh()
      }, (error: { message: string; }) => {
        this.packagingCreated = false;
        this.errorMessage = error.message;
      })
    });
  }

  ChooseTruck(e: any) {
    this.truck = e.target.value;
  }

  refresh(): void {
    window.location.reload();
  }
}
