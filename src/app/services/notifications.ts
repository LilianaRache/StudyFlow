import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  async solicitarPermiso() {
    const permiso = await LocalNotifications.checkPermissions();

    if (permiso.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  async programarRecordatorio(tarea: any) {
    await this.solicitarPermiso();

    await LocalNotifications.schedule({
      notifications: [
        {
          id: tarea.id || Date.now(),
          title: 'Recordatorio StudyFlow',
          body: `Tarea pendiente: ${tarea.titulo}`,
          schedule: {
            at: new Date(Date.now() + 1000 * 10),
            allowWhileIdle: true
          }
        }
      ]
    });
  }
}