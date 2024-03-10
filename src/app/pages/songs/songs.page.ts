import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AppModule } from 'src/app/modules/app/app.module';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.page.html',
  styleUrls: ['./songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppModule]
})
export class SongsPage implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage,
    private router: Router
  ) { }

  song: any[] = [];

  ngOnInit() {
    this.getSongs();
    
  }

  async getSongs(){
    try {
      const token = await this.storage.get("token");
      this.api.getSongs(token).subscribe({
        next: (res:any) => {
          const data = res.data;
          this.song.push(...data);
        },
        error: (err:any) => {
          console.log(err);
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  update(id:any){
    this.router.navigateByUrl(`/update/?id=${id}`);
  }

  async delete(id:number){
    const token = await this.storage.get("token");
    this.api.deleteSong(id, token).subscribe({
      next:(res:any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

}
