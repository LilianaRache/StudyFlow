import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, RouterLinkActive]
})
export class ConfiguracionPage {
  materias: any[] = [];
  tareas: any[] = [];
  completadas = 0;

  constructor(private storageService: StorageService) {}

  ionViewWillEnter() {
    this.materias = this.storageService.getMaterias();
    this.tareas = this.storageService.getTareas();
    this.completadas = this.tareas.filter(t => t.completada).length;
  }

  limpiarDatos() {
    if (confirm('¿Deseas eliminar todas las materias y tareas guardadas?')) {
      this.storageService.clearData();
      this.ionViewWillEnter();
      alert('Datos eliminados correctamente');
    }
  }
}