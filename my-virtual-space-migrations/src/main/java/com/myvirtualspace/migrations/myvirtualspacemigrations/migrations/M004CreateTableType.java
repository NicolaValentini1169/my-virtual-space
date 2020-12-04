package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 4)
public class M004CreateTableType extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("type")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("description").asString(255).notNullable()
                .addColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);
    }

    @Override
    public void down() {
        migration.deleteTable("type");
    }
}
