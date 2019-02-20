import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})

export class ToastModule {

    toast;
    constructor(private toastCtrl: ToastController) { }


    /**
     * Muestra el mensaje del toast
     * @param msg Pasamos por parámetro el mensaje que se muestra en el toast
     */
    async show(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            showCloseButton: true,
            position: 'bottom',
            closeButtonText: 'Ok',
            duration: 5000
        });
        toast.present();
    }

    /**
     * Muestra el toast en la parte superior de la pantalla
     * @param msg Pasamos por parámetro el mensaje que se muestra en el toast
     * @param time Pasamos por parámetro el tiempo que va a estar en pantalla el toast
     */
    async showTop(msg, time?) {
        if (this.toast)
            this.toast.dismiss();
        if (!time) {
            this.toast = await this.toastCtrl.create({
                message: msg,
                showCloseButton: true,
                position: 'top',
                closeButtonText: 'Ok',
            });
            this.toast.present();
        } else {
            this.toast = await this.toastCtrl.create({
                message: msg,
                showCloseButton: false,
                position: 'top',
                closeButtonText: 'Ok',
                duration: time
            });
            this.toast.present();
        }

    }

    /**
     * Muestra el toast en la pantalla 
     * @param msg Pasamos por parámetro el mensaje que se muestra en el toast
     * @param time Pasamos por parámetro el tiempo que va a estar en pantalla el toast
     */
    mostrarToast(msg, time) {
        setTimeout(() => {
            this.show(msg);
        }, time);
    }

}

