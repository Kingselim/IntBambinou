package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Post;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    //List<Post> findByIdNutrition(Long idNutrition);
    List<Post> findByNutrition_IdNutrition(Long idNutrition);


}