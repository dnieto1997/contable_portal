import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public items: any = [];
  public nomUsuario: string = '';
  public tipo: any;
  public pais: string = '';
  public tokenaliado: string = '';
  public merchantid: any;
  private _country: BehaviorSubject<string[]>;

  constructor(
    public authService: AuthService,
  ) {
    this._country = new BehaviorSubject<string[]>([]);
   }

  get _countries() {
    return this._country.asObservable();
  }

  async viewCountry(){
    const existCountry:any = await this.apiCountry();
    this._country.next(existCountry);
  }

  async apiCountry() {
    return new Promise( (resolve, reject) => {
      this.authService.viewmenu(0).subscribe( (res:any) => {
        const {pais,tipo,usuario,status} = res;
        resolve({pais,tipo,usuario,status});
      })
    });
  }

  async mostrarmenu() {

    await this.authService.viewmenu(0).subscribe((res: any) => {

      const { result, tipo, usuario, pais, tokenaliado, merchantid } = res;
      this.tipo = tipo;
      this.pais = pais;
      this.nomUsuario = usuario;
      this.tokenaliado = tokenaliado;
      this.merchantid = merchantid;
      localStorage.setItem('name', usuario);
      let newArr: any = [];
      let i = 0;

      result.forEach((element: any) => {

        let arr = JSON.parse(element.roles);



        if (arr.includes(tipo)) {


          if (result[i].tipo == 1) {


            if (
              (pais == 2 && result[i].menu == "transactions") ||
              (pais == 2 && result[i].menu == "usuarios") ||
              (pais == 2 && result[i].menu == "conciliacion") ||
              (pais == 2 && result[i].menu == "toppaynequi") ||
              (pais == 1 && result[i].menu == "Payoutperu") ||
              (pais == 2 && result[i].menu == "listanegra")
            ) {
              /*  console.log('entr1'+result[i].alias+ ' '+pais+' '+result[i].menu) */
            } else {

            
              newArr.push({ label: result[i].alias, icon: 'pi pi-angle-right', "routerLink": '/' + result[i].menu })

            }
          }

        }
        i++;

      });

      if(merchantid == 41){
        newArr.push({ label: 'Link de pago', icon:"pi pi-angle-right", "routerLink": "/linkpago"})
      }

      this.items = newArr;


    }, (error: any) => {
      const { msg, status } = error.error;
      return error;
    });
  }

}
