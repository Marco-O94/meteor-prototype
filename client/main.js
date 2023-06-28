import { Template } from "meteor/templating";
import { ReactiveDict } from "meteor/reactive-dict";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./main.html";
import "../lib/collections";

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  // the client subscribes to all the data from that publication, it only runs on client
  Meteor.subscribe("posts.public");
});

// Specify the correct template to use where data goes in the HTML
Template.postGrid.helpers({
  posts: function () {
    return Posts.find({}, { sort: { createdAt: -1 } }).fetch();
  },
});

Template.postItem.events({
  "click .delete"(event) {
    event.preventDefault();
    Posts.remove(this._id);
  },
  "click .private"(event) {
    event.preventDefault();
    Posts.update(this._id, { $set: { private: true } });
  },
});

Template.body.events({
  "submit .new-post"(event) {
    event.preventDefault();
    const target = event.target;
    const title = target.postTitle.value;
    const subTitle = target.postSubtitle.value;
    const description = target.postDescription.value;

    Posts.insert({
      title,
      subTitle,
      description,
      private: false,
      createdAt: new Date(),
    });

    target.postTitle.value = "";
    target.postSubtitle.value = "";
    target.postDescription.value = "";
  },
});
