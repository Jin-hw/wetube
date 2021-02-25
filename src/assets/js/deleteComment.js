import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteBtn = document.querySelector(".jsDeleteComment");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (parent) => {
    commentList.removeChild(parent);
    decreaseNumber();
};

const sendComment = async (text, parent) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            text
        }
    });
    if (response.status === 200) {
        deleteComment(parent);
    }
};

const handleSubmit = (e) => {
    if (e.target.parentElement.className === "jsDeleteComment") {
        const text = e.target.parentElement.parentElement.firstChild.className;
        const parent = e.target.parentElement.parentElement;
        sendComment(text, parent);
    }
};

function init() {
    commentList.addEventListener("click", handleSubmit);
}

if (deleteBtn) {
    init();
}