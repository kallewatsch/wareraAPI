import React from "react"
import { useDispatch } from 'react-redux'
import Button from "react-bootstrap/Button"
import { useLazyGetArticleQuery, useLazyGetArticlesPaginatedQuery } from "../api"
import { setData } from "../appSlice"

export const Articles = () => {

    const [getArticle] = useLazyGetArticleQuery()
    const [getArticlesPaginated] = useLazyGetArticlesPaginatedQuery()

    const dispatch = useDispatch()

    const handleGetArticle = event => {
        dispatch(setData("soon"))
        /* getRegionById(data).then(result => {
            dispatch(setData(result.data.result.data))
        }) */
    }

    let data = {limit: 10, type: "weekly"}
    const handleGetArticlesPaginated = event => {
        getArticlesPaginated(data).then(result => {
            dispatch(setData(result.data.result.data))
        })
    }

    return <>
        <Button onClick={handleGetArticle}>getArticle</Button>
        <Button onClick={handleGetArticlesPaginated}>getArticlesPaginated</Button>
    </>
}

export default Articles