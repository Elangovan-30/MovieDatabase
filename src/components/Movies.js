import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_KEY } from "../config";
import MovieCard from "./MovieCard";

function Movies() {
    const [movieResults, setMovieResults] = useState([]);
    const [searchitem,setsearchitem] = useState('');
    
    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=day&y=2023`)
            .then(function(data) {
                console.log(data);
                return data.json();
            })
            .then(function(response) {
                console.log(response);
                if (response.Response === 'True') {
                    setMovieResults(response.Search);
                }
            })
            .catch(function(err) {
                console.error(err);
                setMovieResults([]);
            });
    }, []);
    const handleSearchForm =(event)=>{
        event.preventDefault();
        console.log("keypresed",searchitem);
        if(searchitem !==''){
            // console.log("if statement called");
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchitem}`)
            .then(function(data) {
                console.log(data);
                return data.json();
            })
            .then(function(response) {
                console.log(response);
                if (response.Response === 'True') {
                    setMovieResults(response.Search);
                }
                else{
                    setsearchitem([]);
                }
            })
            .catch(function(err) {
                console.error(err);
                setMovieResults([]);
                
            });

        }


    }
    return (
        <section>
            <Container>
                <form onSubmit={handleSearchForm}>
                    <div>
                        <input type="text" 
                        placeholder="movies Name"
                        onChange={(e)=>setsearchitem(e.target.value)}
                        value={searchitem}/>

                        <input type="submit" 
                        value="search"/>
                    </div>
                    
                </form>
            </Container>
            {movieResults.length > 0 ? (
                 <Container>
                    <Row>
                        {movieResults.map((movie) => {
                            return (
                                <Col key={movie.imdbID}>
                                    <MovieCard movie={movie} />
                                </Col>
                            )
                        })}
                    </Row>
               </Container>
            ) : null}
        </section>
    )
}

export default Movies;