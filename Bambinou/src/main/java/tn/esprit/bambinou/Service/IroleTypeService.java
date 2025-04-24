package tn.esprit.bambinou.Service;


import tn.esprit.bambinou.Entity.RoleType;

import java.util.List;

public interface IroleTypeService {
    public List<RoleType> retrieveAllRoleTypes();
    public RoleType retrieveRoleType(Long roleTypeId);
    public RoleType addRoleType(RoleType roleType);
    public void removeRoleType(Long roleTypeId);
    public RoleType modifyRoleType(RoleType roleType);
}
