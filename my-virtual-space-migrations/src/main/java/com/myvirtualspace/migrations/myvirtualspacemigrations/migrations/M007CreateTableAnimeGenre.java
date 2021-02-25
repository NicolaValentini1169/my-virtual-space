package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

@Migration(number = 7)
public class M007CreateTableAnimeGenre extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("anime_genre")
                .addColumn("anime").asString(36).primaryKey()
                .addColumn("genre").asString(36).primaryKey()
                .foreignKey("fk_anime_genres_anime")
                .fromTable("anime_genres").foreignColumn("anime")
                .toTable("anime").primaryColumn("id")
                .foreignKey("fk_anime_genres_genres")
                .fromTable("anime_genres").foreignColumn("genre")
                .toTable("genres").primaryColumn("id");
    }

    @Override
    public void down() {
        migration.deleteTable("anime_genre");
    }
}
