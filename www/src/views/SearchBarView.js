define(function(require, exports, module){
  'use strict';

  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var InputSurface = require('famous/surfaces/InputSurface');
  var ScrollView = require('famous/views/ScrollView');

  var betterReads = require('../utils/BetterReads');

  function SearchBarView(){
    View.apply(this, arguments);

    this.resultsList = [];

    _addSearchField.call(this);
    _addSearchButton.call(this);
    _bindEvents.call(this);
  }

  SearchBarView.prototype = Object.create(View.prototype);
  SearchBarView.prototype.constructor = SearchBarView;

  SearchBarView.DEFAULT_OPTIONS = {
    inputSize: 50
  };

  SearchBarView.prototype.getValue = function(){
      return this.searchInput._element.value;
    };

  function _addSearchField(){
    this.searchInput = new InputSurface({
      size: [window.innerWidth - this.options.inputSize, this.options.inputSize],
      placeholder: '    Type Here',
      properties: {
        textAlign: 'left',
        backgroundColor: '#999',
        border: 'none',
        padding: 50,
        outline: 'none'
      }
    });

    this.searchInputModifier = new StateModifier({
      align: [0, 0],
      origin: [0, 0]
    })

    this.add(this.searchInputModifier).add(this.searchInput);
  }

  function _addSearchButton(){
    this.searchButton = new Surface({
      size: [this.options.inputSize, this.options.inputSize],
      content: '<i class="fa fa-search"></i>',
      properties: {
        textAlign: 'center',
        lineHeight: 2.5,
        backgroundColor: '#393',
        color: 'black',
        cursor: 'pointer',
      }
    });

    this.searchButtonModifier = new StateModifier({
      align: [1, 0],
      origin: [1, 0]
    });

    this.add(this.searchButtonModifier).add(this.searchButton);
  }

  function _bindEvents(){
    this.searchButton.on('click', function(){
      this._eventOutput.emit('searchClick');
    }.bind(this));
  }

  module.exports = SearchBarView;
});
