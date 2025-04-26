package tn.esprit.bambinou.Service;

import org.springframework.http.ResponseEntity;
import tn.esprit.bambinou.Entity.Babysitting;
import java.util.List;
public interface IBabysittingService {
   public List<Babysitting> retrieveAllBabysittings();
   public Babysitting retrieveBabysitting(Long id);
   public Babysitting addBabysitting(Babysitting babysitting);
   public void removeBabysitting(Long id);
   public Babysitting modifyBabysitting(Babysitting babysitting);
   public List<Babysitting> getContractsByParent(Long id);

   //partie avance
   public ResponseEntity<byte[]> generateContractSummaryPdf(Long id);
   List<Babysitting> getByBabysitterId(Long babysitterId);

}
