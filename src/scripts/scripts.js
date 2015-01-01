import Backbone from 'backbone';
import $ from 'jquery';

Backbone.$ = $;

import 'bootstrap';

import Router from './router';
var router = new Router();
$(() => Backbone.history.start({ pushState: true }));
