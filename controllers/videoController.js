import { query } from "express";

import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({}).sort({ _id: -1});
        res.render("home", {pageTitle: "Home", videos });
    } catch(error){
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: []});
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy }
    } = req;
    let videos = [];
    try{
        videos = await Video.find({ 
            title: {$regex: searchingBy, $options: "i" }
        }) //regex는 포함하는 단어를 찾는 법, $options: "i"는 insensitive로 대소문자 관계없이 검색
    } catch(error){
        console.log(error);
    }
    res.render("search", {pageTitle: "Search", searchingBy, videos});
};

export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const { 
        body: { title, description },
         file : { path }
        } = req;
    const newVideo = await Video.create({
        fileURL: path,
        title,
        description
    });
    console.log(newVideo);
    // To Do: Upload and Save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const{
        params:{id}
    }=req;
    try{
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", {pageTitle: video.title, video });
    } catch(error){
        res.redirect(routes.home);
    }
}

export const  getEditVideo= async (req, res) => {
    const {
        params:{id}
    } = req;
    try{
        const video = await Video.findById(id);
        res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const postEditVideo = async (req, res) => {
    const {
      params: { id },
      body: { title, description }
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const  deleteVideo= async(req, res) => {
    const {
        params: {id}
    } = req;
    try {
        await Video.findOneAndDelete({ _id: id});
    } catch(error){
        console.log(error);
    }
    res.redirect(routes.home);
}
