const express = require("express");
const router = express.Router();
const data = require("../data");

const postData = data.posts;
const userData = data.users;
const commentData = data.comments;
const reportData = data.reports;

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get('/postInfo/:id', async (req, res) => 
{
    try 
    {
        let userLogin = null;

        if (req.session) 
        {
            if (req.session.userId)
            {
                userLogin = await userData.getUserById(req.session.userId);
            }
        }

        await postData.addViewCount(req.params.id); 

        let postInfo = await postData.getPostById(req.params.id);
        let temp = await userData.getUserById(postInfo.userId);

        postInfo.nickname = temp.nickname;

        let commentsInfo = [];
        for (let i = 0; i < postInfo.commentIdArr.length; i++) 
        {
            let thisComment = await commentData.getCommentById(postInfo.commentIdArr[i]);
            let commentCreaterInfo = await userData.getUserById(thisComment.userId);

            thisComment.userNickname = commentCreaterInfo.nickname;
            commentsInfo.push(thisComment);
        }
        
        res.render('posts/posts.handlebars', { postInfo, commentsInfo, userLogin });
    } 
    catch (error) 
    {
        res.redirect('/homePage');
    }
});

router.get('/like', async (req, res) => 
{
    try 
    {
        if (!req.session)
        {
            throw "Error : No Cookie";
        }
            
        if (!req.session.userId)
        {
            throw "Error : Not Logged In";
        }
            
        if (!req.query)
        {
            throw "Error : Cannot Like";
        }
            
        if (!req.query.postId)
        {
            throw "Error : Post Id needed to like";
        }
            
        let updatedPost = await postData.addLikeCount(req.query.postId, req.session.userId);

        res.send(updatedPost);
    } 
    catch (error) 
    {
        res.status(404).send(error);
    }
});

router.get('/dislike', async (req, res) => 
{
    try 
    {
        if (!req.session)
        {
            throw "Error : No Cookie"
        }
            
        if (!req.session.userId)
        {
            throw "Error : Not Logged In";
        }
            
        if (!req.query)
        {
            throw "Error : Cannot Dislike";
        }
            
        if (!req.query.postId)
        {
            throw "Error : Post Id needed to dislike";
        }
            
        let updatedPost = await postData.addDislikeCount(req.query.postId, req.session.userId);

        res.send(updatedPost);
    } 
    catch (error) 
    {
        res.status(404).send(error);
    }
});

router.post('/editContent', async (req, res) => 
{
    try 
    {
        if (!req.session)
        {
            throw "Error : No Cookie";
        }

        if (!req.session.userId)
        {
            throw "Error : Not Logged In"; 
        }
            
        if (!req.body)
        {
            throw "Error : Content required"; 
        }
            
        if (!req.body.postId)
        {
            throw "Error : Post ID required";
        }
            
        if (!req.body.newContent)
        {
            throw "Error : Content required";
        }
            
        let postToEdit = await postData.getPostById(req.body.postId);
        if (postToEdit.userId !== req.session.userId)
        {
            throw "Error : IDs do not match"; 
        }
            
        let updatedPost = await postData.editContent(req.body.postId, req.body.newContent);
        res.redirect("http://localhost:3000/users/account");
    } 
    catch (error) 
    {
        res.redirect("http://localhost:3000/users/account");
    }
});

router.post('/delete',async (req, res) =>
{
    try
    {
        if(!req.session) 
        {
            throw 'Error : No Cookie';
        }

        if(!req.session.userId)
        {
            throw 'Error : Not Logged In';
        }

        if(!req.body.postId)
        {
            throw 'Error : Post ID required';
        }

        let postInfo = await postData.getPostById(req.body.postId);
       
        if(postInfo.userId!==req.session.userId) 
        {
            throw "Error : IDs do not match";
        }

        let postDelete = await postData.removePost(req.body.postId);
        
        res.send(postDelete);

    }
    catch(error)
    {
        res.status(404).send(error);
    }
})

router.post('/addComment', async (req, res) => 
{
    try 
    {
        if (!req.session)
        {
            throw "Error : No Cookie"
        }

        if (!req.session.userId)
        {
            throw "Error : Not Logged In"
        }
            
        if (!req.body)
        {
            throw "Error : Content required";
        }
            
        if (!req.body.postId)
        {
            throw "Error : Post ID required";
        }
            
        if (!req.body.commentContent)
        {
            throw "Error : Content required";
        }
            
        let newComment = await commentData.addComment(req.body.postId, req.session.userId, req.body.commentContent);
        res.redirect("http://localhost:3000/posts/postInfo/"+req.body.postId);
    } 
    catch (error) 
    {
        res.redirect("http://localhost:3000/posts/postInfo/"+req.body.postId);
    }
});

router.post('/deleteComment', async (req, res) => 
{
    try {
        
        if (!req.session)
        {
            throw "Error : No Cookie";
        }
            
        if (!req.session.userId)
        {
            throw "Error : Not Logged In";
        }
            
        if (!req.body)
        {
            throw "Error : Content required";
        }
            
        if (!req.body.postId)
        {
            throw "Error : Post ID required";
        }
            
        if (!req.body.commentId)
        {
            throw "Error : Comment ID required";
        }
            
        await commentData.removeComment(req.body.postId,req.body.commentId);

        res.redirect("http://localhost:3000/posts/postInfo/"+req.body.postId);
    } 
    catch (error) 
    {
        res.status(404).send(error);
    }
});

router.post('/removeReport', async (req, res) => 
{
    try 
    {
        if (!req.session)
        {
            throw 'Error : No Cookie';
        } 
        if (!req.session.userId)
        {
            throw 'Error : Not Logged In';
        } 
        if (!req.body.reportId)
        {
            throw 'Error : Report ID required';
        } 

        let deletePerson = await userData.getUserById(req.session.userId)
        let postDelete = null;

        if (deletePerson.admin === false)
        {
            res.send("Error: Access Denied");
        }   
        else 
        {
            reportDelete = await reportData.removeReport(req.body.reportId);
            res.send(reportDelete);
        }

    } 
    catch (error) 
    {
        res.status(404).send(error);
    }
})

router.post('/removeReportAndPost', async (req, res) => {
    try 
    {
        if (!req.session)
        {
            throw 'Error : No Cookie';
        } 

        if (!req.session.userId)
        {
            throw 'Error : Not Logged In';
        } 

        if (!req.body.reportId)
        {
            throw 'Error : Report ID required';
        } 

        let deletePerson = await userData.getUserById(req.session.userId)
        let postDelete = null;
        
        if (deletePerson.admin === false)
        {
            res.send("Error: Access Denied")
        }
        else 
        {
            postDelete = await postData.removePost(req.body.postId);
            reportDelete = await reportData.removeReport(req.body.reportId);
            res.send(true);
        }

    } 
    catch (error) 
    {
        res.status(404).send(error);
    }
})

module.exports = router;