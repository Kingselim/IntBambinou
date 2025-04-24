package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Baby;

import java.util.List;

public interface IBabyService {

    // Récupérer tous les babies
    List<Baby> retrieveAllBabies();

    // Récupérer un baby par ID
    Baby retrieveBaby(Long id);

    // Ajouter un baby
    Baby addBaby(Baby baby);

    // Supprimer un baby
    void removeBaby(Long id);

    // Modifier un baby
    Baby modifyBaby(Baby baby);

    // Récupérer les babies d'un utilisateur spécifique
}

