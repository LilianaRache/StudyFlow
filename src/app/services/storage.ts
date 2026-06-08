import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  // ===== MATERIAS =====

  getMaterias() {
    const materias = localStorage.getItem('materias');
    return materias ? JSON.parse(materias) : [];
  }

  saveMaterias(materias: any[]) {
    localStorage.setItem('materias', JSON.stringify(materias));
  }

  addMateria(materia: any) {
    const materias = this.getMaterias();
    materias.push(materia);
    this.saveMaterias(materias);
  }

  // ===== TAREAS =====

  getTareas() {
    const tareas = localStorage.getItem('tareas');
    return tareas ? JSON.parse(tareas) : [];
  }

  saveTareas(tareas: any[]) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  addTarea(tarea: any) {
    const tareas = this.getTareas();
    tareas.push(tarea);
    this.saveTareas(tareas);
  }

  clearData() {
    localStorage.removeItem('materias');
    localStorage.removeItem('tareas');
  }
}