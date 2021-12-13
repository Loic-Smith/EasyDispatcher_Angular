import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../services';

@Component({
  selector: 'app-modal-citerne',
  templateUrl: './modal-citerne.component.html',
  styleUrls: ['./modal-citerne.component.scss']
})
export class ModalCiterneComponent implements OnInit {
  createCiterneForm!: FormGroup;
  submitted = false;
  citerne = new CiterneModel();
  years = Array<number>();
  citerneArray = Array<CiterneModel>();

  constructor(public activeModal: NgbActiveModal, private citerneService: CiterneService) { }

  ngOnInit(): void {
    this.createCiterneForm = new FormGroup({
      assetId: new FormControl(this.citerne.assetId),
      marque: new FormControl(this.citerne.marque),
      model: new FormControl(this.citerne.modele),
      matricule: new FormControl(this.citerne.matricule),
      fabric: new FormControl(this.citerne.anneFabrication),
      poids: new FormControl(this.citerne.poids),
      puissance: new FormControl(this.citerne.puissance),
      entretien: new FormControl(this.citerne.dateEntretien),
      dispo: new FormControl(this.citerne.dispo),
      description: new FormControl(this.citerne.description),
      manufacture: new FormControl(this.citerne.manufacture),
      serialNumber: new FormControl(this.citerne.serialNumber),
      isAutoVireur: new FormControl(this.citerne.isAutoVireur),
      isVaccum: new FormControl(this.citerne.isVaccum),
      isCertificated: new FormControl(this.citerne.isCertificated),
      isBackCharge: new FormControl(this.citerne.isBackCharge),
      nbreCompartiment: new FormControl(this.citerne.nbreCompartiment),
      capacitePied: new FormControl(this.citerne.capacitePied),
    });
    this.listCiterne();
  }

  listCiterne(){
    this.citerneService.getCiterneList().subscribe(res => {
      this.citerneArray = res;
      console.log(this.citerneArray);
    });
  }

  updateCiterne(){
    var data = {
      assetId: this.createCiterneForm.get('asserId')?.value,
      marque: this.createCiterneForm.get('marque')?.value,
      model: this.createCiterneForm.get('model')?.value,
      matricule: this.createCiterneForm.get('matricule')?.value,
      fabric: this.createCiterneForm.get('fabric')?.value,
      poids: this.createCiterneForm.get('poids')?.value,
      puissance: this.createCiterneForm.get('puissance')?.value,
      entretien: this.createCiterneForm.get('entretien').value,
      dispo: this.createCiterneForm.get('dispo')?.value,
      description: this.createCiterneForm.get('description')?.value,
      manufacture: this.createCiterneForm.get('manufacture')?.value,
      serialNumber: this.createCiterneForm.get('serialNumber')?.value,
      isAutoVireur: this.createCiterneForm.get('isAutoVireur')?.value,
      isVaccum: this.createCiterneForm.get('isVaccum')?.value,
      isCertificated: this.createCiterneForm.get('isCertificated')?.value,
      isBackCharge: this.createCiterneForm.get('isBackCharge')?.value,
      nbreCompartiment: this.createCiterneForm.get('nbreCompartiment')?.value,
      capacitePied: this.createCiterneForm.get('capacitePied')?.value
    };
    this.citerneService.updateCiterne(this.citerne.id, data).subscribe(res => {
      this.listCiterne();
    });
    this.submitted = true;
  }

}
