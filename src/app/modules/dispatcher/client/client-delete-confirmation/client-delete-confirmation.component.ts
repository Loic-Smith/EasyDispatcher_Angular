import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client-model';
import { ClientService } from '../services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-delete-confirmation',
  templateUrl: './client-delete-confirmation.component.html',
  styleUrls: ['./client-delete-confirmation.component.scss']
})
export class ClientDeleteConfirmationComponent implements OnInit {

  client=new Client;
  
  constructor(private clientservice:ClientService ,public activemodal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteClient(clientid:number){
    this.clientservice.deleteClient(clientid);
    alert('client supprimé avec succes!'+clientid);
  }
}
