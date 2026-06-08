import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage),
  },
  {
    path: 'materias',
    loadComponent: () =>
      import('./pages/materias/materias.page').then(m => m.MateriasPage),
  },
  {
    path: 'tareas',
    loadComponent: () =>
      import('./pages/tareas/tareas.page').then(m => m.TareasPage),
  },
  {
    path: 'crear-tarea',
    loadComponent: () =>
      import('./pages/crear-tarea/crear-tarea.page').then(m => m.CrearTareaPage),
  },
  {
    path: 'calendario',
    loadComponent: () =>
      import('./pages/calendario/calendario.page').then(m => m.CalendarioPage),
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./pages/estadisticas/estadisticas.page').then(m => m.EstadisticasPage),
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./pages/configuracion/configuracion.page').then(m => m.ConfiguracionPage),
  },
];