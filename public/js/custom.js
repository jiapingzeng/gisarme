$(window).resize(function(){$(".navbar-collapse").css({maxHeight:$(window).height()-$(".navbar-header").height()+"px"})}),$(document).ready(function(){$(window).load(function(){$(".sticky").sticky({topSpacing:0})})}),$(document).ready(function(){new WOW({boxClass:"wow",animateClass:"animated",offset:100,mobile:!1}).init()}),$(document).ready(function(){$(window).stellar({horizontalScrolling:!1,responsive:!0})}),$(document).ready(function(){$("[data-toggle=popover]").popover(),$("[data-toggle=tooltip]").tooltip()}),$(document).ready(function(){$(window).scroll(function(){$(this).scrollTop()>100?$(".transparent-header").css("background","#252525"):$(".transparent-header").css("background","transparent")})}),function(){$(".top-search").on("click",function(){$(".search").fadeIn(500,function(){$(this).toggleClass("search-toggle")})}),$(".search-close").on("click",function(){$(".search").fadeOut(500,function(){$(this).removeClass("search-toggle")})})}(),$('.panel-ico a[data-toggle="collapse"]').on("click",function(){$(this).closest(".panel-heading").hasClass("active")?$(this).closest(".panel-heading").removeClass("active"):($('.panel-heading a[data-toggle="collapse"]').closest(".panel-heading").removeClass("active"),$(this).closest(".panel-heading").addClass("active"))});