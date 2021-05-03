import React, {useEffect, useState} from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        dbService.collection("tweets").orderBy("createdAt","desc").onSnapshot(snapshot =>{
            const tweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
    }, []);
    const onSubmit = async (event) => {
        let attachmentUrl = "";
        event.preventDefault();
        if( attachment !== ""){
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
        const response = await fileRef.putString(attachment, "data_url");
        attachmentUrl = await response.ref.getDownloadURL();
    };
        const tweetObj = {
            text : tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,//creatorId      
            attachmentUrl      
        };
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    };
    
    const onChange = (event) => {
        const{
            target:{value}
        } = event;
        setTweet(value);
    };
    const onFileChange = (event) => {
        console.log(event.target.files);
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachmentClick = () => setAttachment(null); 
    return(
    <div>
        <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={tweet} placeholder="what's on your mind" maxLength={120}/>
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="tweet" />
        { attachment && (
            <div>
            <img src={attachment} width="50px" height="50px"/>
            <button onClick={onClearAttachmentClick}>Clear</button>
            </div>
        ) }
        </form>
        <div >
            {tweets.map((tweet) => (
                 <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}> </Tweet> 
            )
            )}
        </div>
    </div>
    );
};
export default Home;