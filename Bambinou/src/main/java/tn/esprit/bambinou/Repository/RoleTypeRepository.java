package tn.esprit.bambinou.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.RoleType;

@Repository
public interface RoleTypeRepository extends JpaRepository<RoleType, Long> {
}
