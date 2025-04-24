package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Repository.BabysittingRepository;
import tn.esprit.bambinou.Repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class BabysittingServiceImpl implements IBabysittingService {
    @Autowired
    private BabysittingRepository babysittingRepository;

    @Override
    public List<Babysitting> retrieveAllBabysittings() {
        return babysittingRepository.findAll();
    }

    @Override
    public Babysitting retrieveBabysitting(Long id) {
        return babysittingRepository.findById(id).orElse(null);
    }

    @Override
    public Babysitting addBabysitting(Babysitting babysitting) {
        return babysittingRepository.save(babysitting);
    }

    @Override
    public void removeBabysitting(Long id) {
        babysittingRepository.deleteById(id);
    }

    @Override
    public Babysitting modifyBabysitting(Babysitting babysitting) {
        return babysittingRepository.save(babysitting);
    }

}
