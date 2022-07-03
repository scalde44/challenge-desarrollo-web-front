import { Component, OnInit } from '@angular/core';
import { Historico } from '../../models/objects/Historico.model';
import { JuegoService } from '../../services/juego.service';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoTabla } from '../../models/objects/historicotabla.model';

@Component({
  selector: 'app-historic-game',
  templateUrl: './historic-game.component.html',
  styleUrls: ['./historic-game.component.scss']
})
export class HistoricGameComponent implements OnInit {
  
 
  title: string = 'Historico de ganadores';
  listaHistorico: HistoricoTabla[] = [];
  displayedColumns: string[] = ['aggregateRootId', 'idGanador', 'nombreGanador', 'colorGanador'];
  dataSource = new MatTableDataSource<HistoricoTabla>(this.listaHistorico);

  constructor(private juegoService : JuegoService) { }

  ngOnInit(): void {
    this.getHistorico();   
  }

  getHistorico() {
    this.juegoService.getHistoricoGanadores().subscribe(
      historico  => {
        this.listaHistorico = historico;
        this.dataSource.data = this.listaHistorico;
        console.log(this.dataSource.data);
      }
    )
  }




}
