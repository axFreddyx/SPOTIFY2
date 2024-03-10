import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'reproductor',
    loadComponent: () => import('./pages/reproductor/reproductor.page').then( m => m.ReproductorPage)
  },
  {
    path: 'reproductor/:id',
    loadComponent: () => import('./pages/reproductor/reproductor.page').then( m => m.ReproductorPage)
  },
  {
    path: 'perfiles',
    loadComponent: () => import('./pages/perfiles/perfiles.page').then( m => m.PerfilesPage)
  },
  {
    path: 'perfiles/:id',
    loadComponent: () => import('./pages/perfiles/perfiles.page').then( m => m.PerfilesPage)
  },
  {
    path: 'albums',
    loadComponent: () => import('./pages/albums/albums.page').then( m => m.AlbumsPage)
  },
  {
    path: 'songs',
    loadComponent: () => import('./pages/songs/songs.page').then( m => m.SongsPage)
  },
  {
    path: 'songs/:m',
    loadComponent: () => import('./pages/songs/songs.page').then( m => m.SongsPage)
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/songs/create/create.page').then( m => m.CreatePage)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.page').then( m => m.UsersPage)
  },
  {
    path: 'artists',
    loadComponent: () => import('./pages/artists/artists.page').then( m => m.ArtistsPage)
  },
  {
    path: 'update',
    loadComponent: () => import('./pages/songs/update/update.page').then( m => m.UpdatePage)
  },
  {
    path: 'update/:id',
    loadComponent: () => import('./pages/songs/update/update.page').then( m => m.UpdatePage)
  },
  {
    path: 'albums/create',
    loadComponent: () => import('./pages/albums/create/create.page').then( m => m.CreatePage)
  },
  {
    path: 'albums/update/:id',
    loadComponent: () => import('./pages/albums/update/update.page').then( m => m.UpdatePage)
  },
  {
    path: 'albums/update',
    loadComponent: () => import('./pages/albums/update/update.page').then( m => m.UpdatePage)
  },
  {
    path: 'album',
    loadComponent: () => import('./pages/albums/album/album.page').then( m => m.AlbumPage)
  },
  {
    path: 'album/:id',
    loadComponent: () => import('./pages/albums/album/album.page').then( m => m.AlbumPage)
  },
  {
    path: 'users/update',
    loadComponent: () => import('./pages/users/update/update.page').then( m => m.UpdatePage)
  },
  {
    path: 'users/update/:id',
    loadComponent: () => import('./pages/users/update/update.page').then( m => m.UpdatePage)
  },
  
];
