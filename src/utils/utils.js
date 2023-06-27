import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salt)
}

const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

const createToken = (payload, expTime) => {
    return jwt.sign({
        ...payload,
        issuer: 'api.bookshelf',
        audience: 'api.bookshelf'
    }, process.env.JWT_SECRET_KEY, {expiresIn: expTime})
}

const getNextAndPrevPageRequestURLs = (page, recordCount, URL) => {
    const nextPageNum = page && recordCount > page * 10 ? Number(page) + 1 : null
    const prevPageNum = page && page !== "1" && page !== "0" ? Number(page) - 1 : null

    const nextPageURL = nextPageNum ? `${URL.protocol}://${URL.host}${URL.baseUrl}/?page=${nextPageNum}` : null
    const prevPageURL = prevPageNum ? `${URL.protocol}://${URL.host}${URL.baseUrl}/?page=${prevPageNum}` : null

    return {
        nextPageURL,
        prevPageURL
    }
}

export {
    hashPassword,
    verifyPassword,
    createToken,
    getNextAndPrevPageRequestURLs
}