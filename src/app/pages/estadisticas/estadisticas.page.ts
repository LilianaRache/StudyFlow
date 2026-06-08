import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar, RouterLink]
})
export class EstadisticasPage {
  tareas: any[] = [];
  total = 0;
  completadas = 0;
  pendientes = 0;
  progreso = 0;
  alta = 0;
  media = 0;
  baja = 0;

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.tareas = this.storageService.getTareas();

    this.total = this.tareas.length;
    this.completadas = this.tareas.filter(t => t.completada).length;
    this.pendientes = this.tareas.filter(t => !t.completada).length;

    this.alta = this.tareas.filter(t => t.prioridad === 'Alta').length;
    this.media = this.tareas.filter(t => t.prioridad === 'Media').length;
    this.baja = this.tareas.filter(t => t.prioridad === 'Baja').length;

    this.progreso = this.total > 0 ? this.completadas / this.total : 0;
  }
}