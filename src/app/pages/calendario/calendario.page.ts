import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, RouterLinkActive]
})
export class CalendarioPage {
  tareas: any[] = [];
  diasCalendario: any[] = [];
  fechaActual = new Date();

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.tareas = this.storageService.getTareas();
    this.generarCalendario();
  }

  generarCalendario() {
    const anio = this.fechaActual.getFullYear();
    const mes = this.fechaActual.getMonth();
    const totalDias = new Date(anio, mes + 1, 0).getDate();

    this.diasCalendario = [];

    for (let dia = 1; dia <= totalDias; dia++) {
      const fecha = `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
      const tareasDelDia = this.tareas.filter(t => t.fecha === fecha);

      this.diasCalendario.push({
        dia,
        fecha,
        tareas: tareasDelDia
      });
    }
  }

  get nombreMes() {
    return this.fechaActual.toLocaleDateString('es-CO', {
      month: 'long',
      year: 'numeric'
    });
  }

  diaSeleccionado: any = null;

  mesAnterior() {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() - 1, 1);
    this.generarCalendario();
    this.diaSeleccionado = null;
  }

  mesSiguiente() {
    this.fechaActual = new Date(this.fechaActual.getFullYear(), this.fechaActual.getMonth() + 1, 1);
    this.generarCalendario();
    this.diaSeleccionado = null;
  }

  seleccionarDia(dia: any) {
    this.diaSeleccionado = dia;
  }
}