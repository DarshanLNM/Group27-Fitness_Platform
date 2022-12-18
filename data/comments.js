const mongoCollections = require('../config/mongoCollections');
const comments = mongoCollections.comments;
const postsCollection = require("./posts.js");
const { ObjectId } = require('mongodb');

async function getCommentById(id)
{
    if (!id || typeof id !== "string")
    {
        throw 'Error: ID not provided';
    }

    let commentCollection = await comments();
    let objId = ObjectId.createFromHexString(id);

    let foundComment = await commentCollection.findOne({ _id: objId });

    if (foundComment === null)
    {
        throw 'Error: Commenmt ID not found ';
    }
        
    return foundComment;
}

async function addComment(postId, userId, content) 
{

    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }
        
    if (!userId || typeof userId !== "string")
    {
        throw 'Error: User ID not provided';
    }
        
    if (!content || typeof content !== "string")
    {
        throw 'Error: Content ID not provided';
    }

    let commentCollection = await comments();
    let newComment = 
    {
        postId: postId,
        userId: userId,
        content: content,
        date: new Date().toLocaleDateString()
    }

    let insertInfo = await commentCollection.insertOne(newComment);
    if (insertInfo === null)
    {
        throw 'Error: Comment insertion failed';
    }
        
    let newCommentId = insertInfo.insertedId;
    let finalComment = await getCommentById(newCommentId.toHexString());

    let tempComment = await postsCollection.addCommentIdToPost(postId, newCommentId.toHexString());

    return finalComment;
}

async function removeComment(postId, commentId) 
{
    if (!postId || typeof postId !== "string")
    {
        throw 'Error: Post ID not provided';
    }
        
    if (!commentId || typeof commentId !== "string")
    {
        throw 'Error: Comment ID not provided';
    }

    await postsCollection.removeCommentIdFromPost(postId, commentId);

    let commentObjId = ObjectId.createFromHexString(commentId);
    let commentCollection = await comments();

    let deletionInfo = await commentCollection.removeOne({ _id: commentObjId });
    if (deletionInfo.deletedCount === 0) 
    {
        throw `Error: Comment not deleted`;
    }

    return true;
}

module.exports =
{
    getCommentById,
    addComment,
    removeComment,
}
