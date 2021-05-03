import React, {useEffect, useState} from "react";
import { dbService } from "fbase";
import Tweet from "components/Tweet";

const Home = ({userObj}) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    useEffect(() => {
        dbService.collection("tweets").onSnapshot(snapshot =>{
            const tweetArray = snapshot.docs.map(doc => ({
                id:doc.id,
                ...doc.data(),
            }));
            setTweets(tweetArray);
        })
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            text : tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,//creatorId
        });
        setTweet("");
    };
    const onChange = (event) => {
        const{
            target:{value}
        } = event;
        setTweet(value);
    };
    return(
    <div>
        <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={tweet} placeholder="what's on your mind" maxLength={120}/>
        <input type="submit" value="tweet" />
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