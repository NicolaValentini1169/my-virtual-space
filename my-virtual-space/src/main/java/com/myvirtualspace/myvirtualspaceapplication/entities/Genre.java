package com.myvirtualspace.myvirtualspaceapplication.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "genres")
public class Genre implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "description")
    private String descrizione;

    public Genre() {}

    public Genre(UUID id, String descrizione) {
        this.id = id;
        this.descrizione = descrizione;
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getDescrizione() { return descrizione; }

    public void setDescrizione(String descrizione) { this.descrizione = descrizione; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Genre genre = (Genre) o;
        return Objects.equals(id, genre.id) && Objects.equals(descrizione, genre.descrizione);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, descrizione);
    }

    @Override
    public String toString() {
        return "Genre{" +
                "id=" + id +
                ", descrizione='" + descrizione + '\'' +
                '}';
    }
}
