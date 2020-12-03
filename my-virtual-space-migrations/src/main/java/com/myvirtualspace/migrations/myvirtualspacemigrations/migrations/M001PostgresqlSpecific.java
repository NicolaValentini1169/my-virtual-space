package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;
import net.fasolato.jfmigrate.SqlDialect;

@Migration(number = 1, onlyDialect = SqlDialect.PGSQL)
public class M001PostgresqlSpecific extends JFMigrationClass {

    @Override
    public void up() {
        // So we can pass an UUID as query parameters
        migration.executeSql("CREATE CAST (varchar AS uuid) WITH INOUT AS IMPLICIT;");
    }

    @Override
    public void down() {
        migration.executeSql("DROP CAST (varchar AS uuid);");
    }
}
