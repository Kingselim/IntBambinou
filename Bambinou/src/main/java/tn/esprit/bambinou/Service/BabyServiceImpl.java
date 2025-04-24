package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Repository.BabyRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BabyServiceImpl implements IBabyService {

    @Autowired
    private BabyRepository babyRepository;

    @Override
    public List<Baby> retrieveAllBabies() {
        return babyRepository.findAll();
    }

    @Override
    public Baby retrieveBaby(Long id) {
        return babyRepository.findById(id).orElse(null);
    }

    @Override
    public Baby addBaby(Baby baby) {
        return babyRepository.save(baby);
    }

    @Override
    public void removeBaby(Long id) {
        babyRepository.deleteById(id);
    }

    @Override
    public Baby modifyBaby(Baby baby) {
        return babyRepository.save(baby);
    }


}

