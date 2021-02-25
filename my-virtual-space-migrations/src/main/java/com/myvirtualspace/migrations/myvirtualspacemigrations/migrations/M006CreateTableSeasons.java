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
                .addColumn("order_number").asInteger().notNullable()
                .addColumn("premiere").as(JDBCType.TIMESTAMP) // data di uscita
                .addColumn("episodes").asInteger()
                .addColumn("ovas").asInteger()
                .addColumn("onas").asInteger()
                .addColumn("movie").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("watcheds_episodes").asInteger()
                .addColumn("score").asInteger()
                .addColumn("review").as(JDBCType.BOOLEAN).defaultValue(false)
                .addColumn("comment").asString(1000)

                .addColumn("anime").asString(36)
                .foreignKey("fk_seasons_anime")
                .fromTable("season").foreignColumn("anime")
                .toTable("anime").primaryColumn("id")

                .addColumn("type").asString(36)
                .foreignKey("fk_season_type")
                .fromTable("season").foreignColumn("type")
                .toTable("type").primaryColumn("id")

                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);
    }

    @Override
    public void down() {
        migration.deleteTable("season");
    }
}
