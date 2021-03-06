"use strict";

app.controller("ViewAdoptersController", function ($scope, gitHubFactory, authFactory, getUserInfo, pushUserStuffFactory, theDeleteFactory, groupingPointsFactory, $route, useAchieve) {

    let currentUser = authFactory.getCurrentUser();

    $scope.milestones = () => {
        gitHubFactory.getMilestones()
            .then((allExercises) => {
                $scope.allExercises = allExercises;
                $scope.exerciseLength = allExercises.length;
                });
            };
    
    $scope.milestoneGetIt = (MilestoneNumber)=>{
        $scope.allExercises = gitHubFactory.milestoneIt(MilestoneNumber);
    };

    $scope.showAllEvents = function () {
        getUserInfo.getAllEvents()
            .then((events) => {
                $scope.allEvents = events;
            });
    };

    $scope.showGroupProjects = function () {
        getUserInfo.getAllGroupProjs()
            .then((projects) => {
                $scope.allGroupProjects = projects;
            });
    };

    getUserInfo.getUserExercises(currentUser)
        .then((exercises) => {
            $scope.exerciseDeets = getUserInfo.showUserExercises(exercises);
        });
    
    $scope.userExercises = (currentUser)=>{
            getUserInfo.userExerciseCount(currentUser);
            getUserInfo.userEventCount(currentUser);
            getUserInfo.userGroupCount(currentUser);
        };


    $scope.userExercises(currentUser);
    

    getUserInfo.getUserDetails(currentUser)
    .then((userDeets)=>{
        $scope.deets = getUserInfo.showUserDetails(userDeets);
        });
  
    getUserInfo.getUserEvents(currentUser)
        .then((allUserEvents) => {
            $scope.userEventDeets = getUserInfo.showUserEvents(allUserEvents);
        });
    
    getUserInfo.getUserGroups(currentUser)
        .then((allUserGroups) => {
            $scope.userGroupDeets = getUserInfo.showUserGroups(allUserGroups);
        });

    $scope.showUserAchievements = (currentUser)=>{
        useAchieve.achievements(currentUser);
    };

    $scope.UserPoints = getUserInfo.getUserPoints(currentUser);
    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.addExercise = function(exerciseId){
        pushUserStuffFactory.addUserExercise(exerciseId);
    };

    $scope.addEvent = function(eventId){
        pushUserStuffFactory.addUserEvent(eventId);
    };

    $scope.addGroupProject = function(projectId){
        pushUserStuffFactory.addUserGroupProject(projectId);
    };

///////////START DELETING//////////////
    $scope.deleteSingleEvent = function (id) {
        theDeleteFactory.deleteEvent(id)
            .then(() => {
                $scope.showAllEvents();
            });
    };

    $scope.deleteSingleGroupProj = function (id) {
        theDeleteFactory.deleteGroupProject(id)
            .then(() => {
                $scope.showGroupProjects();
            });
    };

    $scope.getAllHousePoints = function(){
        groupingPointsFactory.getHousePoints("Ventum");
        groupingPointsFactory.getHousePoints("Aqua");
        groupingPointsFactory.getHousePoints("Ignis");
        groupingPointsFactory.getHousePoints("Terra");
        groupingPointsFactory.getCohortPoints(19);
    };

    $scope.getAllHousePoints();
    $scope.milestones();
    $scope.showGroupProjects();
    $scope.showAllEvents();

});