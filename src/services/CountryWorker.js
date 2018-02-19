import {error, warn, log} from './../Omni';

const CountryWorker = {
    getAllCountries: async () => {
        return await fetch('http://foodspace.in/wp-content/locations')
            .then((response) => response.json()).then((json) => {
            if (json.length != 0) {
                let data = {}
                for (let country of json) {
                    data[`${country.alpha2Code}`] = country.name
                }
                return data
            }
            else
                callback({})
        }).catch((error) => warn(error))
   },
}

export default CountryWorker
