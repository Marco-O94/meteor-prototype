import { Meteor } from "meteor/meteor";
import "../lib/collections";
Meteor.publish("posts.public", function () {
  return Posts.find({
    private: { $ne: false },
  });
});
Meteor.publish("posts.private", function () {
  return Posts.find({
    private: { $ne: true },
  });
});
