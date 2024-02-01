import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import * as Notiflix from 'notiflix';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario:any;
  public pass:any;

  constructor(
    private authService: AuthService,
    public storageService: StorageService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.limpInput();
  }

  limpInput(){
    this.usuario = '';
    this.pass = '';

  }

  login(){
    
    if(this.usuario == ''){
      Notiflix.Notify.warning('Digite el usuario '+ this.usuario );
    }else if(this.pass == ''){
      Notiflix.Notify.warning('Digite la contraseña');
    }else{
      Notiflix.Loading.arrows();

      this.authService.login({"log_usuario":this.usuario,"log_clave":this.pass}).subscribe( (res:any) => {
          
        
        this.storageService.store(AuthConstants.AUTH, res.userToken);
        this.storageService.store(AuthConstants.USER, res.data_user.user);

     

        Notiflix.Loading.remove();
        this.router.navigate(['dashboard']);
    
      },(error: any) => {
        const { message } = error.error;
          if(message=='User/Password Error'){
            Notiflix.Report.warning('Error', message, 'Aceptar');
          }else{
            Notiflix.Report.warning('Error', message, 'Aceptar');
          }
       
        Notiflix.Loading.remove();
      });

    }

  }

}
