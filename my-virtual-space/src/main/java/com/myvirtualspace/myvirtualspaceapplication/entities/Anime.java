package com.myvirtualspace.myvirtualspaceapplication.entities;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "anime")
public class Anime implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "title")
    private String titolo;

    @Column(name = "comment")
    private String commento;

    @Column(name = "note")
    private String nota;

    @ManyToOne
    @JoinColumn(name = "state_id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private State state;

    @ManyToOne
    @JoinColumn(name = "user_id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private User user;

    @OneToMany(mappedBy = "anime", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Season> stagioni;

    public Anime() {}

    public Anime(UUID id, String titolo, String commento, String nota, State state, User user, List<Season> stagioni) {
        this.id = id;
        this.titolo = titolo;
        this.commento = commento;
        this.nota = nota;
        this.state = state;
        this.user = user;
        this.stagioni = stagioni;
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getTitolo() { return titolo; }

    public void setTitolo(String titolo) { this.titolo = titolo; }

    public String getCommento() { return commento; }

    public void setCommento(String commento) { this.commento = commento; }

    public String getNota() { return nota; }

    public void setNota(String nota) { this.nota = nota; }

    public State getState() { return state; }

    public void setState(State state) { this.state = state; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }

    public List<Season> getStagioni() { return stagioni; }

    public void setStagioni(List<Season> stagioni) { this.stagioni = stagioni; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Anime anime = (Anime) o;
        return Objects.equals(id, anime.id) && Objects.equals(titolo, anime.titolo) && Objects.equals(commento, anime.commento) && Objects.equals(nota, anime.nota) && Objects.equals(state, anime.state) && Objects.equals(user, anime.user) && Objects.equals(stagioni, anime.stagioni);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titolo, commento, nota, state, user, stagioni);
    }

    @Override
    public String toString() {
        return "Anime{" +
                "id=" + id +
                ", titolo='" + titolo + '\'' +
                ", commento='" + commento + '\'' +
                ", nota='" + nota + '\'' +
                ", state=" + state +
                ", user=" + user +
                ", stagioni=" + stagioni +
                '}';
    }
}
