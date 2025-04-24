package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.bambinou.Entity.Baby;

import java.util.List;

public interface BabyRepository extends JpaRepository<Baby, Long> {

    // Rechercher tous les babies par utilisateur (idUser)

}
