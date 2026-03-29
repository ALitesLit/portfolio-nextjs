import $api from "./api";

import skills from "@/mock/skills.json";
import social from "@/mock/social_network.json";
import projects from "@/mock/projects.json";
import category from "@/mock/get_category.json";
import sertefies from "@/mock/sertefies.json";


const mock = process.env.NEXT_PUBLIC_REACT_APP_MOCK_ENV;


const getProjects = ( selectCategory ) => {
    const projects_list = projects.sort(
        (a, b) => a.importance > b.importance
    )
    

    if ( selectCategory == 0 ) {
        return projects_list
    } else {
        return projects_list.filter(
            (i) => i?.category?.filter((i) => i.id == selectCategory).length
        );
    }
}


export const fetchSocialService = async () => {
    if (mock) {
        return social;
    } else {
        const { data } = await $api.get("social_network");

        return data;
    }
}


export const fetchSkillsService = async () => {
    if (mock) {
        return skills;
    } else {
        const { data } = await $api.get("skills");

        return data;
    }
}


export const fetchСategoryService = async () => {
    if (mock) {
        return category;
    } else {
        const { data } = await $api.get("get_category");

        return data;
    }
}


export const fetchProjectsService = async ( loadMore, selectCategory ) => {
    if (mock) {
        const projects_list = getProjects(selectCategory);

        return loadMore ? projects_list : projects_list.slice(0, 3);
    } else {
        const url = loadMore ? `get_category/${selectCategory}` : `get_project/top_project?idCategory=${selectCategory}`;

        const { data } = await $api.get(url);

        return data;
    }
}


export const fetchCertefiesService = async () => {
    if (mock) {
        return sertefies;
    } else {
        const { data } = await $api.get("sertefies");

        return data;
    }
}