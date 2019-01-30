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

    mostrarToast(msg, time) {
        setTimeout(() => {
            this.show(msg);
        }, time);
    }

}

