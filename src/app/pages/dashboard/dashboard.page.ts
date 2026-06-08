import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonProgressBar, RouterLink]
})
export class DashboardPage implements OnInit {

  tareas: any[] = [];
  pendientes: any[] = [];
  proximas: any[] = [];
  progreso = 0;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.tareas = this.storageService.getTareas();
    this.pendientes = this.tareas.filter(t => !t.completada);
    this.proximas = this.pendientes.slice(0, 3);

    const completadas = this.tareas.filter(t => t.completada).length;
    this.progreso = this.tareas.length > 0 ? completadas / this.tareas.length : 0;
  }
}