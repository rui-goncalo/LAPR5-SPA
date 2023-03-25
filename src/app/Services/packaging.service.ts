import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPackaging} from "../Models/ipackaging.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackagingService {
  packagingURL = 'https://lei-nodejs-016.onrender.com/api/packaging';
  truckURL = 'https://lei-nodejs-016.onrender.com/api/trucks';
  // packagingURL = 'http://localhost:3000/api/packaging';
  // truckURL = 'http://localhost:3000/api/trucks';

  constructor(private http: HttpClient) { }

  addPackaging(packaging: IPackaging) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<IPackaging>(this.packagingURL, packaging, { headers });
  }

  getAllPackagings() {
    return this.http.get<IPackaging[]>(this.packagingURL);
  }

  editPackaging(packaging: IPackaging) {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<IPackaging>(this.packagingURL, packaging, { headers });
  }

  getAllTrucks(): Observable<any[]> {
    return this.http.get<any>(this.truckURL);
  }
}
