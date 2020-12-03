package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 4)
public class M004CreateTableTypes extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("types")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("description").asString(255).notNullable()
                .withColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP)
                .foreignKey("fk_types_user_ins")
                .fromTable("types").foreignColumn("ut_ins")
                .toTable("users").primaryColumn("id")
                .foreignKey("fk_types_user_upd")
                .fromTable("types").foreignColumn("ut_upd")
                .toTable("users").primaryColumn("id");
    }

    @Override
    public void down() {
        migration.deleteTable("types");
    }
}
