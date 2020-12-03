package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 3)
public class M003CreateTableGenres extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("genres")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("description").asString(255).notNullable()
                .addColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP)
                .foreignKey("fk_genres_user_ins")
                .fromTable("genres").foreignColumn("ut_ins")
                .toTable("users").primaryColumn("id")
                .foreignKey("fk_genres_user_upd")
                .fromTable("genres").foreignColumn("ut_upd")
                .toTable("users").primaryColumn("id");
    }

    @Override
    public void down() {
        migration.deleteTable("genres");
    }
}
