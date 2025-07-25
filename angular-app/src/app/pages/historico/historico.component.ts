import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IGetVentas } from '../../interfaces/i-venta';
import { TicketsService } from '../../services/tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historico',
  imports: [CommonModule,RouterLink],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  ventas: IGetVentas[] = [];
  totalVentas: number = 0;

  constructor(private ticketService: TicketsService) {}

  ngOnInit(): void {
    this.cargarVentas()
  }

  cargarVentas(){
    this.ticketService.getVentas()
      .then(data => {
        this.ventas= data;
        this.totalVentas = this.sumarTotal();
      })
      .catch((error: any) => {
        console.error('Error al cargar las ventas:', error);
      });
  }

  sumarTotal(): number {
    return this.ventas.reduce((acc, venta) => acc + Number(venta.total_venta), 0);
  }
}
