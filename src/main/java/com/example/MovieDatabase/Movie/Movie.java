package com.example.MovieDatabase.Movie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Movie {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer id;

  private String poster;

  private String title;

  private String overview;



  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getPoster() {
    return poster;
  }
  public String getOverview() {
    return overview;
  }
  public void setOverview(String overview) {
    this.overview = overview;
  }

  public void setPoster(String poster) {
    this.poster = poster;
  }
}
