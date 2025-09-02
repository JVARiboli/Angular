import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { LojaModel } from '../../model/loja-model';
import { LojaService } from '../../services/loja-service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-loja-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './loja-component.html',
  styleUrl: './loja-component.css'
})
export class LojaComponent implements OnInit, AfterViewInit {
  lojas: LojaModel[] = [];
  lojaAtual: Omit<LojaModel, 'id'> & { id?: string } = this.resetarFormulario();
  modoEdicao = false;
  
  @ViewChild('lojaModal') lojaModalRef!: ElementRef;
  modalInstance: any;

  constructor(private lojaService: LojaService) { }
  
  ngOnInit(){
    this.carregarLojas();
  }

  ngAfterViewInit(){
    if (this.lojaModalRef) {
      this.modalInstance = new Modal(this.lojaModalRef.nativeElement);
    }
  }

  carregarLojas(){
    this.lojaService.listar().subscribe(data => {
      this.lojas = data;
    });
  }

  abrirModal(loja?: LojaModel){
    if (loja) {
      this.modoEdicao = true;
      this.lojaAtual = { ...loja };
    } else {
      this.modoEdicao = false;
      this.lojaAtual = this.resetarFormulario();
    }
    this.modalInstance.show();
  }

  fecharModal(){
    this.modalInstance.hide();
  }

  salvarLoja(){
    const { id, ...dadosLoja } = this.lojaAtual;
    const operacao = (this.modoEdicao && id)
      ? this.lojaService.atualizar(id, dadosLoja)
      : this.lojaService.salvar(dadosLoja);

    operacao.subscribe(() => {
      this.carregarLojas();
      this.fecharModal();
    });
  }

  apagarLoja(id: string){
    if (confirm('Tem certeza que deseja apagar esta loja? A ação não pode ser desfeita.')) {
      this.lojaService.apagar(id).subscribe(() => {
        this.carregarLojas();
      });
    }
  }

  private resetarFormulario(): Omit<LojaModel, 'id'> & { id?: string } {
    return {
      nome: '',
      descricao: '',
      cnpj: ''
    };
  }
}
