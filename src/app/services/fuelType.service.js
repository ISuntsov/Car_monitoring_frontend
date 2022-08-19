import httpService from './http.service';

const fuelTypeEndpoint = 'fuelType/';

const fuelTypeService = {
    get: async () => {
        const { data } = await httpService.get(fuelTypeEndpoint);
        return data;
    }
};

export default fuelTypeService;
