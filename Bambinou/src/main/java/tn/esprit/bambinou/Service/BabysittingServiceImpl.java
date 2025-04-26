package tn.esprit.bambinou.Service;

import com.itextpdf.text.Element;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Image;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Baby;
import tn.esprit.bambinou.Entity.Babysitting;
import tn.esprit.bambinou.Entity.BabysittingReview;
import tn.esprit.bambinou.Repository.BabyRepository;
import tn.esprit.bambinou.Repository.BabysittingRepository;
import tn.esprit.bambinou.Repository.BabysittingReviewRepository;
import tn.esprit.bambinou.Repository.UserRepository;

//import javax.swing.text.Document;
import java.io.ByteArrayOutputStream;
import java.util.List;
import com.itextpdf.text.Document; // ✅


@Service
@AllArgsConstructor
public class BabysittingServiceImpl implements IBabysittingService {
    @Autowired
    private BabysittingRepository babysittingRepository;
    @Autowired
    private BabyRepository babyRepository;
    @Autowired
    private BabysittingReviewRepository babysittingReviewRepository;

    @Override
    public List<Babysitting> retrieveAllBabysittings() {
        return babysittingRepository.findAll();
    }

    @Override
    public Babysitting retrieveBabysitting(Long id) {
        return babysittingRepository.findById(id).orElse(null);
    }

    //    @Override
//    public Babysitting addBabysitting(Babysitting babysitting) {
//        return babysittingRepository.save(babysitting);
//    }
    @Override
    public Babysitting addBabysitting(Babysitting babysitting) {
        if (babysitting.getBabysitter() == null || babysitting.getBabysitter().getId() == 0) {
            throw new IllegalArgumentException("Le babysitter est obligatoire !");
        }

        if (babysitting.getUser() == null || babysitting.getUser().getId() == 0) {
            throw new IllegalArgumentException("Le parent est obligatoire !");
        }

        if (babysitting.getBabies() != null && !babysitting.getBabies().isEmpty()) {
            List<Baby> managedBabies = babysitting.getBabies().stream()
                    .map(b -> babyRepository.findById(b.getIdBaby())
                            .orElseThrow(() -> new RuntimeException("Bébé introuvable avec ID : " + b.getIdBaby())))
                    .toList();
            babysitting.setBabies(managedBabies);
        }

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

    @Override
    public List<Babysitting> getContractsByParent(Long id) {
        return babysittingRepository.findByUser_Id(id);
    }
    //partie avance

    public ResponseEntity<byte[]> generateContractSummaryPdf(Long id) {
        try {
            Babysitting contract = babysittingRepository.findById(id).orElse(null);
            if (contract == null) return ResponseEntity.notFound().build();

            List<Baby> babies = babyRepository.findByBabysitting(contract);
            BabysittingReview review = babysittingReviewRepository.findByBabysitting(contract);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);
            document.open();

            // 📌 Logo Bambino
            try {
                Image logo = Image.getInstance(new ClassPathResource("static/bambino-logo.png").getURL());
                logo.scaleToFit(100, 100);
                logo.setAlignment(Element.ALIGN_CENTER);
                document.add(logo);
            } catch (Exception e) {
                System.out.println("Logo not found.");
            }

            // 📝 Titre principal
            Paragraph title = new Paragraph("Babysitting Contract Summary", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(new Paragraph(" ")); // espace

            // 🧾 Infos contrat
            document.add(new Paragraph("📄 Contract Information"));
            document.add(new Paragraph("Start Date: " + contract.getStartDate()));
            document.add(new Paragraph("End Date: " + contract.getEndDate()));
            document.add(new Paragraph("Duration: " + contract.getDuration() + " hours"));
            document.add(new Paragraph("Salary: " + contract.getSalary() + " TND"));
            document.add(new Paragraph("Status: " + contract.getStatus()));
            document.add(new Paragraph(" "));

            // 👶 Infos bébé(s)
            document.add(new Paragraph("👶 Baby Information"));
            for (Baby baby : babies) {
                document.add(new Paragraph("Name: " + baby.getName()));
                document.add(new Paragraph("Age: " + baby.getAge()));
                document.add(new Paragraph("Gender: " + baby.getGender()));
                document.add(new Paragraph("Medical Condition: " + baby.getMedicalCondition()));
                document.add(new Paragraph("Special Needs: " + baby.getSpecialNeeds()));
                document.add(new Paragraph("Favorite Activities: " + baby.getFavoriteActivities()));
                document.add(new Paragraph("Emergency Contact: " + baby.getEmergencyContact()));
                document.add(new Paragraph("------"));
            }
            document.add(new Paragraph(" "));

            // ✍️ Avis
            if (review != null) {
                document.add(new Paragraph("⭐ Babysitter Review"));
                document.add(new Paragraph("Rating: " + review.getRating() + "/5"));
                document.add(new Paragraph("Comment: " + review.getComment()));
            } else {
                document.add(new Paragraph("No review available yet."));
            }

            document.close();

            byte[] pdfBytes = out.toByteArray();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "babysitting-summary.pdf");

            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Override
    public List<Babysitting> getByBabysitterId(Long babysitterId) {
        return babysittingRepository.findByBabysitterId(babysitterId);
    }


}
