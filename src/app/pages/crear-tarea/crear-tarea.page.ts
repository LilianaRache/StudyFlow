import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ]
})
export class CrearTareaPage implements OnInit {

  materias: any[] = [];

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
    private router: Router
  ) {}

  ngOnInit() {
    this.materias = this.storageService.getMaterias();
  }

  guardarTarea() {
    if (!this.tarea.titulo.trim()) {
      alert('Ingrese el título de la tarea');
      return;
    }

    this.storageService.addTarea({
      ...this.tarea,
      id: Date.now()
    });

    alert('Tarea guardada correctamente');
    this.router.navigate(['/tareas']);
  }
}