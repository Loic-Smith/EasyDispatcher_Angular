import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CiterneService} from '../services';
import {CiterneModel} from '../models/citerne.model';
import {ModalCiterneComponent} from '../modal-citerne/modal-citerne.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-tank',
  templateUrl: './list-tank.component.html',
  styleUrls: ['./list-tank.component.scss']
})
export class ListTankComponent implements OnInit {


  constructor(private modalService: NgbModal, private citerneService: CiterneService, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: any ;
  citerneArray = Array<CiterneModel>();

  displayedColumns: string[] = [
    'id',
    'assetId',
    'description',
    'matricule',
    'serialNumber',
    'capacitePied',
    'isVaccum',
    'isAutoVireur',
    'action'
  ];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.lisCiterne();
  }

  lisCiterne(){
    this.citerneService.getCiterneList().subscribe(res => {
      this.citerneArray = res;
      console.log(this.citerneArray);
      const ELEMENT_DATA: CiterneModel[] = this.citerneArray;
      this.dataSource = new MatTableDataSource<CiterneModel>(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }
  openFormModal(citerne: any) {
    const modalRef = this.modalService.open(ModalCiterneComponent);
    modalRef.componentInstance.citerne = citerne;
    modalRef.result
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }
  displayForm() {
    this.router.navigate(['/dispatcher/tank/new']);
  }
  search(event: Event){
    const input = (event.target as HTMLInputElement).value;
    this.dataSource.filter = input.trim().toLowerCase();
  }

}
