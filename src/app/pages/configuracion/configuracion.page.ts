import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink]
})
export class ConfiguracionPage {

  constructor(private storageService: StorageService) {}

  limpiarDatos() {
    const confirmar = confirm('¿Deseas eliminar todas las materias y tareas guardadas?');

    if (confirmar) {
      this.storageService.clearData();
      alert('Datos eliminados correctamente');
    }
  }
}