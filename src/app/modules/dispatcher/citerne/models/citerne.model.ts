import { MarqueCiterneModel } from './marque-citerne-model';

export class CiterneModel{
    id = 0;
    marque = '';
    modele = '';
    matricule = '';
    anneFabrication = 0;
    poids = 0;
    dispo = false; // status
    puissance = 0;
    dateEntretien = 0;
    assetId = '';
    description = '';
    manufacture = '';
    serialNumber = '';
    capacitePied = 0;
    isAutoVireur = false;
    isVaccum = false;
    isCertificated = false;
    isBackCharge = false;
    nbreCompartiment = 0;
}
