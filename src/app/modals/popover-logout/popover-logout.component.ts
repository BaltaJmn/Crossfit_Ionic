import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-logout',
  templateUrl: './popover-logout.component.html',
  styleUrls: ['./popover-logout.component.scss']
})
export class PopoverLogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
  }

  /**
   * Cierra la sesión del usuario
   */
  aceptar() {
    this.authService.logOut();
    this.popoverController.dismiss()
  }

  /**
   * Cierra el popover
   */
  cancelar() {
    this.popoverController.dismiss()
  }

}
