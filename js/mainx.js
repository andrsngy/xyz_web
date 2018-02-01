const main = (function() {
    let state = {

    }
    let data = DATA;
    return {
        renderProjects: (filter) => {
            let d = JSON.parse(JSON.stringify(data));
            if (filter && filter !== "all") {
                d = data.filter(project => project.category === filter.split(' ').join(''));
            }
            let content = d.map((project, i) => {
                return `
                <div class="project-item" data-id="${i}" data-filter="${project.category}">
                    <div class="project-item-inner" style="background-image: url(/img/${project.image})"></div>
                    <div class="project-item-title">${project.title}</div>
                </div>
                `
            }).join('');
            $('.projects').html(content)
        },
        highlightProjects: (filter) => {
            let d = JSON.parse(JSON.stringify(data));
            $('.project-item').removeClass('fade');
            $('.project-item').addClass('faded');
            $('.project-item').removeClass('highlighted');
            if (filter && filter !== "all") {
                $(`[data-filter=${filter}]`).removeClass('faded');
                $(`[data-filter=${filter}]`).addClass('highlighted');
            } else {
                $('.project-item').removeClass('highlighted');
                $('.project-item').removeClass('faded');
            }
        },
        renderProject: (id) => {
            let project = data[id];
            console.log(project);
            if (!project.video.length) {
                $('.project-header').html(`<img class="img-responsive" src="/img/${project.image}">`)
            } else {
                $('.project-header').html(project.video)
            }
            $('.project-text').html(`
                <p><b>${project.title}</b><br>${project.subtitle}</p>
                <p>${project.text}</p>
            `)
            $('html, body').animate({
                scrollTop: $('.project-holder').offset().top
            }, 500);


        },
        init: () => {
            main.renderProjects();
        }
    }
})()

main.init()



$('.categories span').click(function() {
    $('.categories span').removeClass('active');
    $(this).addClass('active');
    let filter = $(this).text().split(' ').join('').split('#')[1];
    main.highlightProjects(filter)
})

$('.project-item').click(function(){
    let id = $(this).attr('data-id');
    $('.project-header').html('');
    $('.project-text').html('');
    main.renderProject(id)
})

$('.project-item').on('mouseover', function() {
    $('.project-item').addClass("fade");
    $(this).removeClass('fade');
})
$('.project-item').on('mouseleave', function() {
    $('.project-item').removeClass("fade");
})

$('#email').html('info@andrasnagy.xyz')