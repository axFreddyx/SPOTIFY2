import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { AppModule } from 'src/app/modules/app/app.module';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppModule]
})
export class AlbumsPage implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getAlbums();
  }

  albums: any[] = [];

  async getAlbums(){
    try {
      const token =  await this.storage.get("token");
      this.api.getAlbums(token).subscribe({
        next:(res:any) => {
          console.log(res.data);
          this.albums.push(...res.data);
        },
        error: (err:any) => {
          console.log(err)
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  update(id:number){
    this.router.navigateByUrl(`albums/update/?id=${id}`);
  }

  album(id:any){
    console.log(id);
    this.router.navigateByUrl(`album/?id=${id}`);
  }
}
