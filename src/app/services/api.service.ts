import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  baseUrl = environment.baseUrl;
  songs = environment.songs;
  artists = environment.artist;
  albums = environment.albums;
  users = environment.users;
  log = environment.login;
  image = environment.image;

  // GET

  getUsers(token:string) {
    return this.http.get(this.baseUrl + this.users, {headers:{'Authorization': token}});
  }
  getUsersById(token:string){
    return this.http.get(`${this.baseUrl + this.users}/me`, {headers:{'Authorization': token}});
  }
  getArtists(token:string){
    return this.http.get(this.baseUrl + this.artists, {headers:{'Authorization': token}});
  }
  getAlbums(token:string){
    return this.http.get(this.baseUrl + this.albums, {headers: {'Authorization': token}});
  }
  getAlbumsById(id:any, token:string){
    return this.http.get(`${this.baseUrl + this.albums}/${id}`, {headers: {'Authorization': token}});
  }
  getSongs(token:string){
    return this.http.get(this.baseUrl + this.songs, {headers:{'Authorization':token}});
  }
  getSongById(id:any, token:any){
    return this.http.get(`${this.baseUrl + this.songs}/${id}`, {headers:{'Authorization':token}});
  }
  getImageAlbum(image:string){
    return this.http.get(`${this.baseUrl + this.albums + this.image}/${image}`);
  }
  getSongsByAlbums(id:any,token:any){
    return this.http.get(`${this.baseUrl + this.songs}/album/${id}`, {headers: {'Authorization': token}});
  }

  // POST

  login(username:string, password:string){
    return this.http.post(this.baseUrl + this.log, {"username":username, "password":password, "token":true});
  }
  register(data:any){
    return this.http.post(this.baseUrl + this.users, data[0]);
  }
  createAlbums(data:any, token:any){
    return this.http.post(this.baseUrl + this.albums, data[0],{headers: {'Authorization': token}});
  }
  createSong(data:any, token:any){
    return this.http.post(this.baseUrl + this.songs, data[0], {headers:{'Authorization':token}});
  }

  // PUT

  updateAlbum(id:any, token:any, data:any){
    return this.http.put(`${this.baseUrl + this.albums}/${id}`, data[0], {headers: {'Authorization':token}});
  }

  // DELETE

  deleteSong(id:number, token:any){
    return this.http.delete(`${this.baseUrl + this.songs}/${id}`, {headers: {'Authorization': token}});
  }

  // UPLOADS

  uploadFile(token:string, url:string, file: File, id:any){
    if(file){
      const formData = new FormData();
      // console.log(file.name);
      formData.append('file', file, file.name);
      return this.http.post(`${this.baseUrl + url}/${id}`, formData, {headers:{'Authorization':token}});
    }else{
      return empty();
    }
  }
}
