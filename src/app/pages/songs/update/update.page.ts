import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
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
    private storage: Storage
  ) { }

    song: any[] = [];
    datas = {
      name:"",
      number:"",
      duration:"",
      file:""
    };
  
  ngOnInit() {
    this.getSongById();
    this.mostrarNameFile();
  }

  async getSongById(){
    try {
      const token = await this.storage.get("token");
      const url = window.location.href;
      const newUrl = new URL(url);
      const params = newUrl.searchParams;
      const id = params.get("id");
      this.api.getSongById(id, token).subscribe({
        next: (res:any) => {
          const data = res.data;
          this.song.push(...data);
          console.log(this.song);
          this.datas.name = this.song[0].name;
          this.datas.number = this.song[0].number;
          this.datas.duration = this.song[0].duration;
          
        },
        error:(err:any) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  mostrarNameFile(){
    const archivo: any = document.querySelector('input[type="file"]');
      console.log(archivo)
      const nombre: any = document.querySelector('#nombre');

      archivo.addEventListener('change', () => {
          nombre.textContent = archivo.files[0].name;
          console.log(nombre);
      });
  }

  async uploadFile(event:any){
    const token = await this.storage.get("token");

    const url = window.location.href;
    const newUrl = new URL(url);
    const params = newUrl.searchParams;
    const id = params.get("id");

    const path:any = "/songs/song";
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
