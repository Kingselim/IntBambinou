  // src/app/services/post.service.ts
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { Post } from '../app/Models/Post.Model';

  @Injectable({
    providedIn: 'root'
  })
  export class PostService {
    private apiUrl = 'http://localhost:8089/post';

    constructor(private http: HttpClient) { }

    getAllPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(`${this.apiUrl}/retrieve-all`);
    }

    getPostById(id: number): Observable<Post> {
      return this.http.get<Post>(`${this.apiUrl}/retrieve/${id}`);
    }

    addPost(post: Post): Observable<Post> {
      return this.http.post<Post>(`${this.apiUrl}/add`, post);
    }

    updatePost(post: Post): Observable<Post> {
      return this.http.put<Post>(`${this.apiUrl}/modify/${post.idPost}`, post);
    }

    deletePost(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
    }
// post.service.ts
getPostNutritionIds(): Observable<{ postId: number, nutritionId: number }[]> {
  return this.http.get<{ postId: number, nutritionId: number }[]>(
    `${this.apiUrl}/post-nutrition-mappings`
  );
}
getAvailableNutritions(): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8089/nutrition/retrieve-all`);
}

getPostsByNutritionId(nutritionId: number): Observable<Post[]> {
  return this.http.get<Post[]>(`${this.apiUrl}/by-nutrition/${nutritionId}`);
}

  }