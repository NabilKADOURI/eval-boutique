import { Injectable } from '@angular/core';
import { fruitInterface } from '../entitie';
import { fruitsMock } from '../fruitsMock';

@Injectable({
  providedIn: 'root'
})
export class FruitService {

  constructor() { }

  fetchAllFruits() {
    return fruitsMock;
  }
}
