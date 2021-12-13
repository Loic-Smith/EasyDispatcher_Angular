import { Time } from '@angular/common';
import { Client } from '../../client/models/client-model';
import { ProduitModel } from '../../produit/models/produit.model';

export class CommandeModel{
    id: number = 0;
    reference: number = 0;
    clientExpediteur: Client = new Client;
    clientDestinataire: Client = new Client;
    qte_normal_expedie: number = 0;
    qte_degel_expedie: number = 0;
    temps_chargement_prevu: Time = { hours: 0, minutes: 0 };
    distance_expediteur_destinataire: number = 0;
    prix_chauffeur: number = 0;
    prix_voiturier: number = 0;
    date_chargement_prevu: Date = new Date();
    date_dechargement_prevu: Date = new Date();
    heure_chargement_prevu: Time = { hours: 0, minutes: 0 };
    heure_dechargement_prevu: Time = { hours: 0, minutes: 0 };
    produit: ProduitModel = new ProduitModel;
    id_type_silo_chargement: Type_Silo ={ id: 0, libelle_type_silo : ""} ;
    id_type_silo_dechargement: Type_Silo ={ id: 0, libelle_type_silo : ""} ;
}

export interface Type_Silo{
    id: number;
    libelle_type_silo: string;
}
