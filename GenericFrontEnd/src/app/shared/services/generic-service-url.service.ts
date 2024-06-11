import { Injectable } from '@angular/core';
import { enviroments } from '../../../environments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon';
import { GenericResponse } from '../interfaces/response/generic-response';

@Injectable({
  providedIn: 'root'
})
export class GenericServiceUrlService {

  
  //Import Enviroments and get baseURL
  private baseURL: string = enviroments.baseUrl;

  //Vamos a hhardcodear el base url 
  baseUrl ='https://pokeapi.co/api/v2/';
  
  //Use HttpClient to call apis
  constructor(private http: HttpClient) { }


  //Get Example

  getPokemon(
    pokemonName: string 
  ): Observable<Pokemon>{

    return this.http
        .get<Pokemon>(`${this.baseUrl}/pokemon/ditto`)

  }

  insertPokemon(
    pokemon: Pokemon
  
    ):Observable<GenericResponse>{
      const body = {
        pokemon
      };
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token??'' }`);         
  
      return this.http
        .post<GenericResponse>(`${this.baseUrl}/pokemon/ditto`,body, { headers})
        
  
    }

}
