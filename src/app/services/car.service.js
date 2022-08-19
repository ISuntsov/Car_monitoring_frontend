import httpService from './http.service';

const carEndpoint = 'car/';

const carService = {
    create: async (payload) => {
        const { data } = await httpService.post(carEndpoint, payload);
        return data;
    },
    getCarsByUser: async (userId) => {
        const { data } = await httpService.get(carEndpoint, {
            params: {
                orderBy: 'userId',
                equalTo: `${userId}`
            }
        });
        return data;
    },
    update: async (carId, payload) => {
        const { data } = await httpService.patch(carEndpoint + carId, payload);
        return data;
    },
    remove: async (carId) => {
        const { data } = await httpService.delete(carEndpoint + carId);
        return data;
    }
};

export default carService;
