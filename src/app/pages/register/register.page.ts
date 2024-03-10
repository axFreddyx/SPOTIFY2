import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegisterPage implements OnInit {

  constructor(
    private api: ApiService, 
    private toastController: ToastController,
    private router:Router
  ) 
  { 
    addIcons({checkmarkCircleOutline, closeCircleOutline});
  }

  ngOnInit() {
  }

  user: any[] = [];
  data = {
    username:"",
    password:"",
    email:"",
    name:"",
  }

  register(){
    const data = this.data;
    this.user.push(data);
    const user = this.user;
    
    this.api.register(user).subscribe({
      next:(res:any) => {
        console.log(res.message)
        const message = res.message;
        this.presentToast("top", `¡${message}!, Por favor inicia sesión`);
        setTimeout(()=>{
          this.router.navigateByUrl('/login');
        }, 1500);
      },
      error: (err:any) => {
        console.log(err)
      }
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, color: string = "success", icon:string = "checkmark-circle-outline") {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
      color: color,
      mode: "ios",
      icon: icon
    });

    await toast.present();
  }

}
