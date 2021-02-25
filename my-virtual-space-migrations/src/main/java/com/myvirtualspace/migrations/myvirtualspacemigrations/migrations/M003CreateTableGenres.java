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
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        migration.executeSql("INSERT INTO genres VALUES ( " +
                " '01b6c76c-8207-434a-bf55-42bb72bf5d61', " +
                " 'Fantasy', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");

        migration.executeSql("INSERT INTO genres VALUES ( " +
                " 'eb9781e0-4fd7-44dc-83de-da347e107057', " +
                " 'Sport', " +
                " null, " +
                " null, " +
                " null, " +
                " null )");
    }

    @Override
    public void down() {
        migration.deleteTable("genres");
    }
}
