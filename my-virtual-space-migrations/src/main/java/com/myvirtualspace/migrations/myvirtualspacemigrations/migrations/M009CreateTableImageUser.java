package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

@Migration(number = 9)
public class M009CreateTableImageUser extends JFMigrationClass {

    @Override
    public void up() {
        migration.createTable("image_user")
                .addColumn("image_id").asString(36)
                .foreignKey("fk_image_user_image")
                .fromTable("image_user").foreignColumn("image_id")
                .toTable("images").primaryColumn("id")

                .addColumn("user_id").asString(36)
                .foreignKey("fk_image_user_user")
                .fromTable("image_user").foreignColumn("user_id")
                .toTable("users").primaryColumn("id");

        migration.executeSql("INSERT INTO image_user VALUES ( " +
                " 'cc19b888-b2f9-46f6-8033-f5149c886b81', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119' )");

        migration.executeSql("INSERT INTO image_user VALUES ( " +
                " '631bc079-ba3c-4897-85b0-c19be4385302', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119' )");

        migration.executeSql("INSERT INTO image_user VALUES ( " +
                " '0418b85d-602e-48d7-99c1-aba4ac39211e', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119' )");

        migration.executeSql("INSERT INTO image_user VALUES ( " +
                " '313f3c3a-252e-4983-8576-f07e02cbe10c', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119' )");

        migration.executeSql("INSERT INTO image_user VALUES ( " +
                " '76b407db-8d68-4f4f-b7e6-cc2e16fb67a7', " +
                " 'a5b51143-5223-4e33-9cea-fcd4936a9119' )");
    }

    @Override
    public void down() {
        migration.deleteTable("image_user");
    }
}
