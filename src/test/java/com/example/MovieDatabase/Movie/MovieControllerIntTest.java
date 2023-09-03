package com.example.MovieDatabase.Movie;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class MovieControllerIntTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testAddNewMovie() throws Exception{
        Movie movie = new Movie();
        movie.setId(5);
        movie.setTitle("movie");
        movie.setPoster("poster.link");
        movie.setOverview("Fun movie");
        
        // ResultActions response = mockMvc.perform(post("/api/employees")
        //         .contentType(MediaType.APPLICATION_JSON)
        //         .content(objectMapper.writeValueAsString(movie)));

        RequestBuilder request = MockMvcRequestBuilders.post("/api/employees")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(movie));
        MvcResult result = mockMvc.perform(request).andReturn();
        assertEquals(movie.toString(), result.toString());



    }

    @Test
    void testGetAllMovies() {

    }

    @Test
    void testGetMovie() {

    }

    @Test
    void testGetMoviesSearch() {

    }

    @Test
    void testGetRandomMovies() {

    }
}
