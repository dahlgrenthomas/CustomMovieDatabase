package com.example.MovieDatabase.Movie;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface MovieRepository extends CrudRepository<Movie, Integer> {
        //Code to run custom queries on MySQL
        // @Query(value="SELECT * FROM movie WHERE id = 123 LIMIT 1", nativeQuery=true)
        // public Movie findById();
        
}
