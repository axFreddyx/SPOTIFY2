import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ApiService } from 'src/app/services/api.service';
import { AppModule } from 'src/app/modules/app/app.module';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.page.html',
  styleUrls: ['./perfiles.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppModule]
})
export class PerfilesPage implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    private storage: Storage
  ) { }

  user: any[] = [];

  ngOnInit() {
    this.getUser();
  }

  async getUser(){
    try {
      const token = await this.storage.get("token");
      this.api.getUsersById(token).subscribe({
        next: (res: any) => {
          const data = res.data;
          console.log(data)
          const url = window.location.href;
          console.log(url);
          this.user.push(...data);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  perfil(id:any){
    console.log(id);
    this.router.navigateByUrl(`/perfiles/${id}`);
  }

}
