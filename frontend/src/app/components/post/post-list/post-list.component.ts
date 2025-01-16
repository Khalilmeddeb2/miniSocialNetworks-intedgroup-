import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/_services/comment.service';
import { PostService } from 'src/app/_services/post.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postsList : any
  commentsByPost: { [key: string]: any[] } = {};
  postForm: FormGroup;
  isSubmitting: boolean = false;
  activeCommentPostId: string | null = null;
  newComment: string = '';
  curentUser :any

  constructor(private postService : PostService ,
               private fb: FormBuilder ,
               private commentService: CommentService,
               private userService :UserService) { }

  ngOnInit(): void {
    this.curentUser = localStorage.getItem('user')
    this.curentUser = JSON.parse(this.curentUser);
    this.getPosts()

    this.postForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  getPosts() {
    this.postService.getAllPosts().subscribe(data => {
    this.postsList = data;   
    this.postsList.forEach((post) => {
      this.getCommentsForPost(post._id);
    });   
    });
  }


  getCommentsForPost(postId: string) {
    this.commentService.getCommentsByPost(postId).subscribe((comments: any[]) => {
      this.commentsByPost[postId] = comments;
    });
  }
  

  createPost(): void {
    if (this.postForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.postService.createPost(this.postForm.value).subscribe(
      (data: any) => {
        this.postsList.unshift(data);
        this.postForm.reset();
        this.isSubmitting = false;
        const closeButton = document.querySelector('.close') as HTMLElement;
        if (closeButton) {
          closeButton.click();
        }
      },
      (error) => {
        console.error('Erreur lors de la création du post :', error);
        this.isSubmitting = false;
      }
    );
  }

addComment(postId: string) {
  let comment = {
    user: {
      firstName: this.curentUser.firstName,
      lastName: this.curentUser.lastName,
    },
    message: this.newComment,
    createdAt: new Date(),
  };
  if (!this.commentsByPost[postId]) {
    this.commentsByPost[postId] = [];
  }
  this.commentsByPost[postId].unshift(comment);
  this.newComment = '';
  this.activeCommentPostId = null;
  this.commentService.addComment(postId, comment).subscribe(() => {
  });
}

  toggleCommentInput(postId: string) {
    this.activeCommentPostId = this.activeCommentPostId === postId ? null : postId;
    this.newComment = '';
  }

 likePost(postId){
  this.postService.likePost(postId).subscribe((post :any) => {
    const index = this.postsList.findIndex(p => p._id === postId)
    this.postsList[index].likes = post.likes
  }); 
 }

 isLikedByUser(post :any){
  let userId= localStorage.getItem('user')
  return post.likes.indexOf(userId) > -1 ;
 }

 logout(){
  this.userService.logout()
 }
}
