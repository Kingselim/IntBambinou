package tn.esprit.bambinou.Controller;


import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.RoleType;
import tn.esprit.bambinou.Service.IroleTypeService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/role-type")
public class RoleTypeController {
    @Autowired
    private IroleTypeService roleTypeService;

    /*
    --------------------- format ajout d un roleType avec JSON -----------------------
    {
        "id": 2,                nb:  l'id est a retirer
        "role": "PATIENT"
    }

     */

    // http://localhost:8089/role-type/retrieve-all-role-types
    @GetMapping("/retrieve-all-role-types")
    public List<RoleType> getRoleTypes() {
        return roleTypeService.retrieveAllRoleTypes();
    }

    // http://localhost:8089/role-type/retrieve-role-type/{role-type-id}
    @GetMapping("/retrieve-role-type/{role-type-id}")
    public RoleType retrieveRoleType(@PathVariable("role-type-id") Long roleTypeId) {
        return roleTypeService.retrieveRoleType(roleTypeId);
    }

    // http://localhost:8089/role-type/add-role-type
    @PostMapping("/add-role-type")
    public RoleType addRoleType(@RequestBody RoleType rt) {
        return roleTypeService.addRoleType(rt);
    }

    @DeleteMapping("/remove-role-type/{role-type-id}")
    public void removeRoleType(@PathVariable("role-type-id") Long roleTypeId) {
        roleTypeService.removeRoleType(roleTypeId);
    }

    @PutMapping("/modify-role-type")
    public RoleType modifyRoleType(@RequestBody RoleType rt) {
        return roleTypeService.modifyRoleType(rt);
    }
}
