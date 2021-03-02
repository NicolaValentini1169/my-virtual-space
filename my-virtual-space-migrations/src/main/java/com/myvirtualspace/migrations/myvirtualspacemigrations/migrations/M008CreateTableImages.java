package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;

@Migration(number = 8)
public class M008CreateTableImages extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("images")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("name").asString(255)

                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO images VALUES ( " +
                " 'cc19b888-b2f9-46f6-8033-f5149c886b81', " +
                " 'pokemon_bulbasaur.jpg', " +
                " null, null, null, null )");

        migration.executeSql("INSERT INTO images VALUES ( " +
                " '631bc079-ba3c-4897-85b0-c19be4385302', " +
                " 'pokemon_charmander.jpg', " +
                " null, null, null, null )");

        migration.executeSql("INSERT INTO images VALUES ( " +
                " '0418b85d-602e-48d7-99c1-aba4ac39211e', " +
                " 'pokemon_mew.jpg', " +
                " null, null, null, null )");

        migration.executeSql("INSERT INTO images VALUES ( " +
                " '313f3c3a-252e-4983-8576-f07e02cbe10c', " +
                " 'pokemon_pikachu.jpg', " +
                " null, null, null, null )");

        migration.executeSql("INSERT INTO images VALUES ( " +
                " '76b407db-8d68-4f4f-b7e6-cc2e16fb67a7', " +
                " 'pokemon_squirtle.jpg', " +
                " null, null, null, null )");
    }

    @Override
    public void down() {
        migration.deleteTable("images");
    }
}
