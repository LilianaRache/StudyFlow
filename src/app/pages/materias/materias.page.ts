import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink, RouterLinkActive]
})
export class MateriasPage implements OnInit {

  materias: any[] = [];
  nuevaMateria = '';
  editandoIndex: number | null = null;
  errorMateria = false;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materias = this.storageService.getMaterias();
  }

  agregarMateria() {
    if (!this.nuevaMateria.trim()) {
      this.errorMateria = true;
      return;
    }

    this.errorMateria = false;

    if (this.editandoIndex !== null) {
      const nombreAnterior = this.materias[this.editandoIndex].nombre;
      const nombreNuevo = this.nuevaMateria.trim();

      this.materias[this.editandoIndex].nombre = nombreNuevo;
      this.storageService.saveMaterias(this.materias);

      const tareas = this.storageService.getTareas();
      tareas.forEach((t: any) => {
        if (t.materia === nombreAnterior) {
          t.materia = nombreNuevo;
        }
      });
      this.storageService.saveTareas(tareas);

      this.editandoIndex = null;
    } else {
      this.storageService.addMateria({
        nombre: this.nuevaMateria.trim(),
        tareas: 0
      });
    }

    this.nuevaMateria = '';
    this.cargarMaterias();
  }

  editarMateria(index: number) {
    this.nuevaMateria = this.materias[index].nombre;
    this.editandoIndex = index;
  }

  eliminarMateria(index: number) {
    if (confirm('¿Eliminar esta materia?')) {
      this.materias.splice(index, 1);
      this.storageService.saveMaterias(this.materias);
    }
  }

  contarTareasMateria(nombreMateria: string): number {
    const tareas: any[] = this.storageService.getTareas();
    return tareas.filter((t: any) => t.materia === nombreMateria).length;
  }
}