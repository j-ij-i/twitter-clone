import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default ({ userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick =() =>{
        authService.signOut();
        history.push("/");
    };
    // const getMyTweets = async() => {
    //     const tweets = await dbService
    //     .collection("tweets")
    //     .where("creatorId", "==", userObj.uid)
    //     .orderBy("createAt")
    //     .get();
    //     console.log(tweets.docs.map((doc) => doc.data()));
    // }
    // useEffect(() => {
    //     getMyTweets();
    // }, []);
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            })
        }
    };
    return(
    <>
    <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName}/>
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    )
}