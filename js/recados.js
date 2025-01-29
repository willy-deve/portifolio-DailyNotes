

//INPUTS
let formulario = document.querySelector('#form-cadastro');
let inputId = document.querySelector('#input-id');
let inputTitulo = document.querySelector('#input-titulo');
let inputDescricao = document.querySelector('#input-descricao');


//BOTÃO
let btnSalvar = document.querySelector('#btn-salvar');
let btnAtualizar = document.querySelector('#btn-atualizar');
let btnCancelar = document.querySelector('#btn-cancelar');

//TABELA
let tabela = document.querySelector('#tabela-registro');

//LISTA
let listaRecados = buscarNoStorage();

//EVENTOS
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Formulário enviado');

  adicionarNovoRegistro();


});

document.addEventListener('DOMContentLoaded', pegarDoStorage())



//FUNÇÕES
function adicionarNovoRegistro() {

  let id = inputId.value;

  let existe = listaRecados.some((recado) => recado.id == id);

  if (existe) {
    limparCampos();
    alert('ID já cadastrado');
    return;
  }


  let titulo = inputTitulo.value;
  let descricao = inputDescricao.value;


  if (id == '' || titulo == '' || descricao == '') {
    alert('Necessario preencher todos os campos');
    return;
  }

  let recados = {
    id,
    titulo,
    descricao
  }

  listaRecados.push(recados);
  console.log(listaRecados);
  limparCampos();
  salvarNaTabela(recados);
  salvarNoStorage(listaRecados);



}

function salvarNaTabela(dadosRecados) {

  let novaLinha = document.createElement('tr');
  let colunaId = document.createElement('td');
  let colunaTitulo = document.createElement('td');
  let colunaDescricao = document.createElement('td');
  let colunaAcoes = document.createElement('td');

  novaLinha.setAttribute('class', 'registros');
  novaLinha.setAttribute('id', dadosRecados.id);
  colunaId.innerHTML = dadosRecados.id;
  colunaTitulo.innerHTML = dadosRecados.titulo;
  colunaDescricao.innerHTML = dadosRecados.descricao;
  colunaAcoes.innerHTML = `
    <button class="btn-editar" onclick="editarRecado(${dadosRecados.id})">Editar</button>
    <button class="btn-apagar" onclick="apagarRecado(${dadosRecados.id})">Apagar</button>
  `

  novaLinha.appendChild(colunaId);
  novaLinha.appendChild(colunaTitulo);
  novaLinha.appendChild(colunaDescricao);
  novaLinha.appendChild(colunaAcoes);

  tabela.appendChild(novaLinha);

}

function apagarRecado(id) {

  let confirma = confirm('Deseja apagar esse recado?');

  if (confirma) {

    let index = listaRecados.findIndex((recado) => recado.id == id);

    listaRecados.splice(index, 1);

    let registro = document.getElementById(id);
    registro.remove();

    salvarNoStorage(listaRecados);

  }



}

function editarRecado(id) {

  btnSalvar.setAttribute('style', 'display: none');
  btnAtualizar.setAttribute('style', 'display: inline-block');
  btnAtualizar.setAttribute('onclick', `atualizaRecado(${id})`);


  let recado = listaRecados.find((recado) => recado.id == id);



  inputId.value = recado.id;
  inputTitulo.value = recado.titulo;
  inputDescricao.value = recado.descricao;

};

function atualizaRecado(id) {

  let idAtualizado = inputId.value;

  if (idAtualizado != id) {
    let existe = listaRecados.some((recado) => recado.id == idAtualizado);

    if (existe) {
      limparCampos();
      alert('ID já cadastrado');
      return
    }

  }

  let tituloAtualiado = inputTitulo.value;
  let descricaoAtualizado = inputDescricao.value;

  let recadoAtualizado = {
    id: idAtualizado,
    titulo: tituloAtualiado,
    descricao: descricaoAtualizado
  }


  let index = listaRecados.findIndex((recado) => recado.id == id);

  listaRecados[index] = recadoAtualizado;

  let linhasTabela = document.querySelectorAll('.registros');


  linhasTabela.forEach((linha) => {
    if (linha.id == id) {

      let colunas = linha.children;

      //equivale ao id
      colunas[0].innerHTML = recadoAtualizado.id;

      //equivale ao titulo
      colunas[1].innerHTML = recadoAtualizado.titulo;

      //equivale a descricao
      colunas[2].innerHTML = recadoAtualizado.descricao;
    }
  })

  cancelarCampos();
  salvarNoStorage(listaRecados);
}


//LocalStorage

function salvarNoStorage(lista) {
  localStorage.setItem('storageRecados', JSON.stringify(lista));
}

function buscarNoStorage() {
  let listaRecadosStorage = JSON.parse(localStorage.getItem('storageRecados')) || [];
  return listaRecadosStorage;
}


function pegarDoStorage() {
  listaRecados.forEach((recado) => {
    salvarNaTabela(recado)
  })
}




//FUNÇÔES AUXILIARES
function limparCampos() {
  inputId.value = '';
  inputTitulo.value = '';
  inputDescricao.value = '';
}

function cancelarCampos() {
  limparCampos();
  btnSalvar.setAttribute('style', 'display: block');
  btnAtualizar.setAttribute('style', 'display: none');

}

btnCancelar.addEventListener('click', cancelarCampos);