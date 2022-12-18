const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const posts = mongoCollections.posts;
const comments = mongoCollections.comments;
const usersCollection = require("./users.js");

async function createPost(topic, userId, content, photoArr, tagArr)
{
    if (!topic || typeof topic !== "string")
    {
        throw 'Error: Topic not provided';
    }

    if (!userId || typeof userId !== "string")
    {
        throw 'Error: User ID not provided';
    }

    if (!content || typeof content !== "string")
    {
        throw 'Error: Content not provided';
    }

    if (!photoArr || !Array.isArray(photoArr))
    {
        throw 'Error: Photos not provided';
    }

    if (!tagArr || !Array.isArray(tagArr))
    {
        throw 'Error: Tags not provided';
    }

    if(tagArr.length === 0)
    {
        throw `Error : Please Provide a Tag before making the post`;
    }

    let postCollection = await posts();

    let newPost =
    {
        topic: topic,
        userId: userId,
        content: content,
        photoArr: photoArr,
        commentIdArr: [],
        tagArr: tagArr,
        likeCount: [],
        dislikeCount: [],
        viewCount: 0,
        date: new Date().toLocaleDateString()
    }

    let insertInfo = await postCollection.insertOne(newPost);

    if (insertInfo.insertedCount === 0)
    {
        throw 'Error: Post insertion failed';
    }

    let newId = insertInfo.insertedId;
    let finalPost = await getPostById(newId.toHexString());

    await usersCollection.addPostToUser(userId, newId.toHexString());

    return finalPost;
}

async function getAllPost()
{
    let postCollection = await posts();
    let postArray = await postCollection.find({}).toArray();

    return postArray;
}

async function getPostById(id)
{
    if (!id || typeof id !== "string")
    {
        throw 'Error: Post ID not provided';
    }
    let postCollection = await posts();
    let objID = ObjectId.createFromHexString(id);
    let postFound = await postCollection.findOne({ _id: objID });

    if (postFound === null)
    {
        throw 'Error: Post not found';
    }
    return postFound;
}

async function getPostByString(str)
{
    if (!str || typeof str !== "string")
    {
        throw 'Error: String not provided';
    }

    let postCollection = await posts();
    let regex = new RegExp(".*" + str + ".*", "i");

    let postFound = await postCollection.find({ $or: [{ topic: regex }, { content: regex }] }).toArray();

    return postFound;
}

async function addLikeCount(postId, userId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    if (!userId || typeof userId !== "string")
    {
        throw 'Error: User ID not provided';
    }

    let postObjId = ObjectId.createFromHexString(postId);
    let postFound = await getPostById(postId);

    if (postFound.dislikeCount.indexOf(userId) !== -1)
    {
        throw 'Error: Post already disliked';
    }

    if (postFound.likeCount.indexOf(userId) !== -1)
    {
        let index = postFound.likeCount.indexOf(userId);
        postFound.likeCount.splice(index, 1);

        let postCollection = await posts();
        let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { likeCount: postFound.likeCount } });

        if (updatedInfo.modifiedCount === 0)
        {
            throw 'Error : Like count failed';
        }
        return await getPostById(postId);
    }
    else
    {
        postFound.likeCount.push(userId);

        let postCollection = await posts();
        let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { likeCount: postFound.likeCount } });

        if (updatedInfo.modifiedCount === 0)
        {
            throw 'Error : Like count failed';
        }
        return await getPostById(postId);
    }
}

async function addDislikeCount(postId, userId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    if (!userId || typeof userId !== "string")
    {
        throw 'Error: User ID not provided';
    }

    let postObjId = ObjectId.createFromHexString(postId);
    let postFound = await getPostById(postId);

    if (postFound.likeCount.indexOf(userId) !== -1)
    {
        throw 'Error: Post already liked';
    }

    if (postFound.dislikeCount.indexOf(userId) !== -1)
    {
        let index = postFound.dislikeCount.indexOf(userId);

        postFound.dislikeCount.splice(index, 1);

        let postCollection = await posts();
        let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { dislikeCount: postFound.dislikeCount } });

        if (updatedInfo.modifiedCount === 0)
        {
            throw 'Error : Dislike count failed';
        }
        return await getPostById(postId);
    }
    else
    {
        postFound.dislikeCount.push(userId);

        let postCollection = await posts();
        let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { dislikeCount: postFound.dislikeCount } });

        if (updatedInfo.modifiedCount === 0)
        {
            throw 'Error : Dislike count failed';
        }
        return await getPostById(postId);
    }
}

