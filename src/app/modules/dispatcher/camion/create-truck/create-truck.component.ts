import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../../citerne/models/citerne.model';
import {CiterneService} from '../../citerne/services';
import {CamionService} from '../services/camion-service.service';
import {ChauffeurService} from '../../chauffeur/services/chauffeur-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.scss']
})
export class CreateTruckComponent implements OnInit {
  chauffeurArray = [];
  camionForm!: FormGroup;
  citerneArray = Array<CiterneModel>();
  years = Array<number>();
  isHidden = true;
  hiddenButton = true;
  submitted2 = false;
  submitted: any;

  constructor(private formBuilder: FormBuilder,
              private  camionService: CamionService,
              private  chauffeurService: ChauffeurService,
              private router: Router) {
  }

  ngOnInit() {
    this.camionForm = this.formBuilder.group({
      assetId: ['', Validators.required],
      marque: ['', Validators.required],
      model: ['', Validators.required],
      matricule: ['', Validators.required],
      couleur: ['', Validators.required],
      fabric: ['', Validators.required],
      poids: ['', Validators.required],
      puissance: ['', Validators.required],
      entretien: ['', Validators.required],
      chauffeur: ['', Validators.required],
      dispo: ['', Validators.required],
      isReady: ['', Validators.required],
      description: ['', Validators.required],
      manufacture: ['', Validators.required],
      serialNumber: ['', Validators.required],
      isUsDot: ['', Validators.required],
      nbreCompartiment: ['', Validators.required],
    });

    this.generateYears();
    this.listChauffeur();

  }

  onSubmit() {
    const data = {
      marque: this.camionForm.get('marque')?.value,
      modele: this.camionForm.get('model')?.value,
      matricule: this.camionForm.get('matricule')?.value,
      couleur: this.camionForm.get('couleur')?.value,
      anneFabrication: this.camionForm.get('fabric')?.value,
      poids: this.camionForm.get('poids')?.value,
      puissance: this.camionForm.get('puissance')?.value,
      dateEntretien: this.camionForm.get('entretien')?.value,
      disponible: this.camionForm.get('dispo')?.value,
      pret: this.camionForm.get('isReady')?.value,
      chauffeur: {id: this.camionForm.get('chauffeur')?.value} ,
      assetId: this.camionForm.get('assetId')?.value,
      description: this.camionForm.get('description')?.value,
      manufacture: this.camionForm.get('manufacture')?.value,
      serialNumber: this.camionForm.get('serialNumber')?.value,
      isUsDot: this.camionForm.get('isUsDot')?.value,
      nbreCompartiment: null,
    };

    this.camionService.createCamion(data).subscribe(res => res);
    this.submitted2 = true;
  }

  listChauffeur(){
    this.chauffeurService.getChauffeurList().subscribe(res => {
      this.chauffeurArray = res;
      console.log(this.chauffeurArray);
    });
  }
  generateYears(){
    const currentYears = new Date().getFullYear();
    console.log(currentYears);

    for (let index = 1950; index <= currentYears; index++) {
      this.years.push(index);
    }
  }
  displayList(){
    this.router.navigate(['dispatcher/truck/list']);
  }
}
