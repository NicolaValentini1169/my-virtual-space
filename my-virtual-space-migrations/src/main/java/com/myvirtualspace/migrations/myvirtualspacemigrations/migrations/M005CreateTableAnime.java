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
                .addColumn("comment").asString(1000)
                .addColumn("note").asString(1000)

                .addColumn("state_id").asString(36)
                .foreignKey("fk_anime_states")
                .fromTable("anime").foreignColumn("state_id")
                .toTable("states").primaryColumn("id")

                .addColumn("user_id").asString(36)
                .foreignKey("fk_anime_users")
                .fromTable("anime").foreignColumn("user_id")
                .toTable("users").primaryColumn("id")

                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO anime VALUES ( " +
                " '69af548c-3d42-429e-8081-17709246b37f', " +
                " 'Akame ga Kill', " +
                " 'commento', " +
                " 'nota', " +
                " 'afc4c5d8-d3a4-4e59-a811-ac93759ce2e0', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");
    }

    @Override
    public void down() {
        migration.deleteTable("anime");
    }
}
