$(function(){

   //defaults
   $.fn.editable.defaults.url = '/post';

    //enable / disable
   $('#enable').click(function() {
       $('#user .editable').editable('toggleDisabled');
   });

    //editables
    $('#object_name').editable({
           url: '/post',
           type: 'text',
           pk: 1,
           name: 'username',
           title: 'Enter username'
    });

    $('#designer').editable({});
    $('#builder').editable({});

    $('#category').editable({
        inputclass: 'input-large',
        select2: {
            tags: ['furniture', 'chair', 'table', 'shelve', 'sofa', 'bench', 'rack', 'showcase', 'lamp'],
            tokenSeparators: [",", " "]
        }
    });

    $('#tags').editable({
        inputclass: 'input-large',
        select2: {
            tags: ['wood', 'book', 'upcycle', 'pallet', '3Dprint'],
            tokenSeparators: [",", " "]
        }
    });

    $('#overall_size').editable({
        url: '/post',
        value: {
            length: '0',
            width: '0',
            height: '0'
        },
        validate: function(value) {
            if( value.length == '' || value.width == '' || value.height == ''
                || value.length < 0 || value.width < 0 || value.height < 0 ) {
              return 'All values must be numbers and positive';
            }
        }
    });

    $('#creation_date').editable({
      datepicker: {
        todayBtn: 'linked'
      }
    });

    $('#contributor').editable({});
    $('#derived_from').editable({});
    $('#original_designer').editable({});
    $('#realization_place').editable({});

    $('#required_hardware').editable({
        inputclass: 'input-large',
        select2: {
            tags: ['drill', 'hammer', 'saw', 'claw', 'screwdriver'],
            tokenSeparators: [",", " "]
        }
    });

    $('#materials').editable({
        inputclass: 'input-large',
        select2: {
            tags: ['board', 'mails', 'screws', 'glue', 'rope', 'tape'],
            tokenSeparators: [",", " "]
        }
    });

    var licenses = [];
    $.each({"FAL": "Free Art License", "CERN": "CERN OHL", "GPL": "GNU GPL", "CC-BY-SA": "Creative Commons - Attribution - Share Alike", "CC-BY": "Creative Commons - Attribution", "CC0": "Public Domain Dedication"}, function(k, v) {
        licenses.push({id: k, text: v});
    });
    $('#license').editable({
        source: licenses,
        select2: {
            width: 200,
            placeholder: 'Choose an open source license',
            allowClear: true
        }
    });

    $('#client').editable({});
    $('#url').editable({});

    $('#description').editable({
        showbuttons: 'bottom'
    });


   $('#user .editable').on('hidden', function(e, reason){
        if(reason === 'save' || reason === 'nochange') {
            var $next = $(this).closest('tr').next().find('.editable');
            if($('#autoopen').is(':checked')) {
                setTimeout(function() {
                    $next.editable('show');
                }, 300);
            } else {
                $next.focus();
            }
        }
   });

});
