package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 2)
public class M002CreateTableUsers extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("users")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("username").asString(255).notNullable()
                .addColumn("password").asString(255).notNullable()
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO users VALUES ( " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119', " +
                " 'Dr. Niar', " +
                " '111111', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");
    }

    @Override
    public void down() {
        migration.deleteTable("users");
    }
}
