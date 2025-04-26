package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Entity.Babysitting;

import java.util.List;

public interface BabyRepository extends JpaRepository<Baby, Long> {

    // Rechercher tous les babies par utilisateur (idUser)
    public List<Baby> findByBabysitting(Babysitting babysitting);

    List<Baby> findByUser_Id(Long id);
}
