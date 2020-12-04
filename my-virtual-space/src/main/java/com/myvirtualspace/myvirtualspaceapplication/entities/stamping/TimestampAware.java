package com.myvirtualspace.myvirtualspaceapplication.entities.stamping;

import java.util.Date;

public interface TimestampAware {

    Object getId();

    void setDtIns(Date d);

    Date getDtIns();

    void setDtUpd(Date d);

    Date getDtUpd();

    void setUtIns(String u);

    String getUtIns();

    void setUtUpd(String u);

    String getUtUpd();
}
