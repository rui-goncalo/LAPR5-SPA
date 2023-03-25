import {Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseService} from "../../Services/warehouse.service";
import {NgForm} from "@angular/forms";
import {IWarehouse} from "../../Models/iwarehouse.model";
import {AuthorizationService} from "../../Services/authorization.service";

@Component({
  selector: 'app-warehouse-edit',
  templateUrl: './warehouse-edit.component.html',
  styleUrls: ['./warehouse-edit.component.css']
})
export class WarehouseEditComponent implements OnInit {
  public successMessage = '';
  public errorMessage = '';
  public warehouseEdit: boolean | undefined;
  //private userId: any;
  //public user = {} as IUser;
  warehouses: IWarehouse[] | undefined = [];
  @ViewChild('warehouseForm') form: NgForm | undefined;
  editMode: boolean = false;
  // @ts-ignore
  currentWarehouseId: string;

  permissions: number[] = [1,4]

  constructor(private warehouseService: WarehouseService,
              private autService: AuthorizationService) { }

  ngOnInit(): void {
    const token = JSON.parse(sessionStorage.getItem("token")!);

    if (token) {
      if (!this.permissions.includes(token.role)){
        this.autService.redirect("/home")
      }
    }

    this.warehouseService.getAllWarehouses().subscribe(data => this.warehouses = data);
  }

  editWarehouse(form: NgForm) {
    this.warehouseService.editWarehouseById({
      warehouseId: this.currentWarehouseId,
      warehouseAddress: form.value.warehouseAddress,
      warehouseDesignation: form.value.warehouseDesignation,
      warehouseGeoCoord: form.value.warehouseGeoCoord
    }).subscribe((data: any) => {
      this.warehouseEdit = true
      this.successMessage = "Warehouse edited successfully!"
      this.refresh()
    }, (error: { message: string; }) => {
      this.warehouseEdit = false;
      this.errorMessage = "Warehouse not found.";
    })
  }

  onEditClicked(warehouseId: string) {
    this.currentWarehouseId = warehouseId;

    //get the delivery ID
    let currentWarehouse = this.warehouses?.find((warehouse) => {
      return warehouse.warehouseId === warehouseId
    })
    console.log(this.currentWarehouseId);

    //populate the form with the delivery details
    this.form?.setValue({
      // @ts-ignore
      warehouseAddress: currentWarehouse.warehouseAddress,
      // @ts-ignore
      warehouseDesignation: currentWarehouse.warehouseDesignation,
      // @ts-ignore
      warehouseGeoCoord: currentWarehouse.warehouseGeoCoord
    });

    //Button value to be able to click
    this.editMode = true;
  }

  refresh(): void {
    window.location.reload();
  }

}
