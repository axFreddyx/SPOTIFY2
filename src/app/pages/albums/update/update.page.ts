import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdatePage implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private storage: Storage
  ) { }

    artists: any[] = [];
    album: any[] = [];
    data = {
      title:"",
      description:"",
      year: "",
      artist_id:""
    }
    fileToUpload: File | any;

  ngOnInit() {
    this.getALbum();
    this.getArtist();
    this.mostrarNameFile();
  }

  clic(){
   

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

  async getALbum(){
    const token = await this.storage.get("token")

    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");

    this.api.getAlbumsById(id, token).subscribe({
      next:(res:any) => {
        const data = res.data[0];
        this.album.push(data);

        const datas = this.data;

        datas.title = data.title;
        datas.description = data.description;
        datas.year = data.year;
        datas.artist_id = data.artist_id;
      },
      error:(err:any) => {
        console.log(err);
      }
    });

  }
  async updateAlbum(file:File) {
    const token = await this.storage.get("token");
    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");
  
    const updatedAlbum = [{
      title: this.data.title,
      description: this.data.description,
      image: file,
      year: this.data.year,
      artist_id: this.data.artist_id
    }];
  
    this.api.updateAlbum(id,token, updatedAlbum).subscribe({
      next: (res: any) => {
        console.log("Álbum actualizado correctamente:", res);
      },
      error: (err: any) => {
        console.error("Error al actualizar el álbum:", err);
      }
    });
  }
  
  mostrarNameFile(){
    const archivo: any = document.querySelector('input[type="file"]');
    const nombre: any = document.querySelector('#nombre');
    
    archivo.addEventListener('change', () => {
      console.log(archivo.files[0].name);
        nombre.textContent = archivo.files[0].name;
    });
  }
  
  async uploadImage(event:any){
    const token = await this.storage.get("token");

    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");

    const path:any = "/albums/image";
    const file:any = event.target.files[0];

    console.log(file);
    this.api.uploadFile(token, path, file, id).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    });
  }

}
