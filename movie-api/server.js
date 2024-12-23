const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the CORS package
const app = express();
const PORT = 3000;

// Enable CORS for all domains
app.use(cors());

// Middleware để phân tích dữ liệu JSON
app.use(bodyParser.json());

// Dữ liệu mẫu cho bộ phim với hình ảnh
let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010, image: 'https://play-lh.googleusercontent.com/buKf27Hxendp3tLNpNtP3E-amP0o4yYV-SGKyS2u-Y3GdGRTyfNCIT5WAVs2OudOz6so5K1jtYdAUKI9nw8' },
    { id: 2, title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', year: 1999, image: 'https://play-lh.googleusercontent.com/YNVP7HOD-3Hi2SFdwfHWW1UMxWRpO4-GsAO-aAWniZNhboqHcBLNtAi2Sf7z9IUKE6LUpb6XkRs2IO7lYTEO' },
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014, image: 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { id: 4, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994, image: 'https://upload.wikimedia.org/wikipedia/vi/8/81/ShawshankRedemptionMoviePoster.jpg' },
    { id: 5, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008, image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg' },
    { id: 6, title: 'Fight Club', director: 'David Fincher', year: 1999, image: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg' },
    { id: 7, title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994, image: 'https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { id: 8, title: 'Forrest Gump', director: 'Robert Zemeckis', year: 1994, image: 'https://upload.wikimedia.org/wikipedia/vi/1/1d/Forrest_gump.jpg' },
    { id: 9, title: 'The Lion King', director: 'Roger Allers, Rob Minkoff', year: 1994, image: 'https://m.media-amazon.com/images/M/MV5BYjBkOWUwODYtYWI3YS00N2I0LWEyYTktOTJjM2YzOTc3ZDNlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
    { id: 10, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972, image: 'https://m.media-amazon.com/images/M/MV5BYTJkNGQyZDgtZDQ0NC00MDM0LWEzZWQtYzUzZDEwMDljZWNjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
   
];

// GET: Lấy tất cả các bộ phim
app.get('/movies', (req, res) => {
    res.json(movies);
});
// GET: Lấy một bộ phim theo ID
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;

    // Kiểm tra nếu ID không phải là số
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format');
    }
    // Tìm kiếm phim theo ID sau khi đảm bảo ID hợp lệ
    const movie = movies.find(m => m.id === parseInt(id));
    if (!movie) {
        return res.status(404).send('Movie not found');
    }
    // Trả về phim nếu tìm thấy
    res.json(movie);
});

// POST: Tạo một bộ phim mới
app.post('/movies', (req, res) => {
    // Lấy ID và các trường thông tin từ request body
    const { id, title, director, year, image } = req.body;

    // Kiểm tra nếu ID không phải là một số hợp lệ
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format. ID must be a valid number.');
    }
    // Kiểm tra nếu ID đã tồn tại
    const existingMovie = movies.find(m => m.id === parseInt(id));
    if (existingMovie) {
        return res.status(400).send('ID already exists. Please use a unique ID.');
    }
    // Tạo phim mới
    const newMovie = {
        id: parseInt(id), // Chuyển ID thành số nếu hợp lệ
        title,
        director,
        year,
        image
    };
    // Thêm vào danh sách phim
    movies.push(newMovie);
    // Trả về phim vừa tạo
    res.status(201).json(newMovie);
});



// PUT: Cập nhật một bộ phim theo ID
app.put('/movies/:id', (req, res) => {
    const id = req.params.id;

    // Kiểm tra nếu ID không phải là một số hợp lệ
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format. ID must be a valid number.');
    }

    // Tìm phim theo ID sau khi đảm bảo ID hợp lệ
    const movie = movies.find(m => m.id === parseInt(id));
    if (!movie) return res.status(404).send('Movie not found');

    // Cập nhật thông tin phim
    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    movie.image = req.body.image; // Cập nhật hình ảnh

    // Trả về phim đã cập nhật
    res.json(movie);
});


// PATCH: Cập nhật một phần của bộ phim theo ID
app.patch('/movies/:id', (req, res) => {
    const id = req.params.id;
    // Kiểm tra nếu ID không phải là một số hợp lệ
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID format. ID must be a valid number.');
    }
    // Tìm phim theo ID
    const movie = movies.find(m => m.id === parseInt(id));
    if (!movie) {
        return res.status(404).send('Movie not found');
    }

    // Kiểm tra và cập nhật các trường hợp nếu trường dữ liệu hợp lệ
    const validFields = ['title', 'director', 'year', 'image'];

    for (let field in req.body) {
        // Kiểm tra nếu trường không hợp lệ
        if (!validFields.includes(field)) {
            return res.status(400).send(`Invalid field: ${field}. Valid fields are title, director, year, and image.`);
        }

        // Kiểm tra nếu dữ liệu trường "year" không phải là số
        if (field === 'year' && isNaN(req.body[field])) {
            return res.status(400).send('Invalid year format. Year must be a valid number.');
        }

        // Cập nhật trường hợp hợp lệ
        movie[field] = req.body[field];
    }

    // Trả về phim đã cập nhật
    res.json(movie);
});

// DELETE: Xóa một bộ phim theo ID
app.delete('/movies/:id', (req, res) => {
    const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
    
    // Kiểm tra nếu phim không tồn tại
    if (movieIndex === -1) {
        return res.status(404).send('Movie not found');
    }

    // Xóa phim khỏi danh sách
    const deletedMovie = movies.splice(movieIndex, 1);

    // Trả về thông báo thành công kèm thông tin phim đã xóa
    res.status(200).json({
        message: 'Movie deleted successfully',
        movie: deletedMovie[0] // Trả về phim đã xóa
    });
});


// Khởi động máy chủ
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
