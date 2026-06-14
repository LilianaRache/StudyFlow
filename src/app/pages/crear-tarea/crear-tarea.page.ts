import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotificationsService } from '../../services/notifications';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterLink,
    RouterLinkActive
  ]
})
export class CrearTareaPage implements OnInit {

  materias: any[] = [];
  errorTitulo = false;
  errorMateria = false;
  errorFecha = false;
  errorPrioridad = false;

  tarea = {
    titulo: '',
    materia: '',
    fecha: '',
    prioridad: '',
    descripcion: '',
    completada: false
  };

  constructor(
    private storageService: StorageService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.materias = this.storageService.getMaterias();
  }

  async guardarTarea() {
    this.errorTitulo = !this.tarea.titulo.trim();
    this.errorMateria = !this.tarea.materia;
    this.errorFecha = !this.tarea.fecha;
    this.errorPrioridad = !this.tarea.prioridad;

    if (this.errorTitulo || this.errorMateria || this.errorFecha || this.errorPrioridad) {
      return;
    }

    const nuevaTarea = {
      ...this.tarea,
      id: Math.floor(Date.now() % 2147483647)
    };

    this.storageService.addTarea(nuevaTarea);
    await this.notificationsService.programarRecordatorio(nuevaTarea);

    alert('Tarea guardada correctamente');
    this.router.navigate(['/tareas']);
  }
}