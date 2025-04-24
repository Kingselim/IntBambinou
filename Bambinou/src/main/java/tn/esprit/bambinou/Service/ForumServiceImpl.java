package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Repository.ForumRepository;

import java.util.List;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Forum;
import tn.esprit.bambinou.Entity.PregnancyTracking;
import tn.esprit.bambinou.Repository.ForumRepository;
import tn.esprit.bambinou.Repository.PregnancyTrackingRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ForumServiceImpl implements IForumService {
    @Autowired
    private ForumRepository forumRepository;
    @Autowired
    private PregnancyTrackingRepository pregnancyTrackingRepository;
    @Override
    public List<Forum> retrieveAllForums() {
        return forumRepository.findAll();
    }

    @Override
    public Forum retrieveForum(Long forumId) {
        return forumRepository.findById(forumId).orElse(null);
    }

    //* @Override
   /* public Forum addForum(Forum forum) {
        return forumRepository.save(forum);
    }*/
    @Override
    public Forum addForum(Forum forum) {
        if (forum.getPregnancyTracking() != null && forum.getPregnancyTracking().getIdPregnancyTracking() != null) {
            PregnancyTracking tracking = pregnancyTrackingRepository
                    .findById(forum.getPregnancyTracking().getIdPregnancyTracking())
                    .orElse(null);

            forum.setPregnancyTracking(tracking);
        }

        return forumRepository.save(forum);
    }
    @Override
    public void removeForum(Long forumId) {
        forumRepository.deleteById(forumId);
    }

    @Override
    public Forum modifyForum(Forum forum) {
        return forumRepository.save(forum);
    }
    @Override
    public List<Forum> getForumsByPregnancy(Long idPregnancyTracking) {
        return forumRepository.findByPregnancyTracking_IdPregnancyTracking(idPregnancyTracking);
    }

}