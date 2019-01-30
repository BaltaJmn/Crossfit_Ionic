import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-popover-foto',
  templateUrl: './popover-foto.component.html',
  styleUrls: ['./popover-foto.component.scss']
})
export class PopoverFotoComponent implements OnInit {

  subscription;

  ace: any;

  constructor(
    private popoverController: PopoverController,
    private deviceMotion: DeviceMotion,
    private toast: ToastController
  ) { }

  ngOnInit() {

    // this.deviceMotion.getCurrentAcceleration().then(
    //   (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
    //   (error: any) => console.log(error)
    // );

    // // Watch device acceleration
    // this.subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
    //   this.ace = parseInt(acceleration);
    //   this.toast.create(acceleration);
    // });

    
  }

  aceptar() {
    // Stop watch
    this.subscription.unsubscribe();
    this.popoverController.dismiss()
  }

  cancelar() {
    this.popoverController.dismiss()
  }

}
