package com.example.MovieDatabase;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface UserRepository extends CrudRepository<User, Integer> {
        //Code to run custom queries on MySQL
        // @Query(value="SELECT * FROM user WHERE name LIKE '%Thomas%'", nativeQuery=true)
        // public List<User> findAll2();
}
