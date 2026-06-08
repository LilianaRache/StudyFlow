import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, RouterLink]
})
export class MateriasPage implements OnInit {

  materias: any[] = [];
  nuevaMateria = '';
  editandoIndex: number | null = null;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.materias = this.storageService.getMaterias();
  }

  agregarMateria() {
    if (!this.nuevaMateria.trim()) return;

    if (this.editandoIndex !== null) {
      this.materias[this.editandoIndex].nombre = this.nuevaMateria;
      this.storageService.saveMaterias(this.materias);
      this.editandoIndex = null;
    } else {
      this.storageService.addMateria({
        nombre: this.nuevaMateria,
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
}