async function getPostByOneTag(tag)
{
    if (!tag || typeof tag !== "string")
    {
        throw 'Error: Tag not provided';
    }

    let postCollection = await posts();
    let postFound = await postCollection.find({ tagArr: { $elemMatch: { $eq: tag } } }).toArray();

    return postFound;
}

async function getPostByMultTag(tags)
{
    if (!tags || !Array.isArray(tags))
    {
        throw 'Error: Tag not provided';
    }

    let postCollection = await posts();
    let postFound = await postCollection.find({ tagArr: { $all: tags } }).toArray();

    return postFound;
}

async function editContent(id, newContent)
{
    if (!id || typeof id !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    if (!newContent || typeof newContent !== "string")
    {
        throw 'Error: Content not provided';
    }

    let objId = ObjectId.createFromHexString(id);

    let postCollection = await posts();
    let updatedInfo = await postCollection.updateOne({ _id: objId }, { $set: { content: newContent } });

    return await getPostById(id);
}

async function addViewCount(postId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    let postObjId = ObjectId.createFromHexString(postId);
    let postFound = await getPostById(postId);
    let postCollection = await posts();
    let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { viewCount: postFound.viewCount + 1 } });

    if (updatedInfo.modifiedCount === 0)
    {
        throw 'Error: View count increment failed';
    }
    return await getPostById(postId);
}

async function removePost(postId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    await removeAllCommentsInPost(postId);

    let postObjId = ObjectId.createFromHexString(postId);
    let postCollection = await posts();
    let postInfo = await getPostById(postId);
    let deletionInfo = await postCollection.removeOne({ _id: postObjId });

    if (deletionInfo.deletedCount === 0)
    {
        throw `Error: Could not delete post with id ${id}`;
    }

    await usersCollection.removePostFromUser(postInfo.userId, postId);

    return true;
}

async function addCommentIdToPost(postId, commentId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    if (!commentId || typeof commentId !== "string")
    {
        throw 'Error: Comment ID not provided';
    }

    let postObjId = ObjectId.createFromHexString(postId);
    let postCollection = await posts();
    let postFound = await getPostById(postId);

    postFound.commentIdArr.push(commentId);

    let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { commentIdArr: postFound.commentIdArr } });

    return true;
}

async function removeCommentIdFromPost(postId, commentId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    if (!commentId || typeof commentId !== "string")
    {
        throw 'Error: Comment ID not provided';
    }

    let postObjId = ObjectId.createFromHexString(postId);
    let postCollection = await posts();
    let postFound = await getPostById(postId);
    let temp = [];

    for (let i = 0; i < postFound.commentIdArr.length; i++)
    {
        if (postFound.commentIdArr[i] !== commentId)
        {
          temp.push(postFound.commentIdArr[i]);
        }
    }

    postFound.commentIdArr = temp;

    let updatedInfo = await postCollection.updateOne({ _id: postObjId }, { $set: { commentIdArr: postFound.commentIdArr } });

    return true;
}

async function removeAllCommentsInPost(postId)
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }

    let commentCollection = await comments();
    let deletionInfo = await commentCollection.remove({ postId: postId });
    
    if (deletionInfo.deletedCount === 0)
    {
        throw `Error: Comment deletion failed`;
    }
    return true;
}

module.exports =
{
    createPost,
    getPostById,
    getAllPost,
    addViewCount,
    addLikeCount,
    addDislikeCount,
    getPostByMultTag,
    getPostByOneTag,
    getPostByString,
    editContent,
    removePost,
    addCommentIdToPost,
    removeCommentIdFromPost
}
