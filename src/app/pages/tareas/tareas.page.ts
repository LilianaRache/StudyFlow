import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink]
})
export class TareasPage implements OnInit {

  tareas: any[] = [];
  editandoIndex: number | null = null;
  tituloEditado = '';

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = this.storageService.getTareas();
  }

  cambiarEstado(tarea: any) {
    tarea.completada = !tarea.completada;
    this.storageService.saveTareas(this.tareas);
  }

  editarTarea(index: number) {
    this.editandoIndex = index;
    this.tituloEditado = this.tareas[index].titulo;
  }

  guardarEdicion(index: number) {
    if (!this.tituloEditado.trim()) return;

    this.tareas[index].titulo = this.tituloEditado;
    this.storageService.saveTareas(this.tareas);

    this.editandoIndex = null;
    this.tituloEditado = '';
  }

  eliminarTarea(index: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareas.splice(index, 1);
      this.storageService.saveTareas(this.tareas);
    }
  }
}