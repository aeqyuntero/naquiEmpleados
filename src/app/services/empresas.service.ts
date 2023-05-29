import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  private url: string = 'https://naqui-app-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) {}
}
