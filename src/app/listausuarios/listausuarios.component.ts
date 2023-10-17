import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ListausuariosDataSource, ListausuariosItem } from './listausuarios-datasource';
import { UsuarioApiService } from '../shared/usuario-api.service';
import { Observable, catchError, retry } from 'rxjs';
import { Usuario } from '../shared/usuario';

@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {
  Usuario: any = [];
  constructor(public restApi: UsuarioApiService) {}
  ngOnInit() {
    this.loadPaci();
  }

  // Get - lista de Pacientes
  loadPaci() {
    return this.restApi.getUsuarios().subscribe((data: {}) => {
      this.Usuario = data;
    });
  }

  // Delete Paciente
  deleteUsuario(id: any) {
    if (window.confirm('Tem certeza que deseja Excluir este Paciente?')) {
      this.restApi.deleteUsuario(id).subscribe((data) => {
        this.loadPaci();
      });
    }
  }


}
