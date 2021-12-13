import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChauffeurService} from '../services/chauffeur-service.service';
import {ChauffeurModel} from '../models/chauffeur.model';

@Component({
  selector: 'app-modal-chauffeur',
  templateUrl: './modal-chauffeur.component.html',
  styleUrls: ['./modal-chauffeur.component.scss']
})
export class ModalChauffeurComponent implements OnInit {
  chauffeur = new ChauffeurModel;
  submitted = false;
  createChauffeurForm!: FormGroup;

  statuts = [
    {
      id: 1,
      statut: "Permanent"
    },
    {
      id: 2,
      statut: "Temporaire"
    },
  ];

  constructor(private chauffeurService: ChauffeurService, public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
    this.createChauffeurForm = new FormGroup({
      nom: new FormControl(this.chauffeur.nomChauffeur),
      prenom: new FormControl(this.chauffeur.prenomChauffeur),
      date_embauche: new FormControl(this.chauffeur.date_embauche,[Validators.required]),
      date_depart: new FormControl(this.chauffeur.date_depart,[Validators.required]),
      statut: new FormControl('',[Validators.required]),
      lundi: new FormControl('',[Validators.required]),
      mardi: new FormControl('',[Validators.required]),
      mercredi: new FormControl('',[Validators.required]),
      jeudi: new FormControl('',[Validators.required]),
      vendredi: new FormControl('',[Validators.required]),
      samedi: new FormControl('',[Validators.required]),
      dimanche: new FormControl('',[Validators.required]),
    });
  }
  updateChauffeur(){
    var data = {
      nomChauffeur: this.createChauffeurForm.get('nom')?.value,
      prenomChauffeur: this.createChauffeurForm.get('prenom')?.value,
      date_embauche: this.createChauffeurForm.get('date_embauche')?.value,
      date_depart: this.createChauffeurForm.get('date_depart')?.value,
      statut: this.createChauffeurForm.get('statut')?.value,
      lundi: this.createChauffeurForm.get('lundi')?.value,
      mardi: this.createChauffeurForm.get('mardi')?.value,
      mercredi: this.createChauffeurForm.get('mercredi')?.value,
      jeudi: this.createChauffeurForm.get('jeudi')?.value,
      vendredi: this.createChauffeurForm.get('vendredi')?.value,
      samedi: this.createChauffeurForm.get('samedi')?.value,
      dimanche: this.createChauffeurForm.get('dimanche')?.value,
    };
    this.chauffeurService.updateChauffeur(this.chauffeur.id, data).subscribe(res => {
      console.log(res);

    });
    this.submitted = true;
  }

}
