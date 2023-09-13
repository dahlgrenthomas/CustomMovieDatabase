package com.example.MovieDatabase.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import static org.hamcrest.CoreMatchers.is;

import com.example.MovieDatabase.Movie.Movie;
import com.example.MovieDatabase.Movie.MovieRepository;
import com.example.MovieDatabase.UserMovieList.UserMovieList;
import com.example.MovieDatabase.UserMovieList.UserMovieListRepository;

import org.springframework.security.test.context.support.WithMockUser;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerImplTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserMovieListRepository userMovieListRepository;

    @MockBean
    private MovieRepository movieRepository;

    @Test
    @WithMockUser(username = "user")
    void testGetAllMovies() throws Exception {
        List<Movie> listOfMovies = new ArrayList<>();
        Movie movie = new Movie();
        movie.setId(1);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        movie.setGenre("null");
        movie.setYear(1999);

        Movie movie2 = new Movie();
        movie2.setId(2);
        movie2.setTitle("movie2");
        movie2.setPoster("poster.link2");
        movie2.setOverview("Fun movie2");
        movie.setGenre("null");
        movie.setYear(1999);
        listOfMovies.add(movie);
        listOfMovies.add(movie2);

        List<UserMovieList> listOfUserMovie = new ArrayList<>();
        UserMovieList userMovieList = new UserMovieList();
        userMovieList.setMovieId(1);
        userMovieList.setUserId("user");
        UserMovieList userMovieList2 = new UserMovieList();
        userMovieList.setMovieId(2);
        userMovieList.setUserId("user");
        listOfUserMovie.add(userMovieList);
        listOfUserMovie.add(userMovieList2);

        List<Integer> intList = listOfUserMovie.stream().map(UserMovieList::getMovieId).collect(Collectors.toList());

        Mockito.when(userMovieListRepository.findByUserId("user")).thenReturn(listOfUserMovie);

        Mockito.when(movieRepository.findAllById(intList)).thenReturn(listOfMovies);

        ResultActions response = mockMvc.perform(get("/api/user/userlist"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.size()",
                        is(listOfMovies.size())));

    }

    @Test
    void testGetLogStatus() {

    }

    @Test
    void testGetMoviesSearch() {

    }

    @Test
    void testGetUserList() {

    }

    @Test
    void testRemoveFromList() {

    }
}
