var alphabet = {
    a: 4,
    e: 3,
    s: 5,
    b: 8,
    o: 0,
    z: 7,
    i: 1
}

var data = $.getScript("../js/data.js", function (data, textStatus, jqxhr) {
    return data;
}).then(function (data) {
    return fullData;
});

var introVideo = document.querySelector('.video video');
var projectList = document.querySelector('#works');
var singleProject = document.querySelector('#project');

if (introVideo) {
    introVideo.addEventListener('ended', function () {
        console.log('ended');
        $('.video').css('cursor', 'pointer');
        $('.video').on('click', function () {
            var loc = window.location.href;
            window.location.href = loc + 'works';
        })
        $('.click-anywhere').fadeIn();
    })
}

function mixLetters(e) {
    var content = Array.from($(e.target).html().toLowerCase());
    content.forEach(function (item, index) {
        if (alphabet[item]) {
            content.splice(index, 1, alphabet[item]);
            $(e.target).html(content.join(''));
        }
    })
}

function returnLetters(e) {
    var original = $(e.target).attr('data-original');
    $(e.target).html(original);
}

$('a').on('mouseover', function (e) {
    mixLetters(e);
})

$('a').on('mouseleave', function (e) {
    returnLetters(e);
});

$('.initiator').on('mouseenter mouseleave', function (e) {
    $('.receiver').trigger(e.type);
})



if (projectList) {
    data.then(function (data) {
        var divs = data.map(function (object, index) {
            return `
                    <div class="col-sm-6">
                        <div class="project-list-img" style="background-image: url(../img/${data[index].hero_img})">
                            <div class="project-list-title">
                                <a data-original="${data[index].title}" data-target="${data[index].post_number}">${data[index].title}</a>
                            </div>
                        </div>
                    </div>
                `
        })

        $('#works').html(divs.join(''));
    })
        .then(function () {
            $('.project-list-title a').each(function () {
                $(this).on('mouseover', function (e) {
                    mixLetters(e);
                })
                $(this).on('mouseleave', function (e) {
                    returnLetters(e);
                })
                $(this).on('click', function (e) {
                    e.preventDefault();
                    var data = $(e.target).attr('data-target');
                    var loc = window.location.href;
                    window.location.href = '/project/#' + data;
                })
            })
            $('.project-list-img').on('mouseenter mouseleave click', function (e) {
                $(e.target).children('.project-list-title').children('a').trigger(e.type);
            })
        })
}

if (singleProject) {
    (function () {
        var target = window.location.href.split('#')[1];
        data.then(function (data) {
            return data[target - 1];
        }).then(function (data) {
            console.log(data);
            $('.project-hero').css('background-image', 'url(../img/' + data.hero_img + ')');
            $('.project-text').html('<h2>' + data.title + '</h2><p>' + data.text + '</p>');
            if (data.imgs.length >= 1) {
                data.imgs.forEach(function (item) {
                    $('.project-imgs').append('<img class="img-responsive" src="../img/' + item.img_url + '"><p>' + item.img_caption + '</p>');
                })
            }
        });
    })();
}
