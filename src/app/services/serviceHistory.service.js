import httpService from './http.service';

const serviceHistoryEndpoint = 'serviceHistory/';

const servicingHistoryService = {
    create: async (payload) => {
        const { data } = await httpService.post(serviceHistoryEndpoint, payload);
        return data;
    },
    getAllByCar: async (carId) => {
        const { data } = await httpService.get(serviceHistoryEndpoint, {
            params: {
                orderBy: 'carId',
                equalTo: `${carId}`
            }
        });
        return data;
    },
    update: async (noteId, payload) => {
        const { data } = await httpService.patch(serviceHistoryEndpoint + noteId, payload);
        return data;
    },
    remove: async (noteId) => {
        const { data } = await httpService.delete(serviceHistoryEndpoint + noteId);
        return data;
    }
};

export default servicingHistoryService;
