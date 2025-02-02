let email = document.getElementById('input-email');
let senha = document.getElementById('input-senha');
let btnLogin = document.getElementById('login');
let btnCadastro = document.getElementById('cadastro');
let formulario = document.getElementById('form-login');
let vaiParaCadastro = document.getElementById('cadastro');




formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  login();

})



function login() {

  let listaUsuario = buscarUsuarioNoStorage();

  let usuarioEncontrado = listaUsuario.findIndex((usuario) => {
    if (usuario.email == email.value) {

      let senhaDescriptografada = CryptoJS.TripleDES.decrypt(usuario.senha, 'hash12345').toString(CryptoJS.enc.Utf8);
      return senhaDescriptografada === senha.value;
    }
  });

  if (usuarioEncontrado !== -1) {
    sessionStorage.setItem('usuarioLogado', usuarioEncontrado);
    window.location.href = "recados.html";
  } else {
    limparCampos();
    alert('Dados incorretos')
  }
}

vaiParaCadastro.addEventListener('click', irParaCadastro);

function irParaCadastro() {
  window.location.href = 'cadastro.html'
}

function limparCampos() {
  email.value = '';
  senha.value = '';
}


function buscarUsuarioNoStorage() {
  return JSON.parse(localStorage.getItem('setUsuario')) || [];
}
