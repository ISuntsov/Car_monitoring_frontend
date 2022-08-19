import httpService from './http.service';

const fuelingHistoryEndpoint = 'fuelingHistory/';

const fuelingHistoryService = {
    create: async (payload) => {
        const { data } = await httpService.post(fuelingHistoryEndpoint, payload);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(fuelingHistoryEndpoint);
        return data;
    },
    update: async (noteId, payload) => {
        const { data } = await httpService.patch(fuelingHistoryEndpoint + noteId, payload);
        return data;
    },
    remove: async (noteId) => {
        const { data } = await httpService.delete(fuelingHistoryEndpoint + noteId);
        return data;
    }
};

export default fuelingHistoryService;
