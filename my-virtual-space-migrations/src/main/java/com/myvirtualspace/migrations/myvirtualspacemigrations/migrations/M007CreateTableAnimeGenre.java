package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

@Migration(number = 7)
public class M007CreateTableAnimeGenre extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("anime_genre")
                .addColumn("anime_id").asString(36)
                .foreignKey("fk_anime_genre_anime")
                .fromTable("anime_genre").foreignColumn("anime_id")
                .toTable("anime").primaryColumn("id")

                .addColumn("genre_id").asString(36)
                .foreignKey("fk_anime_genre_genres")
                .fromTable("anime_genre").foreignColumn("genre_id")
                .toTable("genres").primaryColumn("id");

        migration.executeSql("INSERT INTO anime_genre VALUES ( " +
                " '69af548c-3d42-429e-8081-17709246b37f', " +
                " '01b6c76c-8207-434a-bf55-42bb72bf5d61' )");

        migration.executeSql("INSERT INTO anime_genre VALUES ( " +
                " '69af548c-3d42-429e-8081-17709246b37f', " +
                " 'eb9781e0-4fd7-44dc-83de-da347e107057' )");
    }

    @Override
    public void down() {
        migration.deleteTable("anime_genre");
    }
}
