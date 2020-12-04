package com.myvirtualspace.myvirtualspaceapplication.entities.stamping;

import com.myvirtualspace.myvirtualspaceapplication.utils.AuthenticationUtils;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

public class EntityStamperListener {

    @PrePersist
    @PreUpdate
    private void timestampEntity(TimestampAware entity) {
        Date now = new Date();
        String username = AuthenticationUtils.getUserPrincipal();

        // don't override creation date once it's been set
        if (entity.getId() == null || entity.getDtIns() == null) {
            entity.setDtIns(now);
            entity.setUtIns(username);
        }
        entity.setDtUpd(now);
        entity.setUtUpd(username);
    }
}
