package tn.esprit.bambinou.Service;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Driver;
import tn.esprit.bambinou.Repository.DriverRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class DriverServiceImpl implements IDriverService {
    @Autowired
    private DriverRepository driverRepository;

    @Override
    public List<Driver> retrieveAllDrivers() {
        return driverRepository.findAll();
    }

    @Override
    public Driver retrieveDriver(Long driverId) {
        return driverRepository.findById(driverId).orElse(null);
    }

    @Override
    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public void removeDriver(Long driverId) {
        driverRepository.deleteById(driverId);
    }

    @Override
    public Driver modifyDriver(Driver driver) {
        return driverRepository.save(driver);
    }
}