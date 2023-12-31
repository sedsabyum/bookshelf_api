import bookService from "../services/book.service.js";


const getBookList = async (req, res, next) => {
    try {
        const {bookCount, books, nextPageURL, prevPageURL} = await bookService.getBookList({
            page: req.query.page,
            tags: req.query.tags,
            protocol: req.protocol,
            host: req.get('host'),
            baseUrl: req.baseUrl
        })

        res.status(200).json({
            status: "OK",
            data: {
                count: bookCount,
                next: nextPageURL,
                prev: prevPageURL,
                results: books
            }
        })
    } catch (err) {
        next(err)
    }
}

const getSingleBook = async (req, res, next) => {
    const {bookId} = req.params

    try {
        const book = await bookService.getSingleBook(bookId)

        res.status(200).json({
            status: "OK",
            data: book
        })
    } catch (err) {
        next(err)
    }
}

const getBookTags = async (req, res, next) => {
    try {
        const bookTags = await bookService.getBookTags()

        res.status(200).json({
            status: "OK",
            data: bookTags
        })
    } catch (err) {
        next(err)
    }
}


export {
    getBookList,
    getSingleBook,
    getBookTags
}