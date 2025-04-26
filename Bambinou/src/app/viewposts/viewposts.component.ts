import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../Models/Post.Model';

@Component({
  selector: 'app-viewposts',
  templateUrl: './viewposts.component.html',
  styleUrls: ['./viewposts.component.css']
})
export class ViewpostsComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = []; // Stores posts matching nutritionId
  nutritionId!: number;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nutritionId = +params['nutritionId'];
      this.loadAllPosts(); // Fetch all posts first
    });
  }

  loadAllPosts(): void {
    this.isLoading = true;
    this.error = null;

    this.postService.getAllPosts().subscribe({
      next: (allPosts) => {
        this.posts = allPosts;
        this.filterPostsByNutritionId(); // Filter after fetching
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  filterPostsByNutritionId(): void {
    this.filteredPosts = this.posts.filter(post => {
      if (!post.nutrition) return false;
      
      // Case 1: nutrition is an object with id
      if (post.nutrition.id && post.nutrition.id === this.nutritionId) return true;
      
      // Case 2: nutrition is an object with idNutrition
      if (post.nutrition.idNutrition && post.nutrition.idNutrition === this.nutritionId) return true;
      
      // Case 3: nutrition is just the ID (number)
      if (post.nutrition === this.nutritionId) return true;
      
      return false;
    });
  
    if (this.filteredPosts.length === 0) {
      console.warn('No posts matched nutritionId:', this.nutritionId);
    }
  }
}