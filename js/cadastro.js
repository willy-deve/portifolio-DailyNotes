let inputEmail = document.getElementById('input-email');
let inputSenha = document.getElementById('input-senha');
let inputRepeteSenha = document.getElementById('input-repete-senha');
let btnCadastro = document.getElementById('cadastro');
let login = document.getElementById('login');
let formulario = document.getElementById('form-cadastro');

formulario.addEventListener('submit', (e) => {
  e.preventDefault()

  cadastroUsuario();
})

let listaUsuarios = buscarNoStorage();

function cadastroUsuario() {

  let email = inputEmail.value;
  let senha = inputSenha.value;
  let repeteSenha = inputRepeteSenha.value;

  if (senha != repeteSenha) {
    alert('As senhas não sao iguas')
    limparCampos();
    return;

  }

  let existe = listaUsuarios.some((usuario) => usuario.email === email);

  if (existe) {
    alert('Esse email ja esta cadastrado')
    limparCampos();
    return;

  }

  let usuarios = {
    email,
    senha
  }

  listaUsuarios.push(usuarios)
  salvarNoStorage(listaUsuarios);
  console.log(listaUsuarios);
  limparCampos();
  setTimeout(() => {
    window.location.href = 'login.html'
  }, 1500)


}

//STORAGE

function salvarNoStorage(lista) {
  localStorage.setItem('setUsuario', JSON.stringify(lista))
}

function buscarNoStorage() {
  let listaUsuariosStorage = JSON.parse(localStorage.getItem('setUsuario')) || [];
  return listaUsuariosStorage;
}



//FUNÇÔES AUXILIARES

function limparCampos() {
  inputEmail.value = '';
  inputSenha.value = '';
  inputRepeteSenha.value = '';
}


