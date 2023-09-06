package com.example.MovieDatabase.UserMovieList;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

@Entity
@IdClass(UserMovieId.class)
public class UserMovieList {
    @Id
    private String userId;

    @Id
    private Integer movieId;

    public String getUserId() {       
        return userId;
    }
    public void setUserId(String id) {
        this.userId = id;
    }
    public Integer getMovieId() {
        return movieId;
    }
    public void setMovieId(Integer id) {
        this.movieId = id;
    }

}

