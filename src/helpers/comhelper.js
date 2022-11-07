import settings from '../config/settings';

export const comhelper = {
    test() {
        console.log('settings')
    },
    fetchOptions: {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    },
    async getSurveyData(countryId) {
        if (! countryId) {
            console.warn("From which country you want brands?")
            return;
        }
        const options = this.fetchOptions;
        // options.headers['Authorization'] = 'Bearer ' + this.getToken(); //@todo if this route have to be protected recomment this line

        const d = await fetch(settings.apiUri + 'country/' + countryId, options);
        const j = await d.json();
        return j;
    },
    async getAreas() {
        const d = await fetch(settings.apiUri + 'areas', this.fetchOptions);
        const j = await d.json();
        return j;
    },      
    async getArea(id) {
        const d = await fetch(settings.apiUri + 'areas/' + id, this.fetchOptions);
        const j = await d.json();
        return j.data;
    },    
    async getParcelsByAreaId(id) {
        const d = await fetch(settings.apiUri + 'parcels?area_id=' + id, this.fetchOptions);
        const j = await d.json();
        return j;
    },          
    async reserve(areaId, parcelId, userData, token = null) {

        // testing https://httpbin.org/post
        try {
            const rawResponse = await fetch(settings.apiUri + 'contracts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({data: {
                        area_id: areaId,
                        parcel_id: parcelId,
                        user_data: userData
                    }

                })
            }, 2000);
            const content = await rawResponse.json();
            console.log("Post response", content);
            return {content: content};

        } catch (err) {
            console.log("ERROR", err)
        }

    },    
    async sendMail(data) {
        try {
            const rawResponse = await fetch(settings.apiUri + 'email', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data
                })
            }, 2000);
            const content = await rawResponse.json();
            console.log("Post response", content);
            return {content: content};

        } catch (err) {
            console.log("ERROR", err)
        }        
    }
}