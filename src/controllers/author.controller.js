import authorService from "../services/author.service.js"


const getAuthorList = async (req, res, next) => {
    try {
        const {authorCount, authors, nextPageURL, prevPageURL} = await authorService.getAuthorList({
            page: req.query.page,
            protocol: req.protocol,
            host: req.get('host'),
            baseUrl: req.baseUrl
        })

        res.status(200).json({
            status: "OK",
            data: {
                count: authorCount,
                next: nextPageURL,
                prev: prevPageURL,
                results: authors
            }
        })
    } catch (err) {
        next(err)
    }
}


const getSingleAuthor = async (req, res, next) => {
    const {authorId} = req.params


    try {
        const author = await authorService.getSingleAuthor(authorId)

        res.status(200).json({
            status: "OK",
            data: author
        })
    } catch (err) {
        next(err)
    }
}

const getAuthorBooks = async (req, res, next) => {
    try {
        const {authorBookCount, authorBooks, prevPageURL, nextPageURL} = await authorService.getAuthorBooks({
            page: req.query.page,
            authorId: req.params.authorId,
            protocol: req.protocol,
            host: req.get('host'),
            baseUrl: req.baseUrl
        })

        res.status(200).json({
            status: "OK",
            data: {
                count: authorBookCount,
                next: nextPageURL,
                prev: prevPageURL,
                results: authorBooks
            }
        })
    } catch (err) {
        next(err)
    }
}


export {
    getAuthorBooks,
    getSingleAuthor,
    getAuthorList
}