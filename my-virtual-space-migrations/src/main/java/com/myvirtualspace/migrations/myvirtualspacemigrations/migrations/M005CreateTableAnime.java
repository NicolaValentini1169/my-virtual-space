package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 5)
public class M005CreateTableAnime extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("anime")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("title").asString(255)
                .addColumn("finished").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("comment").asString(1000)
                .addColumn("nota").asString(1000)
                .addColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);
    }

    @Override
    public void down() {
        migration.deleteTable("anime");
    }
}
