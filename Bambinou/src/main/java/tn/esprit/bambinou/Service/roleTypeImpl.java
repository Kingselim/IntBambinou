package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.RoleType;
import tn.esprit.bambinou.Repository.RoleTypeRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class roleTypeImpl implements IroleTypeService {
    @Autowired
    private RoleTypeRepository roleTypeRepository;

    @Override
    public List<RoleType> retrieveAllRoleTypes() {
        return roleTypeRepository.findAll();
    }

    @Override
    public RoleType retrieveRoleType(Long roleTypeId) {
        return roleTypeRepository.findById(roleTypeId).orElse(null);
    }

    @Override
    public RoleType addRoleType(RoleType roleType) {
        return roleTypeRepository.save(roleType);
    }

    @Override
    public void removeRoleType(Long roleTypeId) {
        roleTypeRepository.deleteById(roleTypeId);
    }

    @Override
    public RoleType modifyRoleType(RoleType roleType) {
        return roleTypeRepository.save(roleType);
    }
}
