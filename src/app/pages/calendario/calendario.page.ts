import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink]
})
export class CalendarioPage {
  tareas: any[] = [];

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.tareas = this.storageService.getTareas();
  }

formatearFecha(fecha: string): string {
    if (!fecha) return 'Sin fecha';
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  }
}