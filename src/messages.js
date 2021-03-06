$(() => {
    $("#send").click(pressSend);

    $(document).on('keypress',e => {  // When press enter key in message input
        if(e.which === 13) {
            pressSend();
        }
    });

    $("#restore").click(() => {  // reset DB
        $.post('/reset')

    });

    $(".dropdown-menu a").click(function () { // When select the person name, the dropdown displays the name. Used regular function (not arrow) to use 'this'
        $(this).parents(".dropdown").find('.btn').html($(this).text());
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });

    $(document).ready(() => {  // The first name is selected as default.
        $(".dropdown .dropdown-menu a")[0].click();
    });

    getMessages();
})

const addMessages = (message) => {
    const profile = "photo/" + message.name.toLowerCase() + ".jpeg";
    /*todo: think of using Bootstrap Media for the template*/
    const template = `
            <div class="pic m-1">
                <img src=${profile} class="img-thumbnail rounded-circle" style="height: 80px; width: 80px" alt="profile">
            </div>
            <div class="col m-1">
                <div class="row">
                    <p class="font-weight-bold h5">
                        ${message.name}
                        <span class="text-muted small">${message.date}</span>
                    </p>
                </div>
                <p class="row">${message.message}</p>
                </div><div class="w-100">
            </div>`
    $("#messages").append(template)
}

const getMessages = () => {
    $.get('/messages', (data) => {
        data.forEach(addMessages);
        scrollSmoothToBottom('main');
    })
}

const postMessage = (message) => {
    $.post('/messages', message)
}

const pressSend = () => {
    const newMsg = $("#message");
    const message = {
        name: $("#name").html(),
        message: newMsg.val(),
        // date will be added in server.js
    };
    postMessage(message);
    newMsg.val("");  // empty textarea 'message'
}

const scrollSmoothToBottom = (id) => {  // to scroll smoothly to the bottom of the body
    const div = document.getElementById(id);
    $('#' + id).animate({
        scrollTop: div.scrollHeight - div.clientHeight /*+ $("#footer").height() * 2 */ // todo: fix "$("#footer").height() * 2" later. It doesn't scroll down to the bottom when it loads at the first time
    }, 500);
}