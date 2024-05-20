import { Injectable } from '@angular/core';
import { GenericTableConcretBuilder } from '../builder/generic-table-concret-builder';


@Injectable({
  providedIn: 'root'
})
export class TableBuilderFactoryService {

  constructor() { }
  createBuilder<T>(): GenericTableConcretBuilder<T> {
    return new GenericTableConcretBuilder<T>();
  }

}
