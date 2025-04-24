package tn.esprit.bambinou.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.annotation.WebFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.AuthResponse;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Service.IuserService;
import tn.esprit.bambinou.Service.JwtUtil;
import tn.esprit.bambinou.Entity.AuthResponse;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("/api/facial")
@CrossOrigin(origins = "*")
public class FacialRecognitionController {

    @Autowired
    private IuserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    private static final String UPLOAD_DIR = "src/main/resources/static/images/";

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>>uploadImage(@RequestParam("file1") MultipartFile file, @RequestParam("id") Long id) {
        System.out.println("DANS UPDLOAD");
        try {

            User user = userService.retrieveUser(id);

            String fileName = user.getName() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);

            // Créer le dossier s'il n'existe pas
            Files.createDirectories(path.getParent());

            // Sauvegarder le fichier
            Files.write(path, file.getBytes());

            // Exemple de réponse au format JSON
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image sauvegardée sous : " + fileName);
            user.setImage(fileName);
           userService.modifyUser(user);

            rechargerImages();

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur : " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestBody Map<String, String> payload) {
        try {
            System.out.println("dans le controller");
            String base64Image = payload.get("image");

            // Supprimer le prefix "data:image/png;base64,"
            String[] parts = base64Image.split(",");
            String imageData = parts.length > 1 ? parts[1] : parts[0];

            byte[] imageBytes = Base64.getDecoder().decode(imageData);

            // Sauvegarde temporaire de l'image
            Path tempFile = Files.createTempFile("webcam-", ".png");
            Files.write(tempFile, imageBytes);

            // Exemple simplifié : on suppose que l'image est toujours "reconnue"
            System.out.println("Image sauvegardée : " + tempFile.toAbsolutePath());

            // TODO : ajouter ici l'appel au service de reconnaissance faciale

            return ResponseEntity.ok("Utilisateur reconnu ✅");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors du traitement ❌");
        }
    }


    @PostMapping("/compare-faces")
    public ResponseEntity<?> compareFaces(@RequestParam("file1") MultipartFile file) {
        Map<String, Object> response = new HashMap<>();
        System.out.println("DANS COMPARE FACES");
        try {


            List<User> listUser = userService.retrieveAllUsers();
            List<User> listUserfiltrer = new ArrayList<>();

            for (User user : listUser) {
                if(user.getImage() != null) {
                    listUserfiltrer.add(user);
                }
            }

            System.out.println("le nombre de user avec une image est : "+ listUserfiltrer.size());
            for (User user : listUserfiltrer) {
                System.out.println("ici le test pour "+ user.getName());
                // Préparer l'image dynamique (envoyée par Angular)
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.MULTIPART_FORM_DATA);

                MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
                body.add("file1", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

                // Charger l'image statique depuis le système de fichiers
                System.out.println("le nom de l image du user est : "+ user.getImage());
                File staticFile = new File("src/main/resources/static/images/" + user.getImage());  // <-- modifie le chemin si besoin

                if(staticFile.exists()) {
                    body.add("file2", new FileSystemResource(staticFile));
                    // Création de la requête
                    HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
                    String pythonApiUrl = "http://127.0.0.1:8000/compare-faces/";

                    RestTemplate restTemplate = new RestTemplate();
                    ResponseEntity<String> pythonResponse = restTemplate.postForEntity(pythonApiUrl, requestEntity, String.class);

                    //System.out.println(pythonResponse.getBody());
                    // Parse the JSON response
                    ObjectMapper objectMapper = new ObjectMapper();
                    FaceMatchResponse responseF = objectMapper.readValue(pythonResponse.getBody(), FaceMatchResponse.class);
                    if(responseF.isMatch()) {
                        response.put("result", pythonResponse.getBody());
                        System.out.println("le visage est detecter-------------------------------------");
                        //response.put("match", true);
                        // Générer le token JWT

                        String token = jwtUtil.generateToken(user);
                        // Retourne un objet JSON contenant le token
                        return ResponseEntity.ok(new AuthResponse(token));
                    }else {
                        System.out.println("ne match pas  !!!!!!!!!");
                    }
                }else
                {
                    System.out.println("l'image n'existe pas");
                }



            }

            // Charger l'image statique depuis le système de fichiers
            //File staticFile = new File("/Users/mac/Documents/4eme/PI/face-api/img4.jpg");  // <-- modifie le chemin si besoin
            //body.add("file2", new FileSystemResource(staticFile));

            // Création de la requête
           // HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
           // String pythonApiUrl = "http://127.0.0.1:8000/compare-faces/";

           // RestTemplate restTemplate = new RestTemplate();
           // ResponseEntity<String> pythonResponse = restTemplate.postForEntity(pythonApiUrl, requestEntity, String.class);

          //  response.put("result", pythonResponse.getBody());
           // System.out.println("le visage est detecter-------------------------------------");
            //response.put("match", true);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("error", "Une erreur est survenue : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



    public void rechargerImages() throws IOException {
        Path source = Paths.get("src/main/resources/static/images/");
        Path destination = Paths.get("target/classes/static/images/");

        Files.walk(source)
                .filter(Files::isRegularFile)
                .forEach(file -> {
                    try {
                        Path relativePath = source.relativize(file);
                        Path destFile = destination.resolve(relativePath);
                        Files.createDirectories(destFile.getParent());
                        Files.copy(file, destFile, StandardCopyOption.REPLACE_EXISTING);
                        System.out.println("Image copiée : " + file.getFileName());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                });
    }




}
