import { Meteor } from "meteor/meteor";
import "../lib/collections";
import "./publish";

Posts.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  update: function () {
    return true;
  },
});
