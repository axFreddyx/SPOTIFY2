import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController
  ) { }

    user:any[] = [];

  ngOnInit() {
    this.getUser();
  }

  async getUser(){
    try {
      const token = await this.storage.get("token");
      if(token){
        this.api.getUsersById(token).subscribe({
          next: (res: any) => {
            const data = res.data;
            this.user.push(...data);
            console.log(this.user);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      }else{
        this.router.navigateByUrl("/login");
        this.presentToast("middle","Tienes que iniciar Sesión", "warning", 'close-circle-outline');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, color: string = "success", icon:string = "checkmark-circle-outline") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color,
      mode: "ios",
      icon: icon
    });

    await toast.present();
  }

  perfil(id:any){
    console.log(id);
    this.router.navigateByUrl(`/perfiles/${id}`);
  }

  page(page:string){
    this.router.navigateByUrl(`/${page}`);
  }

  async logout(){
    await this.storage.remove("token");
    this.router.navigateByUrl('/login');
  }
}
