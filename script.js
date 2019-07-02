/*
 * runstant
 */

phina.globalize();

var MOUSE_CIRCLE_RADIUS = 16;
var TAPIOKA_MAX_NUM = 100;

var ASSETS = {
  image: {
    'tapioka': './tapioka.png',
  },
};

phina.define("Mouse", {
  superClass: 'CircleShape',

  init: function(options) {
    options = (options || {}).$safe({
      fill: "red",
      stroke: null,
      radius: MOUSE_CIRCLE_RADIUS,
    });
    this.superInit(options);

    this.blendMode = 'lighter';
  },

  update: function(app) {
    var p = app.pointer;
    this.x = p.x;
    this.y = p.y;
  },
});



phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();

    this.backgroundColor = '#222';

    var mouse = Mouse().addChildTo(this);
    mouse.x = 0;
    mouse.y = 0;

    // グループを生成
    this.tapiokas = DisplayElement().addChildTo(this);

    (TAPIOKA_MAX_NUM).times(function(i) {
        var tapioka = Sprite('tapioka').addChildTo(this.tapiokas);
        tapioka.x = this.gridX.center();
        tapioka.y = this.gridY.center();
        tapioka.width = 64;
        tapioka.height = 64;
        tapioka.update = function(app) {
          var p = app.pointer;
          if (this.x >= p.x) {
            this.x -= Math.floor( Math.random() * (100 + 1 - 1) ) + 1 ;
          } else {
            this.x += Math.floor( Math.random() * (100 + 1 - 1) ) + 1 ;
          }
          if (this.y >= p.y) {
            this.y -= Math.floor( Math.random() * (100 + 1 - 1) ) + 1 ;
          } else {
            this.y += Math.floor( Math.random() * (100 + 1 - 1) ) + 1 ;
          }
        }
      },
      this);

  },
});

phina.main(function() {
  var app = GameApp({
    startLabel: 'main',
    assets: ASSETS,
  });

  app.run();
});
