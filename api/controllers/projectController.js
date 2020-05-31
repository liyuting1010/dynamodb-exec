const AWS = require("aws-sdk");

const credentials = new AWS.SharedIniFileCredentials({profile: 'aws-training-profile'});
AWS.config.update({
    credentials,
    region: 'ap-southeast-1',
});

const documentClient = new AWS.DynamoDB.DocumentClient();
const documentName = 'Project_yutingli';

exports.delete_a_project = function delete_a_project(req, res) {
    const params = {
        TableName: documentName,
        Key: {
            projectName: req.params.projectName,
            projectType: req.params.projectType,
        },
        ConditionExpression: 'projectName = :name and projectType = :type',
        ExpressionAttributeValues: {
            ':name': req.params.projectName,
            ':type': req.params.projectType,
        },
    };

    documentClient.delete(params, function (err) {
        if (err) {
            res.json({
                error: `fail to delete item from ${documentName}, ${err}`,
            });
        } else {
            res.json({
                message: `success to delete a project from ${documentName}`,
                data: req.params,
            })
        }
    });
};

exports.update_a_project = function update_a_project(req, res) {
    const params = {
        TableName: documentName,
        Key: {
            projectName: req.params.projectName,
            projectType: req.params.projectType,
        },
        UpdateExpression: 'set memberName = :name, startDate = :date',
        ExpressionAttributeValues: {
            ':name': typeof req.body.memberName !== "undefined" ? req.body.memberName : '',
            ':date': typeof req.body.startDate !== "undefined" ? req.body.startDate : '',
        },
        ReturnValues: 'UPDATED_NEW',
    };

    documentClient.update(params, function (err, data) {
        if (err) {
            res.json({
                error: `fail to update item from ${documentName}, ${err}`,
            });
        } else {
            res.json({
                message: `success to update a project from ${documentName}`,
                data,
            })
        }
    });
};

exports.find_a_project = function find_a_project(req, res) {
    const params = {
      TableName: documentName,
      Key: {
          projectName: req.params.projectName,
          projectType: req.params.projectType,
      }
    };

    documentClient.get(params, function (err, data) {
        if (err) {
            res.json({
                error: `fail to get item from ${documentName}, ${err}`,
            });
        } else {
            res.json({
                message: `success to get a project from ${documentName}`,
                data,
            })
        }
    })
};

exports.create_a_project = function create_a_project(req, res) {
    const params = {
        TableName: documentName,
        Item: req.body,
    };

    documentClient.put(params, function (err) {
        if (err) {
            res.json({
                error: `fail to add item to ${documentName}, ${err}`,
            });
        } else {
            res.json({
                message: `success to add a project in ${documentName}`,
                data: params.Item
            })
        }
    });
};

exports.list_all_projects = function list_all_projects(req, res) {
    const params = {
        TableName: documentName,
        IndexName: 'memberName-index',
        KeyConditionExpression: '#name = :name',
        ExpressionAttributeNames: {
            '#name': 'memberName',
        },
        ExpressionAttributeValues: {
            ':name': 'yuting',
        }
    };

    documentClient.query(params, function (err, data) {
        if (err) {
            res.json({
                error: `fail to query from ${documentName}, ${err}`,
            });
        } else {
            const response = [];
            console.log(`Querying all yuting's projects for ${documentName}.`);
            data.Items.forEach(function(item) {
                response.push(item)
            });
            res.json(response)
        }
    });
};
