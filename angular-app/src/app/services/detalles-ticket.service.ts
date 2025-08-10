import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { IDetallesTicket } from '../interfaces/i-detalles-ticket';
import { IGetDetallesVenta } from '../interfaces/i-detalles-ticket';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesTicketService {
  private apiUrl = `${enviroment.apiUrl}/detallesVenta`;
    private httpClient = inject(HttpClient)
  
    getVentaByIdTicket(id_ticket: string): Promise<IGetDetallesVenta> {
      return lastValueFrom(
        this.httpClient.get<IGetDetallesVenta>(`${this.apiUrl}/${id_ticket}`)
      );
    }
  
    insertTicket(detallesVenta: IDetallesTicket): Promise<IDetallesTicket>{
      return lastValueFrom(
        this.httpClient.post<IDetallesTicket>(`${this.apiUrl}`, detallesVenta)
      );
    }
}