define(function(require, exports, module){
  'use strict'
  var View = require('famous/core/View');
  var Modifier = require('famous/core/Modifier');
  var RenderNode = require('famous/core/RenderNode');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var StateModifier = require('famous/modifiers/StateModifier');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Easing = require('famous/transitions/Easing');
  var SequentialLayout = require('famous/views/SequentialLayout');

  var Coverflow = require('views/Coverflow');
  var Carousel = require('views/Carousel');

  function BookshelfCarousel(options){
    View.apply(this, arguments);

    this.focusBook = 0;
    this.focusTransition = {duration: 100, curve: Easing.outCubic};
    this.focusAnimation = function(book){
      console.log(book);
      book.cover.setTransform(Transform.rotateY(0.25 * Math.PI), this.focusTransition);
      // book.spine.setTransform(Transform.rotateY(0), focusTransition);
      // book.label.setTransform(Transform.setOpacity(1), focusTransition);
    };
    this.unfocusAnimation = function(book){
      book.cover.setTransform(Transform.rotateY(0), this.focusTransition);
    };

    _addCarousel.call(this);
    _bindFocusEvents.call(this);
  }

  BookshelfCarousel.prototype = Object.create(View.prototype);
  BookshelfCarousel.prototype.constructor = BookshelfCarousel;

  BookshelfCarousel.DEFAULT_OPTIONS = {
    covers: [],
    coverSize: [100, 150]
  };

  function _addCarousel(){
    this.bookshelfContainer = new ContainerSurface();
    this.bookshelfContainer.context.setPerspective(500);

    var screenCenter = ((window.innerWidth/2) - (this.options.coverSize[0]/2));
    var coverCenter = this.options.coverSize[0]/2;

    this.bookshelf = new Carousel({
      screenCenter: screenCenter,
      coverCenter: coverCenter,
      margin: 5000,
      rotateX: 0.0,
      rotateY: 0.0,
      rotateZ: 0.0,
      translateX: 0.0,
      translateY: 0.0,
      translateZ: -100.0,
      depth: 0.0,
      scale: 0.0,
      easing: Easing.outCubic
    });

    this.books = [];
    for(var i = 0; i < this.options.covers.length; i++){
      var cover = new ImageSurface({
        size: this.options.coverSize,
        content: this.options.covers[i]
      });
      var coverAnimator = new Modifier();
      var sizeModifier = new Modifier({
        size: this.options.coverSize
      });
      var originModifier = new Modifier({
        origin: [0.5, 0.5],
        align:[0.5, 0]
      });

      var renderNode = new RenderNode({
        origin: [0, 0.5]
      });
      renderNode
        .add(sizeModifier)
        .add(originModifier)
        .add(coverAnimator)
        .add(cover);
      cover.pipe(this.bookshelf);
      this.books.push({
        cover: coverAnimator
      });
      this.bookshelf.items.push(renderNode);
    }

    this.add(this.bookshelfContainer);
    this.bookshelfContainer.add(new Modifier({origin: [0, 0.5], align: [0, 0.5]})).add(this.bookshelf);
    this.bookshelf.scrollview.pipe(this);

    // this.bookshelf = new Coverflow({
    //   screenCenter: screenCenter,
    //   coverCenter: coverCenter
    // });

    // var cover;
    // var coverViews = [];
    // for(var i = 0; i < this.options.covers.length; i++){
    //   var coverView = new View();

    //   var coverModifier = new StateModifier({
    //     transform: Transform.rotateY(0.15*Math.PI)
    //   });

    //   cover = new ImageSurface({
    //     size: this.options.coverSize,
    //     content: this.options.covers[i]
    //   });

    //   coverView.add(coverModifier).add(cover);

    //   coverViews.push(coverView);

    //   cover.pipe(this.bookshelf);
    //   cover.pipe(this);
    // }
    // this.bookshelf.sequenceFrom(coverViews);

    // this.bookshelfModifier = new StateModifier({
    //   size: [window.innerWidth, 150],
    //   origin: [0.5, 0.5],
    //   align: [0.5, 0.5],
    //   transform: Transform.translate(0, 0, 0)
    // });

    // this.add(this.bookshelfContainer);
    // this.bookshelfContainer.add(this.bookshelfModifier).add(this.bookshelf);

    // console.log(this.bookshelf.getSize());  
  }

  function _bindFocusEvents(){
    this._eventInput.on('snap', function(payload){
      this.focusBook = payload.bookIndex;
      console.log('focus:', this.focusBook);
      this.focusAnimation(this.books[this.focusBook]);
    }.bind(this));

    this._eventInput.on('scrollStart', function(payload){
      var index = payload.bookIndex;
      console.log('unfocus:', this.focusBook);
      this.unfocusAnimation(this.books[this.focusBook]);
    }.bind(this));

    this.focusAnimation(this.books[this.focusBook]);
  }

  module.exports = BookshelfCarousel;
});
