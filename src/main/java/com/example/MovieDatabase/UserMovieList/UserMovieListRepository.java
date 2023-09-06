package com.example.MovieDatabase.UserMovieList;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
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

        // @Query(value="DELETE FROM user_movie_list WHERE user_id = CONCAT('%',:userid,'%') AND movie_id = CONCAT('%',:movieid,'%')", nativeQuery=true)
        // void deleteByUserIdAndMovieId(@Param("userid") String string, @Param("movieid") Integer num);

        @Transactional
        void removeByUserIdAndMovieId(String userId, Integer movieId);

        
}
