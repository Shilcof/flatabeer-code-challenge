class Beer {
    static all = []

    constructor({id, name, description, image_url, reviews}) {
        this.id = id,
        this.name = name,
        this.description = description,
        this.imageURL = image_url,
        this.reviews = reviews
        this.liElement = document.createElement("li")
        this.liElement.innerHTML = this.name
        this.liElement.dataset.id = this.id
        this.liElement.addEventListener("click",e=>{
            const beer=Beer.all.find(b=>b.id===parseInt(e.target.dataset.id))
            beer.render()
        })
        const beerIndex = document.getElementById("beer-index")
        beerIndex.appendChild(this.liElement)

        Beer.all.push(this)
    }

    static index(beers) {
        for (const beer of beers) {
            new Beer(beer)
        }

        Beer.all[0].render()
    }

    static update(beer) {
        const oldBeer = Beer.all.find(b=>b.id === beer.id)
        oldBeer.description = beer.description
    }

    static createReview(beer) {
        const oldBeer = Beer.all.find(b=>b.id === beer.id)
        oldBeer.reviews = beer.reviews
    }

    render() {
        const beerName = document.getElementById("beer-name")
        const beerImage = document.getElementById("beer-image")
        const beerDescription = document.getElementById("beer-description")
        const beerReviews = document.getElementsByClassName("reviews")[0]
        const updateBeer = document.getElementsByClassName("description")[0]
        const reviewForm = document.getElementsByClassName("review-form")[0]

        beerName.innerHTML = this.name
        beerImage.src = this.imageURL
        beerDescription.innerHTML = this.description

        beerReviews.innerHTML = ""
        let reviewId = 0
        for (const review of this.reviews) {
            const reviewLi = document.createElement("li")
            reviewLi.innerHTML = review
            const deleteReview = document.createElement("button")
            deleteReview.innerHTML = "Delete Review"
            deleteReview.dataset.id = reviewId
            deleteReview.addEventListener("click",BeerAPI.updateReviews)
            reviewLi.appendChild(deleteReview)
            beerReviews.appendChild(reviewLi)
            reviewId ++
        }

        updateBeer.dataset.id = this.id
        updateBeer.addEventListener("submit", e => {
            e.preventDefault()
            BeerAPI.update(e)
        })

        reviewForm.dataset.id = this.id
        reviewForm.addEventListener("submit", e=>{
            e.preventDefault()
            const reviewLi = document.createElement("li")
            const reviewText = document.getElementById("review-text")
            reviewLi.innerHTML = reviewText.value
            const deleteReview = document.createElement("button")
            deleteReview.innerHTML = "Delete Review"
            deleteReview.dataset.id = Beer.all.find(b=>b.id===parseInt(e.target.dataset.id)).reviews.length
            deleteReview.addEventListener("click",BeerAPI.updateReviews)
            reviewLi.appendChild(deleteReview)
            beerReviews.appendChild(reviewLi)
            BeerAPI.createReview(e)
        })
    }
}