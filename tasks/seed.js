const connection = require('../config/mongoConnection');
const users = require('../data/users.js');
const posts = require('../data/posts.js');
const comments = require('../data/comments.js');

async function main() 
{
    //Get Connection for the Database

    const db = await connection();
    await db.dropDatabase();
    
    //Admin access for all the team members

    let user1 = await users.createUser("darshan@gmail.com", "$2a$05$hGKCQy82K7Yjq7Lf54FYXeXZNVIkufcBthiG8mV.PRGylELE7s8eu", "Darshan");
    let user1Id = user1._id.toHexString();
    await users.setAdminAccess(user1Id);

    let user2 = await users.createUser("priyanka@gmail.com", "$2a$05$Sz758o/85mcxjYjtKoFZn.ztsW8nwpyTLWroSWwGgtkgCH5f/M75u", "Priyanka");
    let user2Id = user2._id.toHexString();
    await users.setAdminAccess(user2Id);

    let user3 = await users.createUser("vinay@gmail.com", "$2a$05$Qdtxn7F.H5UDaZVjmEHXOe/nTH2aQO3gJX7uttMICzuFwCuUiiLNu", "Vinay");
    let user3Id = user3._id.toHexString();
    await users.setAdminAccess(user3Id);

    let user4 = await users.createUser("sharon@gmail.com", "$2a$05$QNB6j9aaD7JHOuHiIriO7uYBdMUHTsiwMNolGXz77SqOHVtsbKqq.", "Sharon");
    let user4Id = user4._id.toHexString();
    await users.setAdminAccess(user4Id);

    //Seed Posts by User 1 - Darshan

    let post1 = await posts.createPost("Super HIIT", user1Id, "Super HIIT is an exercise strategy that alternates periods of short intense anaerobic exercise with less-intense recovery periods", ["http://localhost:3000/public/images/superHiit.jpg"], ["HIIT"]);
    let post1Id = post1._id.toHexString();

    let post2 = await posts.createPost("Adrenaline Rush HIIT", user1Id, "Adrenaline Rush is a fast-paced, High Intensity Interval training Workout that loads the body's major muscle groups quickly, raises body temperature and pushes your body's performance to the max. Follow these workouts to keep the heart pumping!", ["http://localhost:3000/public/images/adrenalineRush.jpg", "http://localhost:3000/public/images/adrenalineRush.jpg"], ["HIIT"]);
    let post2Id = post2._id.toHexString();

    let post3 = await posts.createPost("Brutal HIIT", user1Id, "Sometimes you want to know, just how far can you go? How much can you do? Where do the limits lie? When is it enough? Brutal HIIT is a difficulty level five workout that hands you the keys to use to unlock the secrets inside yourself. If you have all these questions, Brutal HIIT provides all the answers!", ["http://localhost:3000/public/images/brutal.jpg", "http://localhost:3000/public/images/brutalBody.jpg"], ["HIIT"]);
    let post3Id = post3._id.toHexString();

    //Seed Posts by User 2 - Priyanka

    let post4 = await posts.createPost("Carpe Diem HIIT", user2Id, "If seizing the day is your thing then Carpe Diem should be your workout. This is a high-speed, high-intensity, Level IV workout that will put you in the sweatzone from the very first set and keep you there for every set after that. Get your knees to waist height during High Knees and don't forget to pump your arms. Everything is time-based which means that reps really matter. Try to get as many as you can in each exercise and maintain or improve the level in each set. ", ["http://localhost:3000/public/images/carpeDiem.jpg"], ["HIIT"]);
    let post4Id = post4._id.toHexString();

    let post5 = await posts.createPost("Death Wish HIIT", user2Id, "Deathwish, is a difficulty level IV workout that lives up to its name by providing a high-intensity, short burst level of activity that's followed by another and then another. Actually it is pretty relentless in the way it piles on pressure to your aerobic recovery system and hyperloads your lungs. Still, you're not looking at this because you want an east ride, right?", ["http://localhost:3000/public/images/deathWish.jpg"], ["HIIT"]);
    let post5Id = post5._id.toHexString();

    let post6 = await posts.createPost("Chair Pose Yoga", user2Id, "What is Chair Pose? Chair Pose is a standing yoga posture that tones the entire body, particularly the thighs. It involves sitting back as if you're about to fall seated into a chair, but holding the position so your muscles stabilize and strengthen.", ["http://localhost:3000/public/images/chairPose.jpg"], ["Yoga"]);
    let post6Id = post6._id.toHexString();

    //Seed Posts by User 3 - Vinay

    let post7 = await posts.createPost("Downward Dog Yoga", user3Id, "The pose has the head down, ultimately touching the floor, with the weight of the body on the palms and the feet. The arms are stretched straight forward, shoulder width apart; the feet are a foot apart, the legs are straight, and the hips are raised as high as possible.", ["http://localhost:3000/public/images/downwardDog.jpg"], ["Yoga"]);
    let post7Id = post7._id.toHexString();

    let post8 = await posts.createPost("WarriorII Yoga", user3Id, "Warrior II (Virabhadrasana II) — The front knee is bent and the hips are turned to the side with the arms parallel.", ["http://localhost:3000/public/images/warriorII.jpg"], ["Yoga"]);
    let post8Id = post8._id.toHexString();

    let post9 = await posts.createPost("Pilates Roll Over - Pilates", user3Id, "Reach your legs up and over your head. Keep your hands pressed down on the mat and end with your feet and legs parallel to the ground. Exhale and slowly lower your legs back to the 90-degree position, placing one vertebra at a time onto the mat. Repeat at least 3 times.", ["http://localhost:3000/public/images/pilatesRollOver1.jpg", "http://localhost:3000/public/images/pilatesRollOver2.gif"], ["Pilates"]);
    let post9Id = post9._id.toHexString();

    //Seed Posts by User 4 - Sharon

    let post10 = await posts.createPost("Pilates Hundred - Pilates", user4Id, "The hundred is a classic Pilates mat exercise. You will be asked to perform it during the beginning of almost any Pilates class you take. The exercise is named after the 100 beats of your arms made while holding your legs extended and your head and shoulders off the mat.", ["http://localhost:3000/public/images/pilatesHundred.jpg"], ["Pilates"]);
    let post10Id = post10._id.toHexString();

    let post11 = await posts.createPost("One Leg Circle - Pilates", user4Id, "Leg circles, also known as single or one-legged circles, are a great Pilates mat exercise for strengthening the core, glutes, and hip muscles, and improving pelvic stability.", ["http://localhost:3000/public/images/oneLegCircle.jpg"], ["Pilates"]);
    let post11Id = post11._id.toHexString();

    let post12 = await posts.createPost("Double Leg Stretch - Pilates", user4Id, "A Double Leg Stretch is a pilates exercise that strengthens your upper and lower abs and helps stabilize your core and protect your low back. The Double Leg Stretch teaches your body to stay stable while at the same time pulling the arms and legs out and in. This is a challenging move, but if you learn how to do the Double Leg Stretch correctly you will feel your abs get stronger and tighter.", ["http://localhost:3000/public/images/doublLegStretch.jpg"], ["Pilates"]);
    let post12Id = post12._id.toHexString();

    let post13 = await posts.createPost("Bicep Curls - Weights", user4Id, "The Bicep Curl is an essential strength training exercise you can do with dumbbells, a barbell, resistance bands or a cable machine to build strength in the upper arms. Specifically, a bicep curl works the muscles in the front of the arm.", ["http://localhost:3000/public/images/bicepCurls.jpg"], ["Weights"]);
    let post13Id = post13._id.toHexString();

    let post14 = await posts.createPost("Shoulder Press - Weights", user4Id, "The shoulder press is one of the best exercises for strengthening your shoulders and upper back. The biggest benefactor of the shoulder press is the front portion of your shoulder muscle (anterior deltoid) but you'll also be working out your deltoids, triceps, trapezius and pecs.", ["http://localhost:3000/public/images/shoulderPress.jpg"], ["Weights"]);
    let post14Id = post14._id.toHexString();

    let post15 = await posts.createPost("Tricep Kickbacks - Weights", user4Id, "Bend forward slightly at the waist so your torso is almost parallel to the floor. Engage your core and keep your head, neck, and spine in one line. Place one hand on your thigh for support. On an exhale, engage your triceps as you slowly extend your arm back as far as you can, keeping your arm in tight by your side.", ["http://localhost:3000/public/images/tricepKickbacks.jpg"], ["Weights"]);
    let post15Id = post15._id.toHexString();



    let post16 = await posts.createPost("Everyday Yoga Stance to do now! - Yoga", user4Id, "Here are some of the yoga workouts posture than can be easily done day to day. Try out these workouts for a quick sweat session!", ["http://localhost:3000/public/images/everydayYoga.jpg"], ["Yoga"]);
    let post16Id = post16._id.toHexString();

    let post17 = await posts.createPost("Arnold Press - Weights", user4Id, "Regular gymgoers can benefit from the Arnold press as it can help increase shoulder strength, muscle mass, and attack all three heads of the deltoids at once. If you are limited in time and want stronger, broader shoulders, the Arnold press can give you the efficient one-two punch you're looking for.", ["http://localhost:3000/public/images/arnoldPress.jpg"], ["Weights"]);
    let post17Id = post17._id.toHexString();

    let post18 = await posts.createPost("Quick HIIT - HIIT", user4Id, "Sometimes you just need to HIIT it QUICK! Go flat out, de-stress, take over the world - you can do this! It has it all: cardio, combat, abs and core; all combined in one bad-ass workout. Keep your body straight while holding the plank. Don't drop your arms when transitioning from punches to squat hold punches.", ["http://localhost:3000/public/images/quick.jpg"], ["HIIT"]);
    let post18Id = post18._id.toHexString();

    let post19 = await posts.createPost("Types of Pilates to do this Summer - Pilates", user4Id, "'Pilates is most definitely exercise and when performed correctly it's very challenging,' says Long. 'As an exercise, it counts as a muscle-strengthening workout. Plus, you're able to work the whole body through Pilates. It challenges your lower and upper body and demands core strength.", ["http://localhost:3000/public/images/typesPilates.jpg"], ["Pilates"]);
    let post19Id = post19._id.toHexString();

    let post20 = await posts.createPost("Run and Gun - HIIT", user4Id, "HIIT workouts are all the rage and Run And Gun doe snot disappoint. It is fast, light, uses every major muscle group there is and gets you in the sweat zone within the first three minutes (set 1). The question after that is just how much can you push yourself so you can improve faster? Can your knees go higher during High Knees? Can you pump your arms more? Can you punch faster? can your hooks be sharper and your upper cuts driven by your bending your knees more? These are questions you get the chance to find the answer to. ", ["http://localhost:3000/public/images/run.jpg"], ["HIIT"]);
    let post20Id = post20._id.toHexString();

    let post21 = await posts.createPost("Bakasana - Yoga", user4Id, "The main focus on the Bakasana yoga pose is the wrists. It strengthens the arms and wrists, thereby reducing the risk of injury to it. It also aids in healing carpal tunnel syndrome which is common among people who use their wrists for work. Doing this pose increases the efficiency of the wrists and arms.", ["http://localhost:3000/public/images/bakasana.jpg"], ["Yoga"]);
    let post21Id = post21._id.toHexString();


    //Seed comments for posts by Admin Users for stored data

    let comment1 = await comments.addComment(post1Id, user1Id, "This looks rather tiring, init?");
    let comment2 = await comments.addComment(post1Id, user4Id, "I am ready to try this one out, in a week or so?");
    let comment3 = await comments.addComment(post1Id, user4Id, "This looks rather tiring, init?");

    let comment4 = await comments.addComment(post14Id, user1Id, "This looks rather tiring, init?");
    let comment5 = await comments.addComment(post14Id, user1Id, "I am ready to try this one out, in a week or so?");
    let comment6 = await comments.addComment(post12Id, user3Id, "This looks rather tiring, init?");

    let comment7 = await comments.addComment(post11Id, user1Id, "This looks rather tiring, init?");
    let comment8 = await comments.addComment(post11Id, user3Id, "I am ready to try this one out, in a week or so?");
    let comment9 = await comments.addComment(post10Id, user2Id, "This looks rather tiring, init?");

    let comment10 = await comments.addComment(post2Id, user2Id, "This looks rather tiring, init?");
    let comment11 = await comments.addComment(post2Id, user4Id, "I am ready to try this one out, in a week or so?");
    let comment12 = await comments.addComment(post3Id, user4Id, "This looks rather tiring, init?");

    await db.serverConfig.close();
    console.log('Done!');
}

main().catch((error) => 
{
    console.log(error);
});