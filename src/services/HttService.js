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
        console.error('erro ao buscar por moedas', error);
        throw error; // Aqui o erro é lançado corretamente
    }
}
export async function getCountryName(name){
    try{
        const response = await api.get(`name/${name}`)
        console.log(response.value)
        return response.data
    }catch(error){
        console.error('erro ao buscar por moedas', error);
        throw error; // Aqui o erro é lançado corretamente
    }
}
export async function getAllFlags(){
    try{
        const response = await allflags.get()
        return response.data
    }catch(error){
        console.error('erro ao obter bandeiras', error)
        throw error;
    }
}