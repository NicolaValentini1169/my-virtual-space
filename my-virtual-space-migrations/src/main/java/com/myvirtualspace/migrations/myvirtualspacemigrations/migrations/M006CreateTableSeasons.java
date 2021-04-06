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

                .addColumn("anime_id").asString(36)
                .foreignKey("fk_seasons_anime")
                .fromTable("seasons").foreignColumn("anime_id")
                .toTable("anime").primaryColumn("id")

                .addColumn("state_id").asString(36)
                .foreignKey("fk_seasons_states")
                .fromTable("seasons").foreignColumn("state_id")
                .toTable("states").primaryColumn("id")

                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO seasons VALUES ( " +
                /* id */ " 'fb4f84d1-2de7-467c-839e-ab39fb1adf98', " +
                /* title */ " 'Akame ga Kill', " +
                /* order_number */ " 1, " +
                /* premiere */ " null, " +
                /* episodes */ " 24, " +
                /* ovas */ " 0, " +
                /* onas */ " 1, " +
                /* movie */ " '0', " +
                /* watcheds_episodes */ " 22, " +
                /* score */ " 10, " +
                /* review */ " '0', " +
                /* comment */ " 'commento 2', " +
                /* anime */ " '69af548c-3d42-429e-8081-17709246b37f', " +
                /* state */ " 'ff4f94de-cdf8-4c19-87bd-60c4b5b46d00', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");
    }

    @Override
    public void down() {
        migration.deleteTable("seasons");
    }
}
