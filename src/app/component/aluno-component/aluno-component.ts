import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AlunoModel } from '../../models/aluno-model';
import { AlunoService } from '../../services/aluno-service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-aluno-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './aluno-component.html',
  styleUrls: ['./aluno-component.css']
})
export class AlunoComponent implements OnInit, AfterViewInit {
  alunos: AlunoModel[] = [];
  alunoAtual: Omit<AlunoModel, 'id'> & { id?: string } = this.resetarFormulario();
  modoEdicao = false;

  @ViewChild('alunoModal') alunoModalRef!: ElementRef;
  modalInstance: any;

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {
    this.carregarAlunos();
  }

  ngAfterViewInit() {
    if (this.alunoModalRef) {
      this.modalInstance = new Modal(this.alunoModalRef.nativeElement);
    }
  }

  carregarAlunos() {
    this.alunoService.listar().subscribe({
      next: (data) => {
        this.alunos = data;
      },
      error: (err) => console.error(err)
    });
  }

  abrirModal(aluno?: AlunoModel) {
    if (aluno) {
      this.modoEdicao = true;
      this.alunoAtual = { ...aluno };
    } else {
      this.modoEdicao = false;
      this.alunoAtual = this.resetarFormulario();
    }
    this.modalInstance.show();
  }

  fecharModal() {
    this.modalInstance.hide();
  }

  salvar() {
    const { id, ...dadosAluno } = this.alunoAtual;
    const operacao = (this.modoEdicao && id)
      ? this.alunoService.editar(id, dadosAluno)
      : this.alunoService.salvar(dadosAluno);

    operacao.subscribe({
      next: () => {
        this.carregarAlunos();
        this.fecharModal();
      },
      error: (err) => console.error(err)
    });
  }

  apagar(id: string) {
    if (!id) {
      console.error('ID do aluno é indefinido');
      return;
    }
    if (confirm('Deseja realmente apagar este aluno?')) {
      this.alunoService.apagar(id).subscribe({
        next: () => {
          this.carregarAlunos();
        },
        error: (err) => {
          console.error('Erro ao apagar aluno:', err);
        }
      });
    }
  }


  private resetarFormulario(): Omit<AlunoModel, 'id'> & { id?: string } {
    return {
      nome: '',
      curso: '',
      telefone: ''
    };
  }
}
