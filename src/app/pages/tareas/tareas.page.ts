import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, RouterLinkActive]
})
export class TareasPage implements OnInit {

  tareas: any[] = [];
  filtro = 'todas';
  editandoIndex: number | null = null;
  tituloEditado = '';
  materias: any[] = [];
  tareaEditada: any = null;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = this.storageService.getTareas();
    this.materias = this.storageService.getMaterias();
  }

  get tareasFiltradas() {
    if (this.filtro === 'pendientes') {
      return this.tareas.filter(t => !t.completada);
    }

    if (this.filtro === 'completadas') {
      return this.tareas.filter(t => t.completada);
    }

    return this.tareas;
  }

  cambiarFiltro(valor: string) {
    this.filtro = valor;
  }

  cambiarEstado(tarea: any) {
    tarea.completada = !tarea.completada;
    this.storageService.saveTareas(this.tareas);
  }

  editarTarea(tarea: any) {
    this.editandoIndex = this.tareas.indexOf(tarea);
    this.tareaEditada = { ...tarea };
  }

  guardarEdicion() {
    if (this.editandoIndex === null || !this.tareaEditada.titulo.trim()) return;

    this.tareas[this.editandoIndex] = this.tareaEditada;
    this.storageService.saveTareas(this.tareas);

    this.editandoIndex = null;
    this.tareaEditada = null;
  }

  eliminarTarea(tarea: any) {
    if (confirm('¿Eliminar esta tarea?')) {
      const index = this.tareas.indexOf(tarea);
      this.tareas.splice(index, 1);
      this.storageService.saveTareas(this.tareas);
    }
  }
}