const rootURL = "http://localhost:3000"

class BeerAPI {
    static baseURL = rootURL + "/beers"

    static confObj(method, body) {
        return {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
    }

    static index = () => {
        fetch(this.baseURL)
            .then(res=>res.json())
            .then(json=>Beer.index(json))
    }

    static update = (e) => {
        fetch(`${this.baseURL}/${e.target.dataset.id}`, this.confObj("PATCH",{description: e.target.querySelector("#beer-description").value}))
            .then(res=>res.json())
            .then(json=>Beer.update(json))
    }

    static createReview = (e) => {
        console.log("whut?")
        const reviews = [...Beer.all.find(b=>b.id===parseInt(e.target.dataset.id)).reviews, e.target.querySelector("#review-text").value]
        fetch(`${this.baseURL}/${e.target.dataset.id}`, this.confObj("PATCH",{reviews}))
            .then(res=>res.json())
            .then(json=>Beer.createReview(json))
    }

    static updateReviews = (e) => {
        const id = parseInt(document.getElementsByClassName("review-form")[0].dataset.id)
        const beer = Beer.all.find(b=>b.id===id)
        const reviewId = parseInt(e.target.dataset.id)
        const reviews = [...beer.reviews.slice(0, reviewId), ...beer.reviews.slice(reviewId + 1)]
        beer.reviews = reviews
        beer.render()
        fetch(`${this.baseURL}/${id}`, this.confObj("PATCH",{reviews}))
            .then(res=>res.json())
            .then(json=>null)
    }

}