import {axiosInstance} from "./axiosInstance";
import {getLsAuthHeaders} from "./util";


const putAdvertEdit = async (id: number, data: unknown) => {
    return await axiosInstance.put(`/admin/advert/${id}/`, data,
        {
            headers: {
                "Authorization": getLsAuthHeaders()
            }
        });
};
const getAdvertEdit = async (id: number) => {
    return await axiosInstance.get(`/admin/advert/${id}/`, {
        headers: {
            "Authorization": getLsAuthHeaders()
        }
    });
};

export const AdminApi = {
    Advert: {
        putAdvertEdit,
        getAdvertEdit
    }
};