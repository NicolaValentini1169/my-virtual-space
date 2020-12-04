package com.myvirtualspace.myvirtualspaceapplication.entities.stamping;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
@EntityListeners(value = EntityStamperListener.class)
public abstract class StampedBaseEntity implements TimestampAware {

    @Column(name = "dt_ins")
    private Date dtIns;
    @Column(name = "dt_upd")
    private Date dtUpd;
    @Column(name = "ut_ins")
    private String utIns;
    @Column(name = "ut_upd")
    private String utUpd;

    @Override
    public void setDtIns(Date d) { dtIns = d; }

    @Override
    public Date getDtIns() { return dtIns; }

    @Override
    public void setDtUpd(Date d) { dtUpd = d; }

    @Override
    public Date getDtUpd() { return dtUpd; }

    @Override
    public void setUtIns(String u) { utIns = u; }

    @Override
    public String getUtIns() { return utIns; }

    @Override
    public void setUtUpd(String u) { utUpd = u; }

    @Override
    public String getUtUpd() { return utUpd; }
}
