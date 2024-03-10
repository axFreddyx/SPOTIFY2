import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreatePage implements OnInit {

  constructor(
    private api: ApiService,
    private storage: Storage
  ) { }

  artists: any[] = [];
  data = {
    title:"",
    description:"",
    year:"",
    artist_id:0
  };

  ngOnInit() {
    this.getArtist();
  }

  async getArtist() {
    const token = await this.storage.get("token");
    // this.storage.remove("token")
    this.api.getArtists(token).subscribe({
      next:(res:any) => {
        const data = res.data;
        this.artists.push(...data);
      },
      error:(err:any) => {
        console.log(err);
      }
    });
  }

  async createAlbum(){
    const token = await this.storage.get("token");
    const data = this.data;
    const album = [
      data
    ]
    console.log(album);
    this.api.createAlbums(album, token).subscribe({
      next:(res:any) => {
        console.log(res);
      },
      error:(err: any) => {
        console.log(err);
      }
    });
  }
}
