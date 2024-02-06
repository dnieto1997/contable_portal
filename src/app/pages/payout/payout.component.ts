import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as Notiflix from 'notiflix';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.scss']
})
export class PayoutComponent {

  public fecha: any = dayjs().format('YYYY-MM-DD');
  public document: any;
  public typedocument = [];
  public table: any = [];
  public cuenta: any;

  constructor(
    private authService: AuthService,
    public storageService: StorageService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.typeDocument();


  }


  Buscar() {

    if (this.fecha == '') {
      Notiflix.Notify.warning('Digite la fecha ' + this.fecha);
    } else {
      Notiflix.Loading.arrows();

      this.authService.payout({ "initialdate": this.fecha, "finaldate": this.fecha }).subscribe((res: any) => {

        this.table = res;


        Notiflix.Loading.remove();


      }, (error: any) => {
        const { message, statusCode } = error.error;

        Notiflix.Report.warning('Error', message, 'Aceptar');
        Notiflix.Loading.remove();

        if (statusCode == 401 && message == 'Unauthorized') {
          this.router.navigate(['login']);
        }
      });

    }

  }




  Enviar() {

    if (!this.document) {
      Notiflix.Notify.warning('Digite el tipo de comprobante ');

    } else if (!this.fecha) {
      Notiflix.Notify.warning('Digite la fecha ');
    } else if (this.table.length === 0) {
      Notiflix.Report.warning('Error', 'No hay datos en la tabla', 'Aceptar');
    }
    else {


      Notiflix.Confirm.show(
        'Message Confirm',
        'Deseas agregar valores a Siigo?',
        'Yes',
        'No',
        () => {

          Notiflix.Loading.arrows();

          this.authService.credito({ "array": this.table, "fecha": this.fecha, "documentid": this.document, "cuentacontable": this.cuenta }).subscribe((res: any) => {
            const { result, message, status } = res



            Notiflix.Report.success('Success', message, 'Aceptar');
            Notiflix.Loading.remove();
            if (status === 201) {
              this.table = []
            }



          }, (error: any) => {
            const { message, statusCode } = error.error;

            Notiflix.Report.warning('Error', message, 'Aceptar');
            Notiflix.Loading.remove();

          });

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


  Moneda(valor: number): string {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });

    return formatter.format(valor);
  }

  eliminarMovimiento(movimiento: any) {
    const index = this.table.indexOf(movimiento);
    if (index !== -1) {
      this.table.splice(index, 1);
    }

  }


  typeDocument() {
    this.authService.typedocument(0).subscribe(
      (res: any) => {

        this.typedocument = res;
      },
      (error: any) => {
        const { msg, status } = error.error;

        Notiflix.Report.warning('Error', msg, 'Aceptar');

        if (status == 0) {
          this.authService.close();
        }
      }
    );


  }

}
