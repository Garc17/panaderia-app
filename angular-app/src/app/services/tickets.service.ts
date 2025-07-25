import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { IVenta } from '../interfaces/i-venta';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TicketsService {
  private apiUrl = `${enviroment.apiUrl}/ventas`;
  private httpClient = inject(HttpClient)

  getVentas(): Promise<IVenta[]> {
    return lastValueFrom(
      this.httpClient.get<IVenta[]>(this.apiUrl)
    )
  }

  getVentaByIdTicket(id_ticket: string): Promise<IVenta> {
    return lastValueFrom(
      this.httpClient.get<IVenta>(`${this.apiUrl}/${id_ticket}`)
    );
  }

  insertTicket(venta: IVenta): Promise<IVenta>{
    return lastValueFrom(
      this.httpClient.post<IVenta>(`${this.apiUrl}`, venta)
    );
  }
}
