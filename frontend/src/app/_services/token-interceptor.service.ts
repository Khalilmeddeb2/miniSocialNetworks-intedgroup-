import { HttpInterceptor } from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector :Injector) { }

  intercept(req ,next ) {
  let userservice = this.injector.get(UserService)
  let tokenzedReq =req.clone({
    setHeaders: {
      Authorization : `Bearer ${userservice.getToken()}`
    }
  })
  return next.handle(tokenzedReq)
  }
 
}
 