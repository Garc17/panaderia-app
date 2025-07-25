import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { IProductos } from '../../interfaces/i-productos';
import { IVenta } from '../../interfaces/i-venta';
import Swal from 'sweetalert2';
import { TicketsService } from '../../services/tickets.service';

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
  precio: number | null = null;

  productos: IProductos[] = [];
  ticketFinal: IVenta | undefined;
  productoSeleccionado: IProductos | null = null;
  productoEliminar: number | undefined;
  productoEditar: IProductos | null = null;
  cantidadEditar: number | undefined;
  cantidadSeleccionada: number = 1;
  ticket: { producto: IProductos; cantidad: number }[] = [];

  constructor(private productosService: ProductosService, private ticketService: TicketsService) {}

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

  abrirModalEditar() {
    const modalElement = document.getElementById('modalEditarProducto');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  abrirModalEliminar() {
    const modalElement = document.getElementById('modalEliminarProducto');
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
      // Reset
      this.productoSeleccionado = null;
      this.cantidadSeleccionada = 1;
    }
  }

  editarProducto(idProducto: IProductos) {
    this.productoEditar= idProducto
    const productoEncontrado = this.ticket.find(item => item.producto.codproducto === idProducto.codproducto);
    this.cantidadEditar = productoEncontrado ? productoEncontrado.cantidad : 0;
    
    if (idProducto) {
      // Abrir modal después de que Angular actualice la vista
      setTimeout(() => this.abrirModalEditar(), 0);
    }
  }

  editarProducto2(productoEditar: IProductos, cantidad: number) {
    
    console.log(this.ticket);
    console.log("-------------------------------------------");
    
    this.productoEditar= null;

    this.ticket = this.ticket.map(item => {
      if (item.producto.codproducto === productoEditar.codproducto) {
        return { producto: productoEditar, cantidad: this.cantidadEditar! };
      }
      return item;
    });

    console.log(this.ticket);
    

    Swal.fire({
      title: 'Editado',
      text: 'El producto fue editado',
      icon: 'success',
      timer: 1000,
    });
  }

  eliminarProducto(idProducto: number) {
    this.productoEliminar= idProducto
    
    if (idProducto) {
      // Abrir modal después de que Angular actualice la vista
      setTimeout(() => this.abrirModalEliminar(), 0);
    }
  }

  eliminarProducto2(idProducto: number) {
    this.ticket = this.ticket.filter(item => item.producto.codproducto !== idProducto);
    this.productoEliminar= undefined
    Swal.fire({
      title: 'Eliminado',
      text: 'El producto fue eliminado',
      icon: 'success',
      timer: 1000,
    });
  }

  finalizarVenta(){
    this.ticketFinal= {id_usuario: 2, total_venta: this.sumarTotal()}
    this.ticketService.insertTicket(this.ticketFinal)
      .then(venta => {
        
      this.ticket= []
        Swal.fire({
          title: 'Finalizado',
          text: 'La venta fue finalizada',
          icon: 'success',
          timer: 1000,
        });
      })
      .catch(() => {
        this.ticketFinal = undefined;
      });
  }

  sumarTotal(){
    let aux= 0
    for (let i = 0; i < this.ticket.length; i++) {
      aux+= this.ticket[i].cantidad*this.ticket[i].producto.precio
    }

    return aux
  }

}
