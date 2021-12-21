import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-command-delete-confirmation',
  templateUrl: './command-delete-confirmation.component.html',
  styleUrls: ['./command-delete-confirmation.component.scss']
})
export class CommandDeleteConfirmationComponent implements OnInit {

  name:number=0; //command reference
  code:number=0; //command ID

  constructor(private commandeService: CommandeService,public activemodal:NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteCommand(){
    //we delete a command by a given ID..
    this.commandeService.deleteCommande(this.code);
    this.activemodal.dismiss('');
    //alert('Commande supprimée avec succes!');
  }

}
