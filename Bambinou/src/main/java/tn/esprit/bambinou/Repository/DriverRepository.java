package tn.esprit.bambinou.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.bambinou.Entity.Driver;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
}