export interface ISocailResponse {
    id: number,
    name: string,
    site: string,
    photo: string,
};


export interface ICategoryResponse {
    id: number,
    name: string,
    onHide: boolean,
};


export interface IProjectResponse {
    id: number,
    name: string,
    category: ICategoryResponse[],
    deskription: string | null,
    short_deskription: string | null,
    site: string | null,
    experience: string[] | null,
    importance: number,
};


export interface ISertefiesResponse {
    id: number,
    name: string,
    site: string | null,
    photo: string,
};


export interface IExperienceResponse {
    id: number,
    name: string,
    category: ICategoryResponse,
    importance: number,
};


export interface ISkillResponse {
    category: string,
    experienceList: IExperienceResponse[],
};