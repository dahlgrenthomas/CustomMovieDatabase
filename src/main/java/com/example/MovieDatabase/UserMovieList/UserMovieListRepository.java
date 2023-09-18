package com.example.MovieDatabase.UserMovieList;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface UserMovieListRepository extends CrudRepository<UserMovieList, UserMovieId> {
        //Code to run custom queries on MySQL
        // @Query(value="SELECT * FROM user WHERE name LIKE '%Thomas%'", nativeQuery=true)
        // public List<User> findAll2();

        // @Query(value="SELECT employeeId FROM user_emp_list WHERE userId=CONCAT('%',:num,'%')", nativeQuery=true)
        // public Iterable<UserEmpList> findAllEmp(@Param("long") Long num);

        List<UserMovieList> findByUserId(String userId);

        @Transactional
        void removeByUserIdAndMovieId(String userId, Integer movieId);

        
}
