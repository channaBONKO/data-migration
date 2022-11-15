// Top Burger Menu

function bmenu(x) {
    x.classList.toggle("change");
}


//Start of File Uploader in NewProject

$.fn.customFileInput = function(options){

    var defaults = {
        width: 'inherit',
        buttonText: 'Browse',
        changeText: 'Change',
        //inputText: 'No file selected',
        showInputText: true,
        maxFileSize: 0,

        onChange: $.noop
    };

    var opts = $.extend(true, {}, defaults, options);

    var fileInput = $(this)
        .addClass('customfile-input')
        .mouseover(function(){ upload.addClass('customfile-hover'); })
        .mouseout(function(){ upload.removeClass('customfile-hover'); })
        .focus(function(){
            upload.addClass('customfile-focus');
            fileInput.data('val', fileInput.val());
        })
        .blur(function(){
            upload.removeClass('customfile-focus');
            $(this).trigger('checkChange');
        })
        .bind('disable',function(){
            fileInput.attr('disabled',true);
            upload.addClass('customfile-disabled');
        })
        .bind('enable',function(){
            fileInput.removeAttr('disabled');
            upload.removeClass('customfile-disabled');
        })
        .bind('checkChange', function(){
            if(fileInput.val() && fileInput.val() != fileInput.data('val')){
                fileInput.trigger('change');
            }
        })
        .bind('change', function() {
            if (opts.showInputText) {

                var fileName = $(this).val().split(/\\/).pop();

                $(this).data('text', fileName);

                var fileExt = 'customfile-ext-' + fileName.split('.').pop().toLowerCase();

                uploadButton.text(opts.changeText);

                uploadFeedback
                    .text(fileName)
                    .removeClass(uploadFeedback.data('fileExt') || '')
                    .addClass(fileExt)
                    .data('fileExt', fileExt)
                    .addClass('customfile-feedback-populated');
                autoTruncateFileName();
            }

            if ($.isFunction(opts.onChange)) {
                opts.onChange.apply(this, arguments);
            }
        })
        .click(function(){
            fileInput.data('val', fileInput.val());
            setTimeout(function(){
                fileInput.trigger('checkChange');
            },100);
        });

    var upload = $('<div class="customfile"></div>');

    upload.css({
        width: opts.width
    });

    var uploadButton = $('<span class="customfile-button" aria-hidden="true"></span>').html(opts.buttonText).appendTo(upload);

    var uploadFeedback = $('<span class="customfile-feedback" aria-hidden="true"></span>').html(opts.inputText).appendTo(upload);

    if (opts.maxFileSize > 0 && $('input[type="hidden"][name="MAX_FILE_SIZE"]').length == 0) {
        $('<input type="hidden" name="MAX_FILE_SIZE">').val(opts.maxFileSize).appendTo(upload);
    }

    var autoTruncateFileName = function () {

        var fileName = fileInput.val() || opts.inputText;

        if (fileName.length) {
            var limit = 0,
                trimmedFileName = fileName;
            uploadFeedback
                .text(fileName)
                .css({ display: 'inline' });
            while (limit < 1024 && trimmedFileName.length > 0 && uploadButton.outerWidth() + uploadFeedback.outerWidth() + 5 >= uploadButton.parent().innerWidth()) {
                trimmedFileName = trimmedFileName.substr(0, trimmedFileName.length - 1);
                uploadFeedback.text(trimmedFileName + '...');
                limit++;
            }
            uploadFeedback.css({ display: 'block' });
        }
    };

    if(fileInput.is('[disabled]')){
        fileInput.trigger('disable');
    }
    uploadFeedback.data('text', opts.inputText);

    if (! opts.showInputText ) {
        uploadFeedback.hide();
        uploadButton
            .css({
                float: 'inherit',
                display: 'block'
            })
            .parent()
            .css({
                padding: 0
            });
    } else {
        uploadFeedback.css({
            display: 'block'
        });
        $(window).bind('resize', autoTruncateFileName);

    }

    upload
        .mousemove(function(e){
            fileInput.css({
                'left': e.pageX - upload.offset().left - fileInput.outerWidth() + 20,
                'top': e.pageY - upload.offset().top - $(window).scrollTop() - 3
            });
        })
        .insertAfter(fileInput);
    fileInput.appendTo(upload);
    return $(this);
};


$(function(){
    $('#file_B').customFileInput({
        width: '100%'
    });
});

//End of File Uploader in NewProject


//accordian

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("accordianActive");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

//mP

$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').addClass('collapsDefault').removeClass('expandYellow');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').addClass('expandYellow').removeClass('collapsDefault');
        }
        e.stopPropagation();
    });
});