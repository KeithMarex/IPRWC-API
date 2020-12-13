const db = require('../db');

exports.getFirstQuestion = async (collectionId) => {
    return await db.query("SELECT * FROM question_texts GROUP BY id HAVING id = ( SELECT child_id FROM nodes WHERE collection_id = ${collectionId} AND parent_id IS NULL AND TYPE = 'question' LIMIT 1)", {collectionId: collectionId}).then(result => {
        return result[0];
    });
}

exports.getAnswersForQuestion = async (collectionId, questionId) => {
    return await db.query("SELECT * FROM answer_texts GROUP BY id HAVING id IN (SELECT child_id FROM nodes WHERE collection_id = ${collectionId} AND parent_id = ${questionId} AND type = 'answer');", {
        collectionId: collectionId,
        questionId: questionId
    }).then(result => {
        return result;
    });
}

exports.getNotificationsForAnswer = async (collectionId, answerId) => {
    return await db.query("SELECT * FROM notification_texts GROUP BY id HAVING id IN (SELECT child_id FROM nodes WHERE collection_id = ${collectionId} AND parent_id = ${answerId} AND type = 'notification');", {
        collectionId: collectionId,
        answerId: answerId
    }).then(result => {
        return result;
    });
}

exports.getQuestionsForAnswer = async (collectionId, answerId) => {
    return await db.query("SELECT * FROM question_texts GROUP BY id HAVING id IN (SELECT child_id FROM nodes WHERE collection_id = ${collectionId} AND parent_id = ${answerId} AND type = 'question') LIMIT 1;", {
        collectionId: collectionId,
        answerId: answerId
    }).then(result => {
        return result[0];
    });
}