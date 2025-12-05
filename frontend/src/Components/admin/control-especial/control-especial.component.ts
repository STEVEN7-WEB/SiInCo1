import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-especial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-especial.component.html',
  styleUrls: ['./control-especial.component.css'],
})
export class ControlEspecial {

  api = "http://localhost:8000/api";

  pantalla: 'inicio' | 'lista' = 'inicio';
  tipo: 'usuarios' | 'docentes' | null = null;

  usuarios: any[] = [];
  docentes: any[] = [];

  // Modal editar
  modalVisible = false;
  itemEditando: any = null;

  // Modal eliminar
  modalEliminarVisible = false;
  idAEliminar: number | null = null;

  // Toast
  toastActivo = false;
  toastMensaje = "";

  constructor() {
    this.cargarUsuarios();
    this.cargarDocentes();
  }

  // ===========================
  // Toast
  // ===========================
  mostrarToast(msg: string) {
    this.toastMensaje = msg;
    this.toastActivo = true;
    setTimeout(() => this.toastActivo = false, 2500);
  }

  // ===========================
  // Pantalla
  // ===========================
  seleccionar(tipo: 'usuarios' | 'docentes') {
    this.tipo = tipo;
    this.pantalla = 'lista';
  }

  volverInicio() {
    this.pantalla = 'inicio';
    this.tipo = null;
  }

  obtenerActuales() {
    return this.tipo === 'usuarios' ? this.usuarios : this.docentes;
  }

  // ===========================
  // Cargar datos
  // ===========================
  async cargarUsuarios() {
    const r = await fetch(`${this.api}/usuario`);
    this.usuarios = await r.json();
  }

  async cargarDocentes() {
    const r = await fetch(`${this.api}/admin-docente`);
    this.docentes = await r.json();
  }

  // ===========================
  // Editar
  // ===========================
  abrirModalEditar(item: any) {
    this.itemEditando = JSON.parse(JSON.stringify(item)); // Copia profunda
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.itemEditando = null;
  }

  async guardarCambios() {
    if (!this.itemEditando) return;

    let endpoint = "";

    if (this.tipo === 'usuarios') {
      endpoint = `${this.api}/usuario/id/${this.itemEditando.id}`;
    } else {
      endpoint = `${this.api}/admin-docente/${this.itemEditando.id}`;
    }

    await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.itemEditando)
    });

    this.cerrarModal();
    this.mostrarToast("Cambios guardados ✔");

    if (this.tipo === 'usuarios') this.cargarUsuarios();
    else this.cargarDocentes();
  }

  // ===========================
  // Eliminar
  // ===========================
  abrirModalEliminar(id: number) {
    this.idAEliminar = id;
    this.modalEliminarVisible = true;
  }

  cerrarModalEliminar() {
    this.modalEliminarVisible = false;
    this.idAEliminar = null;
  }

  async confirmarEliminar() {
    if (!this.idAEliminar) return;

    let endpoint = "";

    if (this.tipo === 'usuarios') {
      endpoint = `${this.api}/usuario/id/${this.idAEliminar}`;
    } else {
      endpoint = `${this.api}/admin-docente/${this.idAEliminar}`;
    }

    await fetch(endpoint, { method: "DELETE" });

    this.cerrarModalEliminar();
    this.mostrarToast("Eliminado correctamente 🗑");

    if (this.tipo === 'usuarios') this.cargarUsuarios();
    else this.cargarDocentes();
  }

}
