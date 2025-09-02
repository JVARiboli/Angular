import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ProdutoModel } from '../../model/produto-model';
import { ProdutoService } from '../../services/produto-service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './produto-component.html',
  styleUrl: './produto-component.css'
})
export class ProdutoComponent implements OnInit, AfterViewInit {
  produtos: ProdutoModel[] = [];
  produtoAtual: Omit<ProdutoModel, 'id'> & { id?: string } = this.resetarFormulario();
  modoEdicao = false;
  @ViewChild('produtoModal') produtoModalRef!: ElementRef;
  modalInstance: any;
  constructor(private produtoService: ProdutoService) { }
  
  ngOnInit(){
    this.carregarProdutos();
  }

  ngAfterViewInit(){
    if (this.produtoModalRef) {
      this.modalInstance = new Modal(this.produtoModalRef.nativeElement);
    }
  }

  carregarProdutos(){
    this.produtoService.listar().subscribe(data => {
      this.produtos = data;
    });
  }

  abrirModal(produto?: ProdutoModel){
    if (produto) {
      this.modoEdicao = true;
      this.produtoAtual = { ...produto };
    } else {
      this.modoEdicao = false;
      this.produtoAtual = this.resetarFormulario();
    }
    this.modalInstance.show();
  }

  fecharModal(){
    this.modalInstance.hide();
  }

  salvarProduto(){
    const { id, ...dadosProduto } = this.produtoAtual;

    const operacao = (this.modoEdicao && id)
      ? this.produtoService.atualizar(id, dadosProduto)
      : this.produtoService.salvar(dadosProduto);

    operacao.subscribe(() => {
      this.carregarProdutos();
      this.fecharModal();
    });
  }

  apagarProduto(id: string){
    if (confirm('Tem certeza que deseja apagar este produto? A ação não pode ser desfeita.')) {
      this.produtoService.apagar(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }

  private resetarFormulario(): Omit<ProdutoModel, 'id'> & { id?: string } {
    return {
      nome: '',
      descricao: '',
      preco: 0,
      quantidade: 0
    };
  }
}