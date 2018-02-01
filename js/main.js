'use strict';

var main = function () {
    var state = {};
    var data = DATA;
    return {
        renderProjects: function renderProjects(filter) {
            var d = JSON.parse(JSON.stringify(data));
            if (filter && filter !== "all") {
                d = data.filter(function (project) {
                    return project.category === filter.split(' ').join('');
                });
            }
            var content = d.map(function (project, i) {
                return '\n                <div class="project-item" data-id="' + i + '" data-filter="' + project.category + '">\n                    <div class="project-item-inner" style="background-image: url(/img/' + project.image + ')"></div>\n                    <div class="project-item-title">' + project.title + '</div>\n                </div>\n                ';
            }).join('');
            $('.projects').html(content);
        },
        highlightProjects: function highlightProjects(filter) {
            var d = JSON.parse(JSON.stringify(data));
            $('.project-item').removeClass('fade');
            $('.project-item').addClass('faded');
            $('.project-item').removeClass('highlighted');
            if (filter && filter !== "all") {
                $('[data-filter=' + filter + ']').removeClass('faded');
                $('[data-filter=' + filter + ']').addClass('highlighted');
            } else {
                $('.project-item').removeClass('highlighted');
                $('.project-item').removeClass('faded');
            }
        },
        renderProject: function renderProject(id) {
            var project = data[id];
            console.log(project);
            if (!project.video.length) {
                $('.project-header').html('<img class="img-responsive" src="/img/' + project.image + '">');
            } else {
                $('.project-header').html(project.video);
            }
            $('.project-text').html('\n                <p><b>' + project.title + '</b><br>' + project.subtitle + '</p>\n                <p>' + project.text + '</p>\n            ');
            $('html, body').animate({
                scrollTop: $('.project-holder').offset().top
            }, 500);
        },
        init: function init() {
            main.renderProjects();
        }
    };
}();

main.init();

$('.categories span').click(function () {
    $('.categories span').removeClass('active');
    $(this).addClass('active');
    var filter = $(this).text().split(' ').join('').split('#')[1];
    main.highlightProjects(filter);
});

$('.project-item').click(function () {
    var id = $(this).attr('data-id');
    $('.project-header').html('');
    $('.project-text').html('');
    main.renderProject(id);
});

$('.project-item').on('mouseover', function () {
    $('.project-item').addClass("fade");
    $(this).removeClass('fade');
});
$('.project-item').on('mouseleave', function () {
    $('.project-item').removeClass("fade");
});

$('#email').html('info@andrasnagy.xyz');