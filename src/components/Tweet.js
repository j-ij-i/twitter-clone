import React from "react";

const Tweet = ({tweetObj , isOwner}) => (
    <div>
    <h1>{tweetObj.text}</h1>{
        isOwner && (<>
    <button>delete Tweet</button>
    <button>edit Tweet</button></>)}
    </div>);

    export default Tweet;