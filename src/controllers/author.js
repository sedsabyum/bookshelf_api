import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()


const getAuthorList = async (req, res) => {
    const {page} = req.query
    const recordsToSkip = page && page !== "1" ? (Number(page) - 1) * 10: 0


    try {
        const authorCount = await prisma.author.count()
        const authors = await prisma.author.findMany({
            skip: recordsToSkip,
            take: 10
        })

        const nextPageNum = page && authorCount > page * 10 ? Number(page) + 1 : null
        const prevPageNum = page && page !== "1" && page !== "0" ? Number(page) - 1 : null

        const nextPageURL = nextPageNum ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${nextPageNum}` : null
        const prevPageURL = prevPageNum ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${prevPageNum}` : null

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
        res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}


const getSingleAuthor = async (req, res) => {
    const {authorId} = req.params

    try {
        const author = await prisma.author.findUnique({
            where: {
                id: authorId
            }
        })

        if(!author) {
            return res.status(404).json({
                status: "FAILED",
                data: {
                    error: "Author with provided id not found!"
                }
            })
        }

        res.status(200).json({
            status: "OK",
            data: author
        })
    } catch (err) {
        res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}

const getAuthorBooks = async (req, res) => {
    const {authorId} = req.params
    const {page} = req.query
    const recordsToSkip = page && page !== "1" ? (Number(page) - 1) * 10: 0


    try {
        const authorBookCount = await prisma.book.count({
            where: {
                authorId: authorId
            }
        })

        const authorBooks = await prisma.book.findMany({
            skip: recordsToSkip,
            take: 10,
            where: {
                authorId: authorId
            }
        })

        const nextPageNum = page && authorBookCount > page * 10 ? Number(page) + 1 : null
        const prevPageNum = page && page !== "1" && page !== "0" ? Number(page) - 1 : null
        
        const nextPageURL = nextPageNum ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${nextPageNum}` : null
        const prevPageURL = prevPageNum ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${prevPageNum}` : null


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
        res
            .status(err?.status || 500)
            .send({status: "FAILED", data: {error: err?.message || err}})
    }
}


export {
    getAuthorBooks,
    getSingleAuthor,
    getAuthorList
}