import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppModule } from 'src/app/modules/app/app.module';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppModule]
})
export class UsersPage implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage,
  ) { }

  users:any[] = [];

  ngOnInit() {
    this.getUsers();
  }

  async getUsers(){
    const token = await this.storage.get("token");

    this.api.getUsers(token).subscribe({
      next:(res:any) =>{
        const data = res.data;
        this.users.push(...data);
        console.log(this.users);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }

  update(id:any){
    
  }

  delete(id:any){

  }

}
