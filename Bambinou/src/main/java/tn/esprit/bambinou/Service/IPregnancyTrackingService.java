package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.PregnancyTracking;

import java.util.List;

public interface IPregnancyTrackingService {
    public List<PregnancyTracking> retrieveAllPregnancyTrackings();
    public PregnancyTracking retrievePregnancyTracking(Long pregnancyTrackingId);
    public PregnancyTracking addPregnancyTracking(PregnancyTracking pregnancyTracking);
    public void removePregnancyTracking(Long pregnancyTrackingId);
    public PregnancyTracking modifyPregnancyTracking(PregnancyTracking pregnancyTracking);
    String interpretTrackingValues(Long idPregnancyTracking);

}