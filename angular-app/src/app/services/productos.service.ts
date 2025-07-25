import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { IProductos } from '../interfaces/i-productos';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private apiUrl = `${enviroment.apiUrl}/productos`;
  private httpClient = inject(HttpClient)

  getProductos(): Promise<IProductos[]> {
    return lastValueFrom(
      this.httpClient.get<IProductos[]>(this.apiUrl)
    )
  }

  getProductoPorCodigoBarras(cod_barras: string): Promise<IProductos> {
  return lastValueFrom(
    this.httpClient.get<IProductos>(`${this.apiUrl}/${cod_barras}`)
  );
}

}
