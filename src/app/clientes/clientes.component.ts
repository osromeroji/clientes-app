import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
      //function (clientes) => {this.clientes = clientes}
    );
  }

  delete(cliente: Cliente) : void {
    const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

    swalWithBootstrapButtons.fire({
title: 'Está seguro?',
text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Sí, eliminar!',
cancelButtonText: 'No, cancelar!'
}).then((result) => {
if (result.value) {
  this.clienteService.delete(cliente.id).subscribe(
    response => {
      this.clientes = this.clientes.filter(cli => cli !== cliente)
      swal.fire(
        'Cliente eliminado!',
        `Cliente ${cliente.nombre} eliminado con éxito.`,
        'success'
      )
    }
  )

}
})
  }

}
