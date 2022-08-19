import httpService from './http.service';

const autoPartEndpoint = 'autoPart/';

const autoPartService = {
    get: async () => {
        const { data } = await httpService.get(autoPartEndpoint);
        return data;
    }
};

export default autoPartService;
