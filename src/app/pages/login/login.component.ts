import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuarioLogin = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuarioLogin.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm ) {

    if (form.invalid) {
      return;
    }

    Swal.fire({
      icon: 'info',
      text: 'Espere por favor...',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    this.auth.login(this.usuarioLogin).subscribe(resp => {
      Swal.close();
      console.log(resp);
      this.router.navigateByUrl('/home');
      if (this.recordarme) {
        localStorage.setItem('email', this.usuarioLogin.email);
      }
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: err.error.error.message,
      });

    });
   }
}
