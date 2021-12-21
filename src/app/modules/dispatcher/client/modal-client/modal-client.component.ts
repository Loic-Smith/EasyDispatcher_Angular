import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from '../services';
import {Client} from '../models/client-model';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {

  createClientForm!: FormGroup ;
  submitted: boolean = false;
  client = new Client();
  constructor(private formBuilder: FormBuilder, private clientService: ClientService, public activeModal: NgbActiveModal,) { }
  clientTypes: any = ['DESTINATAIRE', 'EXPEDITEUR', 'PAYEUR'];
  clientPayerList = [];

  ngOnInit(): void {
    this.getClientPayeur();
    this.createClientForm = this.formBuilder.group({
      clientName: [this.client.clientName],
      clientAdresseComplete: [this.client.clientAdresseComplete],
      clientPhoneNumber:[this.client.clientPhoneNumber],
      clientAdresseMunicipalNumber: [this.client.clientAdresseMunicipalNumber],
      clientAdresseStreetName: [this.client.clientAdresseStreetName],
      clientAdresseCity: [this.client.clientAdresseCity],
      clientAdresseCountry: [this.client.clientAdresseCountry],
      //clientType: [this.client.clientType],
      //idClientPayer: ['']
    });

  }
  get f() { return this.createClientForm.controls; }

  udpateClient(){
    let clt = new Client();
    //clt.clientType= this.f.clientType.value,
        clt.clientName= this.f.clientName.value,
        clt.clientAdresseMunicipalNumber= this.f.clientAdresseMunicipalNumber.value,
        clt.clientAdresseStreetName= this.f.clientAdresseStreetName.value,
        clt.clientAdresseCity= this.f.clientAdresseCity.value,
        clt.clientAdresseCountry= this.f.clientAdresseCountry.value,
        //clt.idClientPayer= this.f.idClientPayer.value
    clt.clientAdresseComplete = this.f.clientAdresseComplete.value
    clt.clientPhoneNumber = this.f.clientPhoneNumber.value
    this.clientService.updateClient(this.client.id, clt).subscribe(res =>{
      console.log(res);
    });
    this.submitted = true;
  }
  
  getClientPayeur(){
    this.clientService.getClientByType("PAYEUR").subscribe(res => {
      this.clientPayerList = res;
    })
  }

}
