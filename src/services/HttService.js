    import axios from "axios";

    const allflags = axios.create({
        baseURL: 'https://restcountries.com/v3.1/all?fields=name,flags'
    })

    const api = axios.create({
        baseURL: 'https://restcountries.com/v3.1/'

    })


    export async function getCountryCurrency(currency){
        try{
            const response = await api.get(`currency/${currency}`)
            return response.data
        }catch(error){
            console.error('error searching for currency', error);
            throw error; 
        }
    }
    export async function getCoutryByName(pais) {  // Receber o parâmetro pais
        try {
        
            const response = await api.get(`name/${pais}`);
            return response.data;
        } catch (error) {
    
            console.error('error searching by name ', error);
            throw error; 

        }
    }
    
    export async function getCountryLanguage(language){
        try{
            const response = await api.get(`lang/${language}`)
            return response.data
        }catch(error){
            console.error('error searching by language ', error);
            throw error; 
        }
    }
    export async function getCountryName(name){
        try{
            const response = await api.get(`name/${name}`)
            console.log(response.value)
            return response.data
        }catch(error){
            console.error('error searching for name', error);
            throw error;
        }
    }
    export async function getAllFlags(){
        try{
            const response = await allflags.get()
            return response.data
        }catch(error){
            console.error('error getting all countries', error)
            throw error;
        }
    }