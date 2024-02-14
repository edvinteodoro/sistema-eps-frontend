import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService:StorageService, private router:Router){

  }
  canActivate(){
    if(this.storageService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }
    
  }
  
}
