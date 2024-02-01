import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AuthConstants } from 'src/app/config/auth-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public user:any;

  constructor( public storageService: StorageService) {

    
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

 

}
