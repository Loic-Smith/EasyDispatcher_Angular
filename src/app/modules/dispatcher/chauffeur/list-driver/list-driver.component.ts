import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../produit/services';
import {MatPaginator} from '@angular/material/paginator';
import {ProduitModel} from '../../produit/models/produit.model';
import {MatTableDataSource} from '@angular/material/table';
import {ChauffeurService} from '../services/chauffeur-service.service';
import {ChauffeurModel} from '../models/chauffeur.model';
import {ModalClientComponent} from '../../client/modal-client/modal-client.component';
import {ModalChauffeurComponent} from '../modal-chauffeur/modal-chauffeur.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-driver',
  templateUrl: './list-driver.component.html',
  styleUrls: ['./list-driver.component.scss']
})
export class ListDriverComponent implements OnInit {


  constructor(private modalService: NgbModal, private driverService: ChauffeurService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  driverArray = Array<ChauffeurModel>();

  displayedColumns: string[] = [
    'id',
    'prenomChauffeur',
    'nomChauffeur',
    'date_embauche',
    'action',
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.listProduct();
  }

  listProduct(){
    this.driverService.getChauffeurList().subscribe(res => {
      this.driverArray = res;
      console.log(this.driverArray);
      const ELEMENT_DATA: ChauffeurModel[] = this.driverArray;
      this.dataSource = new MatTableDataSource<ChauffeurModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  openFormModal(chauffeur: any) {
      const modalRef = this.modalService.open(ModalChauffeurComponent);
      modalRef.componentInstance.chauffeur = chauffeur;
      modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }
  displayForm() {
    this.router.navigate(['/dispatcher/driver/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
