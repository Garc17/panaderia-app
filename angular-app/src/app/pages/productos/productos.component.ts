import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { IProductos } from '../../interfaces/i-productos';

declare const bootstrap: any;

@Component({
  selector: 'app-productos',
  imports: [RouterLink, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  prueba: boolean= false
  productoCB: string = '';
  cantidad: number | null = null;
  precio: number | null = null; // O string si prefieres
  fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en-US')

  productos: IProductos[] = [];
  productoSeleccionado: IProductos | null = null;
  cantidadSeleccionada: number = 1;
  ticket: { producto: IProductos; cantidad: number }[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos()
  }

  cargarProductos(){
    this.productosService.getProductos()
      .then(data => {
        this.productos = data;
      })
      .catch((error: any) => {
        console.error('Error al cargar los productos:', error);
      });
  }

  abrirModalProducto() {
    const modalElement = document.getElementById('modalProducto');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onCodigoBarrasChange() {
    const codigo = this.productoCB.trim();
    if (!codigo) return;

    this.productosService.getProductoPorCodigoBarras(codigo)
      .then(producto => {
        this.productoSeleccionado = producto;
        this.cantidadSeleccionada = 1;
        this.productoCB = '';

        // Abrir modal después de que Angular actualice la vista
        setTimeout(() => this.abrirModalProducto(), 0);
      })
      .catch(() => {
        this.productoSeleccionado = null;
        // Mostrar mensaje de error si se desea
      });
  }

  confirmarProducto() {
    if (this.productoSeleccionado && this.cantidadSeleccionada > 0) {
      this.ticket.push({
        producto: this.productoSeleccionado,
        cantidad: this.cantidadSeleccionada
        
      });

        console.log(this.ticket);
      // Reset
      this.productoSeleccionado = null;
      this.cantidadSeleccionada = 1;
    }
  }

  sumarTotal(){
    let aux= 0
    for (let i = 0; i < this.ticket.length; i++) {
      aux+= this.ticket[i].cantidad*this.ticket[i].producto.precio
    }

    return aux
  }

}
