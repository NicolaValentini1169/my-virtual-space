package com.myvirtualspace.myvirtualspaceapplication.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "seasons")
public class Season implements Serializable {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "title")
    private String titolo;

    @Column(name = "order_number")
    private Integer ordine;

    @Column(name = "premiere")
    private Date dataUscita;

    @Column(name = "episodes")
    private Integer episodi;

    @Column(name = "ovas")
    private Integer ovas;

    @Column(name = "onas")
    private Integer onas;

    @Column(name = "movie")
    private Boolean movie;

    @Column(name = "watcheds_episodes")
    private Integer episodiVisti;

    @Column(name = "score")
    private Integer voto;

    @Column(name = "review")
    private Boolean rivisto;

    @Column(name = "comment")
    private String commento;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "anime_id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private Anime anime;

    @ManyToOne
    @JoinColumn(name = "state_id", columnDefinition = "VARCHAR(36)")
    @Type(type = "uuid-char")
    private State state;

    public Season() {}

    public Season(UUID id, String titolo, Integer ordine, Date dataUscita,
                  Integer episodi, Integer ovas, Integer onas, Boolean movie,
                  Integer episodiVisti, Integer voto, Boolean rivisto,
                  String commento, Anime anime, State state) {
        this.id = id;
        this.titolo = titolo;
        this.ordine = ordine;
        this.dataUscita = dataUscita;
        this.episodi = episodi;
        this.ovas = ovas;
        this.onas = onas;
        this.movie = movie;
        this.episodiVisti = episodiVisti;
        this.voto = voto;
        this.rivisto = rivisto;
        this.commento = commento;
        this.anime = anime;
        this.state = state;
    }

    public UUID getId() { return id; }

    public void setId(UUID id) { this.id = id; }

    public String getTitolo() { return titolo; }

    public void setTitolo(String titolo) { this.titolo = titolo; }

    public Integer getOrdine() { return ordine; }

    public void setOrdine(Integer ordine) { this.ordine = ordine; }

    public Date getDataUscita() { return dataUscita; }

    public void setDataUscita(Date dataUscita) { this.dataUscita = dataUscita; }

    public Integer getEpisodi() { return episodi; }

    public void setEpisodi(Integer episodi) { this.episodi = episodi; }

    public Integer getOvas() { return ovas; }

    public void setOvas(Integer ovas) { this.ovas = ovas; }

    public Integer getOnas() { return onas; }

    public void setOnas(Integer onas) { this.onas = onas; }

    public Boolean getMovie() { return movie; }

    public void setMovie(Boolean movie) { this.movie = movie; }

    public Integer getEpisodiVisti() { return episodiVisti; }

    public void setEpisodiVisti(Integer episodiVisti) { this.episodiVisti = episodiVisti; }

    public Integer getVoto() { return voto; }

    public void setVoto(Integer voto) { this.voto = voto; }

    public Boolean getRivisto() { return rivisto; }

    public void setRivisto(Boolean rivisto) { this.rivisto = rivisto; }

    public String getCommento() { return commento; }

    public void setCommento(String commento) { this.commento = commento; }

    public Anime getAnime() { return anime; }

    public void setAnime(Anime anime) { this.anime = anime; }

    public State getState() { return state; }

    public void setState(State state) { this.state = state; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Season season = (Season) o;
        return Objects.equals(id, season.id) && Objects.equals(titolo, season.titolo) && Objects.equals(ordine, season.ordine) && Objects.equals(dataUscita, season.dataUscita) && Objects.equals(episodi, season.episodi) && Objects.equals(ovas, season.ovas) && Objects.equals(onas, season.onas) && Objects.equals(movie, season.movie) && Objects.equals(episodiVisti, season.episodiVisti) && Objects.equals(voto, season.voto) && Objects.equals(rivisto, season.rivisto) && Objects.equals(commento, season.commento) && Objects.equals(anime, season.anime) && Objects.equals(state, season.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, titolo, ordine, dataUscita, episodi, ovas, onas, movie, episodiVisti, voto, rivisto, commento, anime, state);
    }

    @Override
    public String toString() {
        return "Season{" +
                "id=" + id +
                ", titolo='" + titolo + '\'' +
                ", ordine=" + ordine +
                ", dataUscita=" + dataUscita +
                ", episodi=" + episodi +
                ", ovas=" + ovas +
                ", onas=" + onas +
                ", movie=" + movie +
                ", episodiVisti=" + episodiVisti +
                ", voto=" + voto +
                ", rivisto=" + rivisto +
                ", commento='" + commento + '\'' +
                ", anime=" + anime +
                ", state=" + state +
                '}';
    }
}
