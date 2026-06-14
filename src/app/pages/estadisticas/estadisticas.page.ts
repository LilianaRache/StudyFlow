import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar, RouterLink, RouterLinkActive]
})
export class EstadisticasPage implements AfterViewInit {
  tareas: any[] = [];
  total = 0;
  completadas = 0;
  pendientes = 0;
  progreso = 0;

  barChart: any;
  pieChart: any;

  constructor(private storageService: StorageService) {}

  ngAfterViewInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.tareas = this.storageService.getTareas();

    this.total = this.tareas.length;
    this.completadas = this.tareas.filter(t => t.completada).length;
    this.pendientes = this.tareas.filter(t => !t.completada).length;
    this.progreso = this.total > 0 ? this.completadas / this.total : 0;

    setTimeout(() => {
      this.crearGraficoBarras();
      this.crearGraficoMaterias();
    }, 100);
  }

  crearGraficoBarras() {
    if (this.barChart) this.barChart.destroy();

    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Completadas', 'Pendientes'],
        datasets: [{
          label: 'Tareas',
          data: [this.completadas, this.pendientes],
          backgroundColor: ['#4caf50', '#ff9800']
        }]
      }
    });
  }

  crearGraficoMaterias() {
    if (this.pieChart) this.pieChart.destroy();

    const materias = [...new Set(this.tareas.map(t => t.materia || 'Sin materia'))];

    const datos = materias.map(materia =>
      this.tareas.filter(t => (t.materia || 'Sin materia') === materia).length
    );

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: materias,
        datasets: [{
          data: datos,
          backgroundColor: ['#4f6df5', '#ff9800', '#4caf50', '#e91e63', '#9c27b0']
        }]
      }
    });
  }
}