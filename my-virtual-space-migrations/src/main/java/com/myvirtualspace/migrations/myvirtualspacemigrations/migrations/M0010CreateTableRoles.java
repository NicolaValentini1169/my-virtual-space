package com.myvirtualspace.migrations.myvirtualspacemigrations.migrations;

import net.fasolato.jfmigrate.JFMigrationClass;
import net.fasolato.jfmigrate.Migration;

import java.util.HashMap;

@Migration(number = 10)
public class M0010CreateTableRoles extends JFMigrationClass {
    private final String usersTable = "users";
    private final String rolesTable = "roles";
    private final String userRoleForeignKey = "fk_user_role";
    private final String userRoleForeignColumn = "role_id";
    private final HashMap<String, String> roles = new HashMap<String, String>() {{
        put("2fdc5b4b-dbe1-4770-9465-5ab9bf959c88", "ROLE_USER");
        put("5086fd32-bb06-44b1-9882-1dd32ce4f671", "ROLE_MODERATOR");
        put("e723d610-6bdc-423d-b88b-0b9b2fafe486", "ROLE_ADMIN");
    }};

    @Override
    public void up() {
        migration.createTable(rolesTable)
                .addColumn("id").asString(36).primaryKey()
                .addColumn("role").asString(35);

        roles.forEach((key, value) ->
                migration.executeSql(String.format("INSERT INTO %s VALUES ( '%s', '%s' )", rolesTable, key, value)));

        migration.alterTable(usersTable)
                .addColumn(userRoleForeignColumn).asString(36)
                .foreignKey(userRoleForeignKey)
                .fromTable(usersTable).foreignColumn(userRoleForeignColumn)
                .toTable(rolesTable).primaryColumn("id");

        migration.executeSql(String.format("UPDATE %s " +
                " SET %s = 'e723d610-6bdc-423d-b88b-0b9b2fafe486' " +
                " WHERE id = 'a5b51143-5223-4e33-9cea-fcd4936a9119' ", usersTable, userRoleForeignColumn));
    }

    @Override
    public void down() {
        migration.executeSql(String.format("ALTER TABLE %s DROP CONSTRAINT %s", usersTable, userRoleForeignKey));
        migration.deleteColumn(usersTable, userRoleForeignColumn);

        migration.deleteTable(rolesTable);
    }
}
