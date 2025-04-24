package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Post;
import tn.esprit.bambinou.Repository.PostRepository;
import java.util.List;

@Service
@AllArgsConstructor
public class PostServiceImpl implements IPostService {
    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> retrieveAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post retrievePost(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    @Override
    public Post addPost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public void removePost(Long id) {
        postRepository.deleteById(id);
    }

    @Override
    public Post modifyPost(Post post) {
        return postRepository.save(post);
    }

//    @Override
//    public List<Post> getPostsByNutrition(Long idNutrition) {
//        return postRepository.findByIdNutrition(idNutrition);
//    }
}
