package com.example.MovieDatabase.Movie;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface MovieRepository extends CrudRepository<Movie, Integer> {
        //Code to run custom queries on MySQL
        @Query(value="SELECT * FROM movie ORDER BY RAND() LIMIT 50", nativeQuery=true)
        public Iterable<Movie> getRandomMovies();

        @Query(value= "SELECT * FROM movie WHERE title LIKE CONCAT('%',:moviename,'%')", nativeQuery=true)
        public Iterable<Movie> findByName(@Param("moviename") String string);
        
}
