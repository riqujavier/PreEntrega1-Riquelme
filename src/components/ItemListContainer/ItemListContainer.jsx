import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const ItemListContainer = ({ categoria }) => {
    
    const [peliculas, setPeliculas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchMovies();
    }, [currentPage, categoria]); 

    const fetchMovies = async () => {
        const API_KEY = '7602a30b9c6d1828ef7757d759a7eb04';
        let apiUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}&api_key=${API_KEY}`;

        if (categoria) {
            apiUrl += `&with_genres=${categoria}`;
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setPeliculas(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error al obtener películas:', error);
        }
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };  

    return (
        <div>
            <Container>
                <h1>ItemListContainer</h1>
                <ItemList peliculas={peliculas} />
                <div style={{ padding:'23px' }}>
                    <Button variant="dark" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</Button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <Button variant="dark" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</Button>
                </div>
            </Container>
        </div>
    )
}

export default ItemListContainer;
