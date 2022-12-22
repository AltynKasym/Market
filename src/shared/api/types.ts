export interface ServerFieldErrors {
    [key: string]: string[];
}


//<editor-fold desc="Adverts">

export interface Advert {
    id: number;
    name: string;
    sub_category: number;
    city: number;
    start_price: number;
    end_price: number;
    promote: PromoteType;
    advert_image: { image: string }[];
    advert_image_count: number;
    advert_contact: { phone_number: string }[];
    created_date: string;
    description: string;
    views: number;
    reportText?:string; // это поле добавляется с объекта жалоб
    isFavorite: boolean;  // этого поля нет в моделе с бекенда, оно устанавливается на клиенте
}

export interface AdvertsResponse {
    count: number;
    results: Advert[];
}

export type AdvertsRequestOrdering = ("created_date" | "-created_date" | "start_price" | "-start_price");

export interface AdvertsRequestQueryParams {
    categoryId?: number;
    subCategoryId?: number;
    cityId?: number;
    startPrice?: number;
    endPrice?: number;
    noImage?: boolean;
    limit?: number;
    offset?: number;
    search?: string;
    ordering?: AdvertsRequestOrdering;
}

export interface FavoriteIdsResponse {
    adverts: number[];
    user_id: number;
}

export const enum AdvertStatus {
    Active = "act",
    Inactive = "inact",
    Review = "on_r",
}

export interface MyAdvertsResp {
    id: number;
    views: number;
    name: string;
    start_price: number;
    sub_category: string;
    created_date: string;
    advert_image: { image: string }[];
    status: string;
    promote: string;
    description: string;
    contact_views: number;
}

// TODO: сравнить с детаельным адвертом
// TODO: переименовать
export interface MyAdvertsResp2 {
    id: number;
    promote: PromoteType;
    owner: {
        id: string;
        first_name: string;
        last_name: string;
    };
    advert_contact: { phone_number: string }[];
    city: string; // TODO: бек должен возвращать id, пока сделаю под строку
    advert_image: { image: string }[];
    views: number;
    contact_views: number;
    name: string;
    description: string;
    start_price: number;
    end_price: number;
    email: string;
    wa_number: string;
    created_date: string;
    status: AdvertStatus;
    category: number;
    sub_category: number;
}

//</editor-fold desc="Adverts">


//<editor-fold desc="CommonEntities">
//</editor-fold desc="CommonEntities">


export interface RegisterData {
    last_name: string;
    first_name: string;
    email: string;
    phone_number: string;
    password: string;
    password2: string;
    policy_agreement: boolean;
}

export interface RegisterResponse {
    id: number;
    last_name: string;
    first_name: string;
    email: string;
    phone_number: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ChangeUserRequest {
    last_name: string;
    first_name: string;
    email: string;
    phone_number: string;
    old_password: string;
    new_password: string;
}

export interface User {
    user_id: number;
    last_name: string;
    first_name: string;
    email: string;
    phone_number: string;
    is_superuser: boolean;
    refresh: string;
    access: string;
}


export interface Category {
    id: number;
    name: string;
    icon: string;
    advert_count: number;
}

export interface SubCategory {
    id: number;
    name: string;
    category: number;
    advert_count: number;
}


// TODO: DSds
export interface AdvertCreateRequestArgs {
    owner: number;
    category: number;
    sub_category: number;
    promote: string;
    city: number;
    name: string;
    description: string;
    start_price: number;
    end_price: number;
    email: string;
    wa_number: string;
    // status: stringl
}


export type PromoteType = ("vip" | "highlighted" | "urgently" | "");

export interface Promote {
    id: number;
    title: string;
    description: string;
    price: number;
    types: PromoteType;
}


interface Owner {
    id: number;
    first_name: string;
    last_name: string;
}

export interface DetalAdvert {
    id: number;
    promote: PromoteType;
    advert_contact: { phone_number: string }[];
    city: string;
    advert_image: { image: string }[];
    views: string;
    name: string;
    description: string;
    start_price: number;
    end_price: number;
    wa_number: string;
    created_date: string;
    status: string;
    owner: Owner;
    category: number;
    email: string;
    sub_category: number;
}

export interface ContactAdminData {
    name: string;
    feedback_title: string;
    message: string;
    email: string;
}

export interface City {
    id: number;
    name: string;
}

export interface phoneNumber {
    phone_number: string;
}

export interface images {
    image: string;
}

interface ownerType {
    id: number;
    first_name: string;
}

export interface ProductData {
    id: number;
    advert_contact: phoneNumber[];
    promote: PromoteType;
    city: number;
    advert_image: images[];
    views: number;
    name: string;
    description: string;
    start_price: number;
    end_price: number;
    wa_number: string;
    created_date: string;
    status: string;
    owner: ownerType;
    category: string;
    sub_category: number;
}

export interface HelpData {
    id: number;
    question: string;
    answer: string;
    view: number;
    help_category: number;
}

export interface HelpCategory {
    id: number;
    title: string;
}

export interface UsersProps {
    id: number;
    first_name: string;
    last_name: string;
    date_joined: string;
    email: string;
    phone_number: string;
}

export interface UpdateUserData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

export interface updateDataArg {
    id: string | undefined;
    data: UpdateUserData;
}

interface link {
    id: number;
    link: string;
    status: string;
}

export interface linkResponse {
    links: link;
    text: string;
}

export interface ParamsRes {
    userId: number | undefined;
    helpId: string | undefined | number;
}


export interface FeedbackRes {
    id: number;
    name: string;
    feedback_title: string;
    email: string;
    message: string;
    date: string;
}