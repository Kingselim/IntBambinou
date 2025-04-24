package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Post;
import java.util.List;

public interface IPostService {
    public List<Post> retrieveAllPosts();
    public Post retrievePost(Long id);
    public Post addPost(Post post);
    public void removePost(Long id);
    public Post modifyPost(Post post);
    //List<Post> getPostsByNutrition(Long idNutrition);
}
