const express = require('express');
const router = express.Router();
const data = require("../data");
const commentData = data.comments;
const postData = data.posts;

router.get("/:id",async function(req,res) 
{
    try
    {
        const commentInfo = await commentData.getComment(req.params.id); 
        
        res.json(commentInfo);
    }
    catch(e)
    {
        res.status(404).json({message:"'Error : Comment not Found"}); 
    }
});

router.get("/",async function(req,res) 
{
    try
    {
        const commentList = await commentData.getAll();
        res.json(commentList);
    }
    catch(e)
    {
        res.status(500).send();
    }
});

router.post("/", async(req, res) => 
{ 
    let commentInfo = req.body;

    if (!commentInfo) 
    {
      res.status(400).json({ error: 'Error : No comment content' }); 

      return;
    }

    const {title, user, post, content} = commentInfo;

    if (!title || typeof title !== 'string') 
    {
        res.status(400).json({ error: 'Error : No Comment Title' });
        return;
    }

    if (!user) 
    {
        res.status(400).json({ error: 'Error : No User ID' });
        return;
    }

    if (!post) 
    {
        res.status(400).json({ error: 'Error : No Post ID' });
        return;
    }

    if (!content || typeof content !== 'string') 
    {
        res.status(400).json({ error: 'Error : No Comment Content' });

        return;
    }

    try 
    {
        const finalComment = await commentData.addComment(title, user, post, content);

        res.status(200).send(finalComment);
    }
    catch(e)
    {
        res.status(500).json({error: 'Error : Could Not add Comment'});
    }
});

router.delete("/:id", async (req, res) => 
{
    let tempId = req.params.id;

    try 
    {
      await commentData.getComment(tempId);
    } 
    catch (e) 
    {
      res.status(404).json({ error: "No Comment found" });
    }

    try 
    {
      const sendMessage = await commentData.remove(tempId);

      res.status(200).send(sendMessage);
    } 
    catch (e) 
    {
      res.status(500).json({ error: e });
    }
});

async function getListOfCommentsInPost(postId)
{
  const currentPost = await post.getPost(postId);
  const listOfComments = currentPost.comments;
    
  return listOfComments;
}

module.exports = router;