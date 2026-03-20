package com.example.HRMS.entity;

import java.util.Set;

public enum Role {

    ADMIN(Set.of(
            Permission.EMPLOYEE_READ,
            Permission.EMPLOYEE_WRITE
    )),

    MANAGER(Set.of(
            Permission.EMPLOYEE_READ,
            Permission.EMPLOYEE_WRITE
    )),

    STAFF(Set.of(
            Permission.EMPLOYEE_READ
    ));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }
}
