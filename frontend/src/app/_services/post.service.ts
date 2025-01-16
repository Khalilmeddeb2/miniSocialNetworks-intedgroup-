import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    private _postUrl=`${environment.baseUrl}/posts`
    constructor(private http: HttpClient) { }

      getAllPosts() :Observable <any> {
        return this.http.get(`${this._postUrl}`);
        }
   
      createPost(post: any):Observable<Object> {
          return this.http.post(`${this._postUrl}`,post);
      }

      likePost(id:string):Observable<Object> {
        return this.http.put(`${this._postUrl}/like/${id}`,{});
      }
        
}
