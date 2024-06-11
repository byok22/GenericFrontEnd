import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/enviroments';
import { HttpClient } from '@angular/common/http';
import { TestInterface } from '../../shared/interfaces/testInterface.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

   //Import Enviroments and get baseURL
   private baseURL: string = enviroments.baseUrl;

   //Vamos a hhardcodear el base url 
   baseUrl ='https://pokeapi.co/api/v2/';
   
   //Use HttpClient to call apis
   constructor(private http: HttpClient) { }
 
 
   //Get Example
 
   getPruebas(): Observable<TestInterface[]> {
    const pruebas: TestInterface[] = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Alice', age: 25 },
      { id: 3, name: 'Bob', age: 35 }
    ];
    
    return of(pruebas);
  }
 
  
 
}
