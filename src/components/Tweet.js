import React,{useState} from "react";
import { dbService, storageService } from "fbase";

const Tweet = ({tweetObj , isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
     const onDeleteClick = async() => {
         const ok = window.confirm("Are you sure you want to delete this tweet?");
         console.log(ok);
         if(ok){
            await dbService.doc(`tweets/${tweetObj.id}`).delete();
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();      
//            tweetObj.tweet.delete(tweetObj.tweet.userObj);
         }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {  //여기가 작동을 안함 click으로 했을땐 되는데 submit일때 안댐
        console.log(newTweet);
        event.preventDefault();
        await dbService.doc(`tweets/${tweetObj.id}`).update({
          text: newTweet,
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewTweet(value);
    }
    return(
    <div>{
        editing ? (
        <>
        {isOwner && (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Edit this" value={newTweet} required onChange={onChange}/>
            <input type="submit" value="Update Tweet"  onSubmit={onSubmit} />
        </form>
        <button onClick={toggleEditing}>Cancel</button>
        </>
        )}
        </>
        ) : (
            <>
              <h4>{tweetObj.text}</h4>
              { tweetObj.attachmentUrl && (<img src={tweetObj.attachmentUrl} width="50px" height="50px"/>)}
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>Delete Tweet</button>
                  <button onClick={toggleEditing}>Edit Tweet</button>
                </>
              )}
            </>
          )}
        </div>
      );
    };
    export default Tweet;