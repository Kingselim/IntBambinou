package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Babysitting;
import java.util.List;
import java.util.Optional;
@Repository
public interface BabysittingRepository extends JpaRepository<Babysitting, Long> {


}
