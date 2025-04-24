package tn.esprit.bambinou.Service;


import tn.esprit.bambinou.Entity.Driver;

import java.util.List;

public interface IDriverService {
    List<Driver> retrieveAllDrivers();
    Driver retrieveDriver(Long driverId);
    Driver addDriver(Driver driver);
    void removeDriver(Long driverId);
    Driver modifyDriver(Driver driver);
}