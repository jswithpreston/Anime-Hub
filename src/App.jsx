import React, {useEffect} from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import AnimeCard from "./components/AnimeCard.jsx";
import { useDebounce } from 'react-use'
import {getTrendingAnime, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.jikan.moe/v4';

const App = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [animeList, setAnimeList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = React.useState('');
    const [trendingAnimes, setTrendingAnimes] = React.useState([]);

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 800, [searchTerm]);

    const fetchAnime = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('')
        try {
            // Jikan uses /anime for search and /top/anime for discovery
            const endpoint = query
                ? `${API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=20`
                : `${API_BASE_URL}/top/anime?limit=20`;

            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(`Failed to fetch anime.`);
            }

            const data = await response.json();

            // Jikan returns results in a 'data' property, not 'results' or 'Search'
            if (!data.data || data.data.length === 0) {
                setErrorMessage('No anime found.');
                setAnimeList([])
                return;
            }

            setAnimeList(data.data);

            if (query && data.data.length > 0) {
                // Keep your Appwrite logic, but pass the Jikan object
                await updateSearchCount(query, data.data[0]);
            }
        } catch (error) {
            console.error(`Error fetching anime: ${error}`)
            setErrorMessage(`Error fetching anime. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingAnimes = async () => {
        try {
            const anime = await getTrendingAnime()
            setTrendingAnimes(anime)
        } catch (error) {
            console.error(`Error fetching anime: ${error}`);
        }
    }

    useEffect(() => {
        fetchAnime(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingAnimes();
    }, [])

    return (
        <main>
            <div className="pattern"/>
            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>Find <span className="text-gradient">Anime</span> You'll enjoy without the Hassle</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    {/* ... Trending section stays the same ... */}

                    <h2>All Anime</h2>
                    {isLoading ? (
                        <Spinner />
                    ): errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {animeList.map((anime) => (
                                <AnimeCard key={anime.mal_id} anime={anime} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}
export default App