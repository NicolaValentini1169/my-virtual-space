package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.sql.JDBCType;
import java.util.HashMap;

@Migration(number = 4)
public class M004CreateTableStates extends JFMigrationClass {
    private final HashMap<String, String> defaultValues = new HashMap<String, String>() {{
        put("4241ddbb-9e44-41a4-9b96-102ed840ef82", "TBA"); // Has yet to come out
        put("ff4f94de-cdf8-4c19-87bd-60c4b5b46d00", "On Air"); // Is coming out
        put("eedc6de9-817b-42f6-bac3-39e3b35327ef", "Finished"); // Is finished to coming out
        put("0c5de245-7734-4052-873b-f2f3bf4bda2c", "Paused"); // Is paused
        put("bd7542cd-0300-4ba8-97af-c44942f77272", "Deleted"); // Is stopped
        put("150b947a-2ba8-482a-b924-41a8fe8c90d3", "New Season"); // Will coming out a new season
        put("fffb2afe-dab5-46bb-9ee4-a1cf1ab4170e", "To Check"); // To check if finished
    }};

    @Override
    public void up() {
        migration.createTable("states")
                .addColumn("id").asString(36).primaryKey()
                .addColumn("description").asString(255).notNullable()
                .addColumn("ut_ins").asString(36)
                .addColumn("dt_ins").as(JDBCType.TIMESTAMP)
                .addColumn("ut_upd").asString(36)
                .addColumn("dt_upd").as(JDBCType.TIMESTAMP);

        defaultValues.forEach((key, value) ->
                migration.executeSql(String.format("INSERT INTO states VALUES ( '%s', '%s', null, null, null, null )", key, value)));
    }

    @Override
    public void down() {
        migration.deleteTable("states");
    }
}
