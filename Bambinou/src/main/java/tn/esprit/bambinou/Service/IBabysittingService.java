package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Babysitting;
import java.util.List;
public interface IBabysittingService {
   public List<Babysitting> retrieveAllBabysittings();
   public Babysitting retrieveBabysitting(Long id);
   public Babysitting addBabysitting(Babysitting babysitting);
   public void removeBabysitting(Long id);
   public Babysitting modifyBabysitting(Babysitting babysitting);

}
