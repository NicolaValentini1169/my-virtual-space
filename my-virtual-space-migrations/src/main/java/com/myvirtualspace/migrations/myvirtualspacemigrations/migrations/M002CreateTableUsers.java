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
                .addColumn("name").asString(255).notNullable()
                .addColumn("surname").asString(255).notNullable()
                .addColumn("nickname").asString(255).notNullable()
                .addColumn("password").asString(255).notNullable()
                .addColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);
    }

    @Override
    public void down() {
        migration.deleteTable("users");
    }
}
