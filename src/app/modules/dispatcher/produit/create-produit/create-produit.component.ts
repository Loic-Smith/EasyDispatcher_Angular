import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../services';

@Component({
  selector: 'app-create-produit',
  templateUrl: './create-produit.component.html',
  styleUrls: ['./create-produit.component.scss']
})
export class CreateProduitComponent implements OnInit {
  submitted = false;


  productForm!: FormGroup;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService,
      private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      designation: ['', Validators.required, Validators.minLength(4)],
      description: ['', Validators.required, Validators.minLength(4)],
    });
  }

  onSubmit(){
    const data = {
      designation: this.productForm.get('designation')?.value,
      description: this.productForm.get('description')?.value,
    };
    this.productService.createProduct(data).subscribe(res => {
      console.log(res);
    });
    this.submitted = true;
}

    displayProductList() {
        this.router.navigate(['/dispatcher/product/list']);
    }
}
