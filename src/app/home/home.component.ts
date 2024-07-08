import { Component, Inject, OnInit } from '@angular/core';
import { FruitService } from '../shared/service/fruit.service';
import { fruitInterface } from '../shared/entitie';
import { fruitsMock } from '../shared/fruitsMock';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  fruits: fruitInterface[] = fruitsMock;
 panier: fruitInterface[] = []
  
 

  ngOnInit(): void {
    this.getFruit();
    
  }

  getFruit(){

    this.fruits = fruitsMock;
  }



  plusFruit(fruits:fruitInterface):void {
    
   fruits.quantite ++
   }
 
   moinsFruit(fruits:fruitInterface):void {
     if(fruits.quantite <=0){
 
       fruits.quantite = 0;
     } else{
       fruits.quantite --;
     }
     
   }

   AjouterAuPanier(fruit:fruitInterface):void{

    const fruitDansPanier = this.panier.find(f => f.nom === fruit.nom);
    if(fruitDansPanier) {
      fruitDansPanier.quantite += fruit.quantite;
    }else{

      this.panier.push({...fruit});
    }
    fruit.quantite = 0;
   }

   retirerDuPanier(fruit: fruitInterface): void {
    this.panier = this.panier.filter(f => f.nom !== fruit.nom);
  }

  quantiteTotale(): number {
    return this.panier.reduce((total, fruit) => total + fruit.quantite, 0);
  }

  prixHT(): number {
    return this.panier.reduce((total, fruit) => total + (fruit.prixHT * fruit.quantite), 0);
  }

  calculerPrixTTC(prixHT: number): number {
    const tva = 0.2; 
    return prixHT * (1 + tva);
  }

  prixTTC(): number {
    return this.panier.reduce((total, fruit) => total + (this.calculerPrixTTC(fruit.prixHT) * fruit.quantite), 0);
  }

  viderPanier(): void {
    this.panier = [];
  }




 
  

}
