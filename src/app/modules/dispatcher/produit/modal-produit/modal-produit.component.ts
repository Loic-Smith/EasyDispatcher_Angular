import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProduitModel} from '../models/produit.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../services';

@Component({
  selector: 'app-modal-produit',
  templateUrl: './modal-produit.component.html',
  styleUrls: ['./modal-produit.component.scss']
})
export class ModalProduitComponent implements OnInit {
  createProductForm!: FormGroup;
  submitted = false;
  produit = new ProduitModel();
  productArray = Array<ProduitModel>();

  constructor(public activeModal: NgbActiveModal, private produitService: ProductService) { }

  ngOnInit(): void {
    this.createProductForm = new FormGroup({
      designation: new FormControl(this.produit.designation),
      description: new FormControl(this.produit.description),
    });

    this.listProduct();
  }
  listProduct(){
    this.produitService.getProductList().subscribe(res =>{
      this.productArray = res;
      console.log(res);
    });
  }
  updateProduit(){
    var data = {
      designation: this.createProductForm.get('designation')?.value,
      description: this.createProductForm.get('description')?.value,
    };
    this.produitService.updateProduct(this.produit.id, data).subscribe(res => {
      this.listProduct();
    });
    this.submitted = true;
  }

}
