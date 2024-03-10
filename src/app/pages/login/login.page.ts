import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(
    private api:ApiService, 
    private toastController: ToastController, 
    private storage: Storage,
    private router: Router
  ) { 
    addIcons({checkmarkCircleOutline, closeCircleOutline});
    this.storage.create();
  }

  ngOnInit() {
  }

  username = "";
  password = "";

  login(){
    if(this.username !== "" && this.password !== ""){
      this.api.login(this.username, this.password).subscribe({
        next: (res:any) => {
          const token = res.token;
          const message = res.message;
          if(token){
            const storage = this.storage;
            storage.set('token', token);
            this.presentToast("top", message);
            setTimeout(()=>{
              this.router.navigateByUrl('/home');
            },
            500
            );
          }else{
            this.presentToast("top", message, "warning", 'close-circle-outline');
          }
        },
        error:(err:any) => {
          console.log(err);
        }
      });
    }else{
      this.presentToast("top", "Todos los cam4pos son obligatorios", "warning", 'close-circle-outline');
    }
  }

  register(){
    console.log("Redirigiendo a la pagina de registros...");
    this.router.navigateByUrl(`/register`);
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

}
