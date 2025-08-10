export interface IDetallesTicket {
    id_ticket: number,
    id_producto: number,
    cantidad: number,
    precio_unitario: number
}

export interface IGetDetallesVenta {
    id_detalle: number,
    id_ticket: number;
    id_producto: number;
    id_servicio: number,
    cantidad: number;
    precio_unitario: number;
}
