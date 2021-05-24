import Review from './Review'

interface MovieDetail {
    genre: Array<number>,
    id: number,
    image: string,
    overview: string,
    poster_path: string,
    release_date: Date,
    reviews: Array<Review>,
    title: string,
}

export default MovieDetail