import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AlbumPage implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: Storage
  ) { }

  songs:any[] = [];
  album:any[] = [];
    
  ngOnInit() {
    this.getSongByAlbum();
    this.getAlbum();
  }

  async getAlbum(){
    const token = await this.storage.get("token");
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");
    this.api.getAlbumsById(id, token).subscribe({
      next:(res:any) => {
        console.log(res.data);
        const data = res.data;
        this.album.push(...data);
      },
      error:(err:any) => {
        console.log(err)
      }
    });
  }

  async getSongByAlbum(){
    const token = await this.storage.get("token");
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");

    this.api.getSongsByAlbums(id,token).subscribe({
      next:(res:any) => {
        const data = res.data;
        this.songs.push(...data);
        console.log(this.songs)
      },
      error: (err:any) => {
        console.log(err)
      }
    });
  }

  async uploadFile(event:any, id:any){
    const token = await this.storage.get("token");

    const path:any = "/songs/song";
    const file:any = event.target.files[0];

    console.log(file);
    this.api.uploadFile(token, path, file, id).subscribe({
      next: (res:any) => {
        console.log(res);
        window.location.reload();
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

  // uploadFile(id:any){
  //   this.router.navigateByUrl(`update/?id=${id}`);
  // }

  reproductor(id:any){
    this.router.navigateByUrl(`reproductor/?id=${id}`);
  }
}
