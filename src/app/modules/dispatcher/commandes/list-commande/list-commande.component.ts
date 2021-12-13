import {Component, OnInit, ViewChild} from '@angular/core';
import {CommandeModel} from '../models/commande.model';
import {CommandeService} from '../services';
import {ClientService} from '../../client/services';
import {ProductService} from '../../produit/services';
import {ProduitModel} from '../../produit/models/produit.model';
import {Client} from '../../client/models/client-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCommandeComponent} from '../modal-commande/modal-commande.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements OnInit {

  commandeArray = Array<CommandeModel>();
  clientArrayExp = Array<Client>();
  clientArrayDest = Array<Client>();
  typeSiloArrayCharg = Array<CommandeModel>();
  typeSiloArrayDecharg = Array<CommandeModel>();
  productArray = Array<ProduitModel>();
  isHidden = true;
  dataSource: any;

  displayedColumns: string[] = [
    'id',
    'clientExpediteur',
    'heure_chargement_prevu',
    'clientDestinataire',
    'heure_dechargement_prevu',
    'prix_chauffeur',
    'reference',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private commandeService: CommandeService,
              private clientService: ClientService,
              private productService: ProductService,
              private modalService: NgbModal, private router: Router) { }
  ngOnInit(): void {
    this.listClientExp();
    this.listClientDest();
    this.listProduct();
    this.listCommande();
    console.log(this.dataSource);
  }

  openFormModal(commande: CommandeModel) {
    const modalRef = this.modalService.open(ModalCommandeComponent);
    modalRef.componentInstance.commande = commande;
    modalRef.result.then((result) => {
      console.log('result = > ', result);
    }).catch((error) => {
      console.log('error = > ', error);
    });
  }

  listCommande(){
    this.commandeService.getCommandeList().subscribe(res => {
      this.commandeArray = res;
      console.log( this.commandeArray);
      const ELEMENT_DATA: CommandeModel[] = this.commandeArray;
      this.dataSource = new MatTableDataSource<CommandeModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  listClientExp(){
    this.clientService.getClientByType('EXPEDITEUR').subscribe(res => {
      this.clientArrayExp = res;
    });
  }

  listClientDest(){
    this.clientService.getClientByType('DESTINATAIRE').subscribe(res => {
      this.clientArrayDest = res;
    });
  }
  listProduct(){
    this.productService.getProductList().subscribe(res => {
      this.productArray = res;
    });
  }


  displayForm() {
    this.router.navigate(['/dispatcher/command/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
