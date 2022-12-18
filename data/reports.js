const mongoCollections = require('../config/mongoCollections');
const reports = mongoCollections.reports;
const { ObjectId } = require('mongodb');

async function getReportById(id)
{
    if (!id) 
    {
        throw 'Error: ID not provided';
    }

    if(typeof id =="string")
    {
        const objId = ObjectId.createFromHexString(id);

        id = objId;
    }

    const reportCollection = await reports();
    const reportFound = await reportCollection.findOne({_id: id}); 

    if (reportFound === null) 
    {
        throw 'Error: Report not found'; 
    }
    
    return reportFound; 
}

async function getAllReports() 
{
    try 
    {
        const reportCollection = await reports();
        const allReports = await reportCollection.find({}).toArray();
        return allReports;
    } 
    catch (error) 
    {
        console.log(error);
    }
}

async function addReport(userId,postId,reason)
{
    if (!postId || typeof postId !== "string") 
    {
        throw 'Error: Post ID not provided';
    }

    if (!userId || typeof userId !== "string") 
    {
        throw 'Error: User ID not provided';
    }

    if (!reason || !Array.isArray(reason)) 
    {
        throw 'Error: Reason not provided';
    }

    const reportCollection = await reports();
    const reportAdded = await reportCollection.findOne({userId: userId, postId: postId}); 

    if(reportAdded == null) 
    {
        let newReport = 
        {
            userId: userId,
            postId: postId,
            reasons: reason
        };

        const insertInfo = await reportCollection.insertOne(newReport);

        if (insertInfo.insertedCount === 0) 
        {
            throw 'Error: Report insertion failed';
        }

        const newId = insertInfo.insertedId;
        const reportFound = await this.getReportById(newId); 

        return reportFound; 
    }
    else
    {
        throw 'Error: Reported'; 
    };
}

async function removeReport(reportId) 
{
    if (!reportId || typeof reportId !== "string") 
    {
        throw 'Error: Report ID not provided';
    }

    let reportObjId = ObjectId.createFromHexString(reportId);

    const reportCollection = await reports()
    let deletionInfo = await reportCollection.removeOne({ _id: reportObjId });

    if (deletionInfo.deletedCount === 0) 
    {
        throw `Error: Report deletion failed`; 
    }

    return true;
}

module.exports = 
{
    getAllReports,
    getReportById,
    addReport,
    removeReport
}