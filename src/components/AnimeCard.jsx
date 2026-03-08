import React from "react";

const AnimeCard = ({ anime: { title, score, images, aired, type } }) => {
    return (
        <div className="anime-card">
            <img
                src={images?.jpg?.image_url ? images.jpg.image_url : '/no-movie.png'}
                alt={title}
            />
            <div className="mt-4">
                <h3>{title}</h3>

                <div className="content">
                    <div className="rating">
                        <img src="star.svg" alt="star icon" />
                        {/* Jikan uses 'score' instead of 'vote_average' */}
                        <p>{score ? score.toFixed(1) : `N/A`}</p>
                    </div>
                    <span>.</span>
                    {/* Using 'type' (TV, Movie, OVA) as a substitute for language */}
                    <p className="lang">{type}</p>
                    <span>.</span>
                    <p className="year">
                        {/* Jikan provides year in aired.prop.from.year */}
                        {aired?.prop?.from?.year ? aired.prop.from.year : `N/A`}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AnimeCard;