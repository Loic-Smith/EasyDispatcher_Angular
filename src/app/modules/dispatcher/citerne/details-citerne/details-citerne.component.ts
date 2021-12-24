import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CiterneModel} from '../models/citerne.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../services';

@Component({
  selector: 'app-details-citerne',
  templateUrl: './details-citerne.component.html',
  styleUrls: ['./details-citerne.component.scss']
})
export class DetailsCiterneComponent implements OnInit {

  detailsCiterneForm!: FormGroup;
  submitted = false;
  citerne = new CiterneModel();
  years = Array<number>();
  citerneArray = Array<CiterneModel>();

  constructor(public activeModal: NgbActiveModal, private citerneService: CiterneService) { }

  ngOnInit(): void {
    this.detailsCiterneForm = new FormGroup({
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

}
