import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post.service';
import { Post } from '../../Models/Post.Model';
import { NgForm } from '@angular/forms';


// important
declare var bootstrap: any;


@Component({
  selector: 'app-posts-b',
  templateUrl: './posts-b.component.html',
  styleUrls: ['./posts-b.component.css'
    ,"../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css"
  ]
})


export class PostsBComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  currentPost: Post = this.initEmptyPost();
  recipeTypeOptions = [
    { value: 'Plat', label: 'Plat' },
    { value: 'dessert', label: 'Dessert' }
  ];
  loading = false;
  error: string | null = null;
  isEditMode = false;
  showForm = false;
  availableNutritions: any[] = [];

  
openBootstrapModal(): void {
   
  this.initNewPost();
  const modalElement = document.getElementById('postModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}

openNewPostForm(): void {
  this.initNewPost();
  this.isEditMode = false;
  this.showForm = true;
}




  


  // Search and filter state
  searchQuery: string = '';
  filters: { [key: string]: { min: number | null, max: number | null } } = {
    nblike: { min: null, max: null },
    nbcomment: { min: null, max: null },
  };

  // Sort state
  sortColumn: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  displayedColumns: string[] = ['idPost', 'date', 'recipeType', 'recipe', 'nblike', 'nbcomment'];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadAvailableNutritions();
  }

  loadPosts(): void {
    this.loading = true;
    this.error = null;
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.applyFiltersAndSort();
        console.log('Loaded posts:', posts);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Échec du chargement des posts. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  loadAvailableNutritions(): void {
    this.postService.getAvailableNutritions().subscribe({
      next: (data) => this.availableNutritions = data,
      error: () => this.error = "Impossible de charger les nutritions disponibles."
    });
  }

  applyFiltersAndSort(): void {
    let result = [...this.posts];

    // Apply search
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(post =>
        (post.recipe?.toLowerCase().includes(query) || '') ||
        (post.recipeType?.toLowerCase().includes(query) || '')
      );
    }

    // Apply filters
    Object.keys(this.filters).forEach(key => {
      const { min, max } = this.filters[key];
      if (min !== null && min !== undefined) {
        result = result.filter(post => (post as any)[key] >= min);
      }
      if (max !== null && max !== undefined) {
        result = result.filter(post => (post as any)[key] <= max);
      }
    });

    // Apply sorting
    result.sort((a, b) => {
      const valueA = (a as any)[this.sortColumn];
      const valueB = (b as any)[this.sortColumn];
      if (this.sortColumn === 'date') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return this.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      if (typeof valueA === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    });

    this.filteredPosts = result;
    console.log('Filtered posts:', this.filteredPosts);
  }

  initEmptyPost(): Post {
    return {
      date: new Date().toISOString().slice(0, 16),
      recipeType: 'Plat',
      nutrition: null,
      nblike: 0,
      recipe: '',
      nbcomment: 0,
      nutritionDescription: ''
    };
  }

  initNewPost(): void {
    this.currentPost = this.initEmptyPost();
    this.isEditMode = false;
    this.showForm = true;
    this.error = null;
  }

  editPost(post: Post): void {
    this.currentPost = {
      ...post,
      date: new Date(post.date).toISOString().slice(0, 16)
    };
    this.isEditMode = true;
    this.showForm = true;
    console.log('Editing post:', this.currentPost);
    const modalElement = document.getElementById('postModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
  }

  savePost(form: NgForm): void {
    if (this.loading || !form.valid) return;

    // Validate recipeType
    if (!['Plat', 'dessert'].includes(this.currentPost.recipeType)) {
      this.error = 'Le type de recette doit être Plat ou dessert.';
      console.log('Invalid recipeType:', this.currentPost.recipeType);
      return;
    }

    this.loading = true;
    this.error = null;

    const postData: Post = {
      date: new Date(this.currentPost.date).toISOString(),
      recipeType: this.currentPost.recipeType,
      nutritionDescription: this.currentPost.nutritionDescription,
      nutrition: this.currentPost.nutrition ?? null,
      nblike: this.currentPost.nblike ?? 0,
      recipe: this.currentPost.recipe ?? '',
      nbcomment: this.currentPost.nbcomment ?? 0,
      ...(this.isEditMode && this.currentPost.idPost !== undefined ? { idPost: this.currentPost.idPost } : {})
    };

    console.log('Sending postData:', postData);

    if (this.isEditMode) {
      this.postService.updatePost(postData).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex((p) => p.idPost === updatedPost.idPost);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.cancelEdit();
          this.applyFiltersAndSort();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Échec de la mise à jour du post. Veuillez réessayer.';
          this.loading = false;
        }
      });
    } else {
      this.postService.addPost(postData).subscribe({
        next: (newPost) => {
          this.posts.push(newPost);
          this.cancelEdit();
          this.applyFiltersAndSort();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Échec de la création du post. Veuillez réessayer.';
          this.loading = false;
        }
      });
    }
  }

  deletePost(id: number): void {
    if (this.loading) return;

    this.loading = true;
    this.error = null;

    this.postService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.idPost !== id);
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Échec de la suppression du post. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }

  cancelEdit(): void {
    this.currentPost = this.initEmptyPost();
    this.isEditMode = false;
    this.showForm = false;
    this.error = null;
  }

  getRecipeTypeLabel(type: string): string {
    const option = this.recipeTypeOptions.find(opt => opt.value === type);
    return option ? option.label : 'Inconnu';
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onFilterChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  resetFilters(): void {
    this.searchQuery = '';
    Object.keys(this.filters).forEach(key => {
      this.filters[key] = { min: null, max: null };
    });
    this.sortColumn = 'date';
    this.sortDirection = 'desc';
    this.applyFiltersAndSort();
  }
}