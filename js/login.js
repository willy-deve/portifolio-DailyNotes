let email = document.getElementById('input-email');
let senha = document.getElementById('input-senha');
let btnLogin = document.getElementById('login');
let btnCadastro = document.getElementById('cadastro');
let formulario = document.getElementById('form-login');



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
    alert('Dados incorretos')
  }


}


function buscarUsuarioNoStorage() {
  return JSON.parse(localStorage.getItem('setUsuario')) || [];
}
