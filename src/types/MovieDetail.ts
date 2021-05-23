import Review from './Review'

interface MovieDetail {
    id: number,
    reviews: Array<Review>,
    title: string,
    overview: string,
    release_date: Date,
    poster_path: string,
}

export default MovieDetail