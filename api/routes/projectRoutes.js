'use strict';
module.exports = function (app) {
    const projectList = require('../controllers/projectController');

    app.route('/projects')
        .get(projectList.list_all_projects)
        .post(projectList.create_a_project);


    app.route('/projects/:projectName/:projectType')
        .get(projectList.find_a_project)
        .put(projectList.update_a_project)
        .delete(projectList.delete_a_project);
};
