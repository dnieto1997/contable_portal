import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';
import * as Notiflix from 'notiflix';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public user:any;
  constructor(location: Location,  private element: ElementRef, private router: Router, public storageService: StorageService,private authService: AuthService) {
    this.location = location;

    
  }

 

  ngOnInit() {
  this.canActivate()
  }

  canActivate(): Promise<boolean> {
    return new Promise(resolve =>{ 
      resolve(true);
      this.storageService.get(AuthConstants.USER).then(res =>{ 
           this.user=res
      })
      .catch(err =>{ 
        resolve(false)
      })
    })
  }

  
  logout(){

    Notiflix.Confirm.show(
      'Message Confirm',
      'Deseas salir de la sesion?',
      'Yes',
      'No',
      () => {
        
      this.authService.close();

      },
      () => {
       
      },
      {
        width: '320px',
        borderRadius: '8px',
        
      },
    );
  }


}
