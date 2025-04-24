package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Nutrition;
import java.util.List;

@Repository
public interface NutritionRepository extends JpaRepository<Nutrition, Long> {


}

