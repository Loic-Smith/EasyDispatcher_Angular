import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {CiterneService} from '../services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-tank',
  templateUrl: './create-tank.component.html',
  styleUrls: ['./create-tank.component.scss']
})
export class CreateTankComponent implements OnInit {
  citerneForm!: FormGroup;
  citerneArray = Array<CiterneModel>();
  years = Array<number>();
  isHidden = true;
  hiddenButton = true;
    submitted2 = false;
  submitted: any;

  constructor(private formBuilder: FormBuilder, private  citerneService: CiterneService, private router: Router) {
  }

  ngOnInit() {
this.citerneForm = this.formBuilder.group({
    assetId: ['', Validators.required],
    marque: ['', Validators.required],
    model: ['', Validators.required],
    matricule: ['', Validators.required],
    fabric: ['', Validators.required],
    poids: ['', Validators.required],
    puissance: ['', Validators.required],
    entretien: ['', Validators.required],
    dispo: ['', Validators.required],
    description: [''],
    manufacture: [''],
    serialNumber: ['', Validators.required],
    isAutoVireur: ['', Validators.required],
    isVaccum: ['', Validators.required],
    isCertificated: ['', Validators.required],
    isBackCharge: ['', Validators.required],
    nbreCompartiment: ['', Validators.required],
    capacitePied: ['', Validators.required],
  });
  }

onSubmit() {
    const data = {
      marque: this.citerneForm.get('marque')?.value,
      modele: this.citerneForm.get('model')?.value,
      matricule: this.citerneForm.get('matricule')?.value,
      anneFabrication: this.citerneForm.get('fabric')?.value,
      poids: this.citerneForm.get('poids')?.value,
      dispo: this.citerneForm.get('poids')?.value,
      isReady: this.citerneForm.get('poids')?.value,
      puissance: this.citerneForm.get('puissance')?.value,
      dateEntretien: this.citerneForm.get('entretien')?.value,
      assetId: this.citerneForm.get('assetId')?.value,
      description: this.citerneForm.get('description')?.value,
      manufacture: this.citerneForm.get('manufacture')?.value,
      serialNumber: this.citerneForm.get('serialNumber')?.value,
      capacitePied: this.citerneForm.get('capacitePied')?.value,
      isAutoVireur: this.citerneForm.get('isAutoVireur')?.value,
      isVaccum: this.citerneForm.get('isVaccum')?.value,
      isCertificated: this.citerneForm.get('isCertificated')?.value,
      isBackCharge: this.citerneForm.get('isBackCharge')?.value,
      nbreCompartiment: this.citerneForm.get('nbreCompartiment')?.value
    };

    this.citerneService.createCiterne(data).subscribe(res => res);
    this.submitted2 = true;
  }
    displayList() {
        this.router.navigate(['/dispatcher/tank/list']);
    }
}
