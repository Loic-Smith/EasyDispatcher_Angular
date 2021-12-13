import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CiterneService} from '../../citerne/services';
import {MatPaginator} from '@angular/material/paginator';
import {CiterneModel} from '../../citerne/models/citerne.model';
import {MatTableDataSource} from '@angular/material/table';
import {CamionService} from '../services/camion-service.service';
import {CamionModel} from '../models/camion.model';
import {ModalClientComponent} from '../../client/modal-client/modal-client.component';
import {ModalCamionComponent} from '../modal-camion/modal-camion.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.scss']
})
export class ListTruckComponent implements OnInit {


  constructor(private modalService: NgbModal, private camionService: CamionService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  camionArray = Array<CamionModel>();

  displayedColumns: string[] = [
    'id',
    'assetId',
    'description',
    'matricule',
    'serialNumber',
    'isRedy',
    'isUsDot',
    'action'
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.lisCiterne();
  }

  lisCiterne(){
    this.camionService.getCamionList().subscribe(res => {
      this.camionArray = res;
      console.log(this.camionArray);
      const ELEMENT_DATA: CamionModel[] = this.camionArray;
      this.dataSource = new MatTableDataSource<CamionModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  openFormModal(camion: any) {
    const modalRef = this.modalService.open(ModalCamionComponent);
    modalRef.componentInstance.camion = camion;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }
  displayForm(){
    this.router.navigate(['dispatcher/truck/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }
}
