package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Nutrition;
import java.util.List;
import java.util.Optional;

@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {


    Nutrition findByUser_Id(int userId);
    Optional<Nutrition> findByDescription(String description);



}

