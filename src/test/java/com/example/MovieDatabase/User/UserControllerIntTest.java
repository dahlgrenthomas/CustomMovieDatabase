package com.example.MovieDatabase.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.hamcrest.CoreMatchers.is;

import com.example.MovieDatabase.Movie.Movie;
import com.example.MovieDatabase.Movie.MovieRepository;
import com.example.MovieDatabase.UserMovieList.UserMovieId;
import com.example.MovieDatabase.UserMovieList.UserMovieList;
import com.example.MovieDatabase.UserMovieList.UserMovieListRepository;

import org.springframework.security.test.context.support.WithMockUser;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class UserControllerIntTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserMovieListRepository userMovieListRepository;

    @MockBean
    private MovieRepository movieRepository;

    /**
     * Ensure getAllMovies returns the movie list of the user named 'user'
     */
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
        userMovieList2.setMovieId(2);
        userMovieList2.setUserId("user");
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

    /**
     * Ensure getLogStatus returns true when a user is logged in
     * @throws Exception
     */
    @Test
    @WithMockUser(username = "user")
    void testGetLogStatusWhenLoggedIn() throws Exception {
        ResultActions response = mockMvc.perform(get("/api/user/loggedstatus"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().string(containsString("true")));

    }

    /**
     * Ensure getLogStatus returns false when no user is logged in
     * @throws Exception
     */
    @Test
    void testGetLogStatusWhenLoggedOut() throws Exception {
        ResultActions response = mockMvc.perform(get("/api/user/loggedstatus"));

        response.andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().string(containsString("false")));

    }

    /**
     * Expect a list of IDs to be returned when getUserList is called
     * @throws Exception
     */
    @Test
    @WithMockUser(username = "user")
    void testGetUserList() throws Exception {
        List<UserMovieList> listOfUserMovie = new ArrayList<>();
        UserMovieList userMovieList = new UserMovieList();
        userMovieList.setMovieId(1);
        userMovieList.setUserId("user");
        UserMovieList userMovieList2 = new UserMovieList();
        userMovieList2.setMovieId(2);
        userMovieList2.setUserId("user");
        listOfUserMovie.add(userMovieList);
        listOfUserMovie.add(userMovieList2);

        List<Integer> intList = listOfUserMovie.stream().map(UserMovieList::getMovieId).collect(Collectors.toList());

        Mockito.when(userMovieListRepository.findByUserId("user")).thenReturn(listOfUserMovie);

        ResultActions response = mockMvc.perform(get("/api/user/usermovies"));
        
        response.andExpect(status().isOk())
                .andExpect(content().json(intList.toString()));
    }

    /**
     * Ensure removeByUserIdAndMovieId is called with correct parameters
     * @throws Exception
     */
    @Test
    @WithMockUser(username = "user")
    void testRemoveFromList() throws Exception {
        
        ResultActions response = mockMvc.perform(delete("/api/user/removefromlist/{id}", 5));
        
        response.andExpect(status().isOk());
        

        Mockito.verify(userMovieListRepository, times(1)).removeByUserIdAndMovieId("user", 5);

    }

    /**
     * Ensure addToUserListIsCalled with the correct parameters
     * @throws Exception
     */
    @Test
    @WithMockUser(username = "user")
    void testAddToUserList() throws Exception {
        UserMovieList userMovie = new UserMovieList();
        userMovie.setUserId("user");
        userMovie.setMovieId(5);
        
        ResultActions response = mockMvc.perform(get("/api/user/movieadd/{id}", 5));
        
        response.andExpect(status().isOk());
        

        Mockito.verify(userMovieListRepository, times(1)).save(ArgumentMatchers.refEq(userMovie));

    }

    /**
     * Test the usermovielist class getters and setters
     * @throws Exception
     */
    @Test
    void testUserMovieList() throws Exception {
        UserMovieList userMovie = new UserMovieList();
        userMovie.setUserId("user");
        userMovie.setMovieId(5);
        
        assertEquals(5, userMovie.getMovieId());
        assertEquals("user", userMovie.getUserId());

        UserMovieId userMovieId = new UserMovieId();
        userMovieId.setMovieId(6);
        userMovieId.setUserId("newUser");

        assertEquals(6, userMovieId.getMovieId());
        assertEquals("newUser", userMovieId.getUserId());

    }
}
