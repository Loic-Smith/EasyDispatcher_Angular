export class CamionModel{
    id: number = 0;
    marque: string = '';
    modele: string = '';
    matricule: string = '';
    couleur: string ='';
    anneFabrication: number = 2021;
    poids: number = 0.0;
    puissance: number = 0.0;
    dateEntretien: string = '';
    disponible: boolean = true;
    pret: boolean = true;
    chauffeur: number = 0;
    assetId: string ='';
    description:string =''; 
    manufacture: string ='';
    serialNumber: string ='';
    isUsDot: boolean = true;
}