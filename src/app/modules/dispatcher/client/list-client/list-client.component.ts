import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ClientService} from '../services';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Client} from '../models/client-model';
import {ModalClientComponent} from '../modal-client/modal-client.component';


@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {
  client: Client = new Client();
  displayClientPayerinput = false;

  clientTypes: any = ['DESTINATAIRE', 'EXPEDITEUR', 'PAYEUR'];
  clientPayerList = [];
  clients!: Client[];
  searchedClients = Array<Client>();
  clientArrayExp = Array<Client>();
  clientArrayDest = Array<Client>();
  clientArrayPay = Array<Client>();

  displayedColumns: string[] = [
    'id',
    'clientName',
    'clientAdresseComplete',
    'clientPhoneNumber',
    'action',
  ];
  // tslint:disable-next-line:prettier
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private clientservice: ClientService,
      private modalService: NgbModal
  ) {}

  ngOnInit() {
    // this.getClientPayeur();
    // this.listClientExp();
    this.listClientDest();
    this.getListClient();
  }
  public doFilter = (value: any) => {
    this.dataSource.filter = value?.target.valuetrim().toLocaleLowerCase();
  }

  clientPayeurChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }

  clientExpediteurChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }

  clientDestinataireChange(e: any) {
    console.log('INSIDE EVENT', e.target.value);
    if (e.target.value === '1: DESTINATAIRE') {
      this.displayClientPayerinput = true;
    } else {
      this.displayClientPayerinput = false;
    }
  }
  openFormModal(client: any) {
    const modalRef = this.modalService.open(ModalClientComponent);
    modalRef.componentInstance.client = client;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }
  displayClientForm() {
    this.router.navigate(['/dispatcher/client/new']);
  }

  getListClient() {
    this.clientservice.getClientsList().subscribe(data => {
      this.clients = data;
      alert(this.clients);
      this.searchedClients = this.clients;
    });
  }

  // getClientPayeur() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayPay = res;
  //     this.clientArrayPay = this.clientArrayPay.filter(
  //         client => client.clientPayeur === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayPay;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }


  // listClientExp() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayExp = res;
  //     this.clientArrayExp = this.clientArrayExp.filter(
  //         client => client.clientExpediteur === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayExp;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  listClientDest(){
    //Pour lister tous les client...
    this.clientservice.getClientsList().subscribe(res =>{
      this.clientArrayDest=res;
      const ELEMENT_DATA: Client[] = this.clientArrayDest;
      this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  // listClientDest() {
  //   this.clientservice.getClientsList().subscribe(res => {
  //     this.clientArrayDest = res;
  //     this.clientArrayDest = this.clientArrayDest.filter(
  //         client => client.clientDestinataire === 'OUI'
  //     );
  //     const ELEMENT_DATA: Client[] = this.clientArrayDest;
  //     this.dataSource = new MatTableDataSource<Client>(ELEMENT_DATA);
  //     this.dataSource.paginator = this.paginator;
  //   });
  // }

  search(event: Event){
    this.getListClient();
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }

}
