package com.myvirtualspace.myvirtualspaceapplication.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "images")
public class Image implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "name")
    private String nome;

    @JsonIgnore
    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(name = "image_user", joinColumns = @JoinColumn(name = "image_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users = new ArrayList<>();

    public Image() {}

    public Image(UUID id, String nome, List<User> users) {
        this.id = id;
        this.nome = nome;
        this.users = users;
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getNome() { return nome; }

    public void setNome(String nome) { this.nome = nome; }

    public List<User> getUsers() { return users; }

    public void setUsers(List<User> users) { this.users = users; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return Objects.equals(id, image.id) &&
                Objects.equals(nome, image.nome) &&
                Objects.equals(users, image.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, users);
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", users=" + users +
                '}';
    }
}
