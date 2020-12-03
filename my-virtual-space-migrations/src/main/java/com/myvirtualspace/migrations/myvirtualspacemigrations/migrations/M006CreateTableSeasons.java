package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 6)
public class M006CreateTableSeasons extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("seasons")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("title").asString(255).notNullable()
                .addColumn("number").asInteger().notNullable()
                .addColumn("premiere").as(JDBCType.TIMESTAMP) // data di uscita
                .addColumn("full_episodes").asInteger()
                .addColumn("watched_episodes").asInteger()
                .addColumn("score").asInteger()
                .addColumn("review").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("comment").asString(1000)
                .addColumn("deleted").as(JDBCType.BOOLEAN).defaultValue(false)

                .addColumn("anime").asString(36)
                .foreignKey("fk_seasons_anime")
                .fromTable("seasons").foreignColumn("anime")
                .toTable("anime").primaryColumn("id")

                .addColumn("type").asString(36)
                .foreignKey("fk_seasons_types")
                .fromTable("seasons").foreignColumn("type")
                .toTable("types").primaryColumn("id")

                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP)
                .foreignKey("fk_seasons_user_ins")
                .fromTable("seasons").foreignColumn("ut_ins")
                .toTable("users").primaryColumn("id")
                .foreignKey("fk_seasons_user_upd")
                .fromTable("seasons").foreignColumn("ut_upd")
                .toTable("users").primaryColumn("id");
    }

    @Override
    public void down() {
        migration.deleteTable("seasons");
    }
}
