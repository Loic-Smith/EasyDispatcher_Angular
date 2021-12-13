import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../produit/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ChauffeurService} from '../services/chauffeur-service.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss']
})
export class CreateDriverComponent implements OnInit {
  statuts = [
    {
      id: 1,
      statut: 'SALARIE'
    },
    {
      id: 2,
      statut: 'BROKERS'
    },
    {
      id: 3,
      statut: 'CHAUFFEUR'
    },
    {
      id: 4,
      statut: 'CHAUFFEUR INC'
    },
    {
      id: 5,
      statut: 'INCORPORE'
    },
    {
      id: 6,
      statut: 'INCORPORE INC'
    },
    {
      id: 7,
      statut: 'PROPRIETAIRE'
    },

    {
      id: 8,
      statut: 'VOITURIER'
    },
  ];

  driverForm!: FormGroup;
  submitted = false;
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private chauffeurService: ChauffeurService,
      private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.driverForm = this.formBuilder.group({
      nomChauffeur: ['', Validators.required],
      prenomChauffeur: ['', Validators.required],
      date_embauche: ['', Validators.required],
      date_depart: ['', Validators.required],
    });
  }

  onSubmit(){
    const data = {
      nomChauffeur: this.driverForm.get('nom')?.value,
      prenomChauffeur: this.driverForm.get('prenom')?.value,
      date_embauche: this.driverForm.get('date_embauche')?.value,
      date_depart: this.driverForm.get('date_depart')?.value,
    };
    this.chauffeurService.createChauffeur(data).subscribe(res => {
      console.log(res);
    });
    this.submitted = true;
  }
 displayDriverList(){
    this.router.navigate(['dispatcher/driver/list']);
 }
}
