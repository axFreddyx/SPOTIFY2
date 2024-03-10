import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router'; // Agregamos ActivatedRoute

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
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute // Inyectamos ActivatedRoute
  ) { }

  data = {
    name:"",
    number:"",
    duration:"",
    album_id:""
  }

  albums:any[] = [];
  ngOnInit() {
    this.getAlbums();
  }

  async getAlbums(){
    const token = await this.storage.get("token");
    
    this.api.getAlbums(token).subscribe({
      next:(res:any)=>{
        console.log(res.data);
        const data = res.data;
        this.albums.push(...data);
      },
      error: (err:any) => {
        console.log(err)
      }
    });
  }

  async crearCancion(){
    const token = await this.storage.get("token");

    const data = [this.data];
    console.log("Datos a enviar: ",data)
    this.api.createSong(data,token).subscribe({
      next:(res:any) => {
        console.log(res);
        const message = res.message;
        // Construir la URL con el mensaje codificado
        this.router.navigateByUrl(`/songs`);
      },
      error:(err:any) => {
        console.log(err);
      }
    });
  }

}
