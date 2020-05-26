'use strict'

const axios = require('axios');
const { validate } = use('Validator');
const Config = use('Config');
const omdbkey = Config.get('app.omdbkey')

class SearchController {
    async index({ request, view, session, response }) {
        const rules = {
            search: 'required'
        }
        const validation = await validate(request.all(), rules);

        //console.log(request.all())
        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll();
            return response.redirect('back');
        }

        //search on OMDB API    
        const searchString = request.input('search');
        console.log(omdbkey + '<<-->>' + searchString)
        const results = await axios.get(`http://www.omdbapi.com/?apikey=${omdbkey}&s=${searchString}`)
        console.log(results)
        return view.render('pages/search-result', {
            results: results.data.Search
        });
    }
}

module.exports = SearchController