package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 4)
public class M004CreateTableStates extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("states")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("description").asString(255).notNullable()
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO genres VALUES ( " +
                " 'afc4c5d8-d3a4-4e59-a811-ac93759ce2e0', " +
                " 'On Air', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");
    }

    @Override
    public void down() {
        migration.deleteTable("states");
    }
}
